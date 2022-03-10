import * as tf from "@tensorflow/tfjs";
import { useRef, useEffect, useState, useContext } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";

const filter_gesture = [
  "Swiping Down",
  "Swiping Up",
  "Swiping Left",
  "Swiping Right",
  "Zooming In With Two Fingers",
  "Zooming Out With Two Fingers",
  "No Gesture",
  "Doing Other Things",
];

// const randomUniqueNum = (range: number, outputCount: number) => {
//   let arr = [];
//   for (let i = 0; i <= range - 1; i++) {
//     arr.push(i);
//   }

//   let result = [];

//   for (let i = 1; i <= outputCount; i++) {
//     const random = Math.floor(Math.random() * (range - i));
//     result.push(arr[random]);
//     arr[random] = arr[range - i];
//   }

//   return result;
// };

// const generateIndices = () => {
//   return randomUniqueNum(72, 36).sort(function (a, b) {
//     return a - b;
//   });
// };

const useTrainedGesture = (canvas: { height: number; width: number }) => {
  const {
    usingTrainedGesture,
    webcamTrack,
    webcam,
    frame,
    setTrainedGesture,
    setWebcam,
    setSetting,
    setMicrophone,
    setChat,
  } = useContext(ConferenceContext);
  const videoRef = useRef(document.createElement("video"));

  const modelRef = useRef<tf.GraphModel>();

  const frameRef = useRef<number>();

  // const frame = useRef(0);
  // const [gesture, setTrainedGesture] = useState("");

  const dataRef = useRef<number[][][][]>([]);

  const fps = 24;
  var fpsInterval: number,
    then: number,
    startTime: number,
    now,
    elapsed,
    frameCount = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [results, setResults] = useState("");

  useEffect(() => {
    if (webcamTrack?.readyState === "ended") setWebcam(false);
    if (videoRef.current) {
      videoRef.current.srcObject = webcamTrack
        ? new MediaStream([webcamTrack])
        : null;
    }
    videoRef.current.autoplay = true;
    videoRef.current.playsInline = true;
    videoRef.current.muted = true;
    videoRef.current.onloadedmetadata = () => {
      videoRef.current?.play().catch((e) => {
        console.log(e);
      });
      // draw();
      // setState({ type: "usingTrainedGesture", value: true });
    };
    // videoRef.current.oncanplaythrough = () => {
    //   // setIsVideoPlaying(true);
    //   videoRef.current?.play().catch((e) => {
    //     console.log(e);
    //   });
    // };
    videoRef.current.height = canvas.height;
    videoRef.current.width = canvas.width;
  }, [webcamTrack, canvas.height, canvas.width, setWebcam]);

  //   useEffect(() => {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         audio: false,
  //         video: {
  //           height: 720,
  //           width: 720,
  //           frameRate: fps,
  //         },
  //       })
  //       .then((stream) => {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.onloadedmetadata = () => {
  //           // tf.loadGraphModel("/classes9_model/model.json").then((model) => {
  //           //   modelRef.current = model;
  //           //   start();
  //           // });
  //         };
  //       });
  //   }, []);

  useEffect(() => {
    if (!usingTrainedGesture) {
      stop();
      return;
    }

    if (!webcam) {
      setWebcam(true);
      return;
    }
    if (webcam && usingTrainedGesture) {
      //   if (!mp_hands.current) {
      //     mp_hands.current = new Hands({
      //       locateFile: (file) => {
      //         return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      //       },
      //     });
      //     mp_hands.current.setOptions({
      //       maxNumHands: 1,
      //       modelComplexity: 1,
      //       minDetectionConfidence: 0.5,
      //       minTrackingConfidence: 0.5,
      //     });

      //     mp_hands.current.onResults(onResults);
      //   }
      if (!modelRef.current) {
        tf.loadGraphModel(
          process.env.PUBLIC_URL + "/model/classes_8_model/model.json"
        ).then((model) => {
          modelRef.current = model;

          start();
        });
      } else {
        start();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcam, usingTrainedGesture]);

  const animate = async () => {
    frameRef.current = requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      // TESTING...Report #seconds since start and achieved fps.
      var sinceStart = now - startTime;
      var currentFps =
        Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;

      setResults(
        "Elapsed time= " +
          Math.round((sinceStart / 1000) * 100) / 100 +
          " secs @ " +
          currentFps +
          " fps."
      );

      tf.engine().startScope();

      var image = tf.browser.fromPixels(videoRef.current, 1);
      image = tf.image.resizeBilinear(image, [100, 176]);
      image = tf.div(image, tf.scalar(255));
      const array = await image.array();

      //   console.log("Array", array);
      // image.print();
      if (dataRef.current.length === 36) {
        // console.log("Data", d);
        // console.log("Data", d.shape);
        const data = tf.expandDims(dataRef.current);
        const out: any = modelRef?.current?.predict(data);

        // // console.log("Out::", out, typeof out);

        const outArr = await out.array();

        const outMax = Math.max(...outArr[0]);
        const outIndex = outArr[0].indexOf(outMax);
        // console.log(outMax);
        // console.log(filter_gesture[outIndex]);
        // // const outArr = await out.argMax(1).array();
        uiControl(filter_gesture[outIndex]);
        setTrainedGesture(filter_gesture[outIndex]);
        // // console.log(outIndex);

        // // console.log(data.shape);
        // // console.log(out.shape);
        // console.log(frame.current);
        // Empty out dataRef

        // console.log("Length", dataRef.current.length);
        // const gesture = await predict_gesture();
        // console.log("Gesture:", gesture);

        dataRef.current = [];
        frame.current = 0;

        // cancelAnimationFrame(frameRef.current);
      }
      frame.current += 1;

      dataRef.current.push(array);

      // console.log(dataRef.current.length);

      // console.log(image.shape);

      // }
      tf.engine().endScope();
    }
  };

  // const predict_gesture = async () => {
  //   const indices = generateIndices();

  //   const data = tf.expandDims(
  //     indices.map((index) => {
  //       return dataRef.current[index];
  //     })
  //   );
  //   // console.log("Data", data.shape);
  //   const out: any = modelRef?.current?.predict(data);

  //   const outArr = await out.array();

  //   const outMax = Math.max(...outArr[0]);
  //   const outIndex = outArr[0].indexOf(outMax);

  //   return filter_gesture[outIndex];
  // };

  const start = () => {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    console.log(startTime);
    if (!frameRef.current) frameRef.current = requestAnimationFrame(animate);
  };
  const stop = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }
  };

  const uiControl = (gesture: string) => {
    console.log(gesture);
    switch (gesture) {
      case filter_gesture[0]:
        setMicrophone(false);
        break;
      case filter_gesture[1]:
        setMicrophone(true);
        break;
      case filter_gesture[2]:
        console.log("Setting True");
        setSetting(true);
        break;
      case filter_gesture[3]:
        console.log("Setting False");
        setSetting(false);

        break;
      case filter_gesture[4]:
        setChat(false);
        break;
      case filter_gesture[5]:
        setChat(true);
        break;
      default:
    }
  };
};

export default useTrainedGesture;
