import { useContext, useEffect, useRef } from "react";
import { Hands, Results } from "@mediapipe/hands";
import {
  classify,
  displayLandmarks,
  getFingerStatuses,
} from "src/utils/mediapipe.utils";
import { ConferenceContext } from "src/context/ConferenceContext";

export const useGesture = (
  canvas: { height: number; width: number },
  canvasRef?: React.RefObject<HTMLCanvasElement>,
  callback?: (gesture: string, results: Results) => void,
  display = true
) => {
  // const { webcam } = useTray();

  const { usingGesture, webcamTrack, webcam, setWebcam, setGesture } =
    useContext(ConferenceContext);
  const videoRef = useRef(document.createElement("video"));

  // const videoElement = useRef(document.createElement("video"));

  display = display ? display : false;
  // const canvasElement = useRef(document.createElement("canvas"));
  const requestRef = useRef<number | undefined>();

  // let pastX = 0,
  //   pastY = 0,
  //   posX = 0,
  //   posY = 0;
  // const func = (gesture: string, results: Results) => {
  //   let momentum = 1;

  //   if (gesture === "Peace") {
  //     const diffX = pastX - results.multiHandLandmarks[0][0].x;
  //     // console.log(diffX);
  //     pastX = results.multiHandLandmarks[0][0].x;
  //     if (diffX > 0) momentum = 1;
  //     else if (diffX < 0) momentum = -1;
  //     posX += momentum;
  //     console.log(
  //       "x",
  //       posX
  //       // results.multiHandLandmarks[0][0].y
  //     );
  //   } else if (gesture === "Ok") {
  //     const diffY = pastY - results.multiHandLandmarks[0][0].y;
  //     pastY = results.multiHandLandmarks[0][0].y;
  //     if (diffY > 0) momentum = 1;
  //     else momentum = -1;
  //     posY += momentum;
  //     console.log(
  //       "y",
  //       posY
  //       // results.multiHandLandmarks[0][0].y
  //     );
  //   } else if (gesture === "Point") {
  //     const diffY = pastY - results.multiHandLandmarks[0][0].y;
  //     pastY = results.multiHandLandmarks[0][0].y;
  //     if (diffY > 0) momentum = 1;
  //     else momentum = -1;
  //     posY += momentum;
  //     console.log(
  //       "y",
  //       posY
  //       // results.multiHandLandmarks[0][0].y
  //     );
  //   }
  // };
  function onResults(results: Results) {
    let gesture = "None";
    // let count = 0;
    // console.log(results);
    // console.log(canvasElement.current);
    // console.log(canvasElement.current!.getContext("2d"));

    if (canvasRef?.current && display)
      displayLandmarks(canvasRef.current, results);
    try {
      const fingersStatus = getFingerStatuses(results);
      // count = 0;
      // console.log(fingersStatus);
      // for (const fingerKey in fingersStatus[0]) {
      //   if (fingersStatus[0][fingerKey] === true) count += 1;
      // }
      gesture = classify(fingersStatus[0]);
      setGesture(gesture);
      // console.log("Gesture Mediapipe:", gesture);
      // console.log(callback);
      if (callback) callback(gesture, results);
      // console.log("Gesture: ", gesture);
      // console.log("Count: ", count);
    } catch (e) {}
    // console.log(results.multiHandedness);
  }

  const mp_hands = useRef<Hands>();

  const count = useRef(0);
  const draw = () => {
    requestRef.current = undefined;
    const context = canvasRef?.current?.getContext("2d");

    context?.clearRect(0, 0, canvas.width, canvas.height);
    context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    context?.fillText("Count= " + count.current, 10, 10);

    count.current += 1;

    mp_hands.current?.send({ image: canvasRef?.current! }).then(() => {
      start();
    });
  };
  const clearFrame = () => {
    const context = canvasRef?.current?.getContext("2d");

    context?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const start = () => {
    if (!requestRef.current) requestRef.current = requestAnimationFrame(draw);
  };
  const stop = () => {
    if (requestRef.current) {
      clearFrame();
      cancelAnimationFrame(requestRef.current);
      requestRef.current = undefined;
    }
  };

  useEffect(() => {
    if (!usingGesture) {
      stop();
      return;
    }
    if (!webcam) {
      setWebcam(true);
      return;
    }
    if (webcam && usingGesture) {
      if (!mp_hands.current) {
        mp_hands.current = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          },
        });
        mp_hands.current.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        mp_hands.current.onResults(onResults);
      }
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcam, usingGesture]);

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
      // setState({ type: "usingGesture", value: true });
    };
    // videoRef.current.oncanplaythrough = () => {
    //   // setIsVideoPlaying(true);
    //   videoRef.current?.play().catch((e) => {
    //     console.log(e);
    //   });
    // };
    videoRef.current.height = canvas.height;
    videoRef.current.width = canvas.width;

    if (canvasRef?.current) {
      canvasRef.current.height = canvas.height;
      canvasRef.current.width = canvas.width; // console.log;
    }
  }, [webcamTrack, canvas.height, canvas.width, canvasRef, setWebcam]);
};
