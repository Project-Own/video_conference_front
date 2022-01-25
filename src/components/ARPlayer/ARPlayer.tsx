import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Results } from "@mediapipe/hands";

import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { useGesture } from "src/hooks/useGesture";
import { useTray } from "src/hooks/useTray";
import { SocketContext } from "src/pages/Context/Context";
import { MathUtils, Object3D } from "three";
import useAR from "./useAR";

const ARPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [gesture, setGesture] = useState<string>();

  // const [gestureResults, setGestureResults] =
  //   useState<NormalizedLandmarkList>();
  let pastDiffX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pastDiffY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pastX = 0,
    pastY = 0;

  const func = (gesture: string, results: Results) => {
    // setGesture(gesture);
    // setGestureResults(results.multiHandLandmarks[0]);

    // if (count % 5 === 0) count = 0;
    let diffX = 0,
      diffY = 0;
    const length = pastDiffX.length;
    for (let i = 0; i < length - 1; i++) {
      diffX += pastDiffX[i];
      diffY += pastDiffY[i];

      pastDiffX[i] = pastDiffX[i + 1];
      pastDiffY[i] = pastDiffY[i + 1];
    }
    const newDiffX = pastX - results.multiHandLandmarks[0][0].x;
    const newDiffY = pastY - results.multiHandLandmarks[0][0].y;

    pastDiffX[length - 1] = newDiffX;
    pastDiffY[length - 1] = newDiffY;

    diffX += newDiffX;
    diffY += newDiffY;
    diffX *= 2;
    diffY *= 2;

    pastX = results.multiHandLandmarks[0][0].x;
    pastY = results.multiHandLandmarks[0][0].y;

    // if (Math.abs(diffX) > 0.05) console.log("Difference X", diffX);
    // if (Math.abs(diffX) > 0.1) console.log("Difference X", diffX);
    // if (Math.abs(diffY) > 0.1) console.log("Difference Y", diffY);
    if (gesture === "Ok") {
      if (diffX > 0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "d",
          })
        );
      } else if (diffX < -0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "a",
          })
        );
      }

      if (diffY > 0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "w",
          })
        );
      } else if (diffY < -0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "s",
          })
        );
      }
    } else if (gesture === "Peace") {
      if (diffX > 0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "W",
          })
        );
      } else if (diffX < -0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "S",
          })
        );
      }
    } else if (gesture === "Rock On") {
      if (diffX > 0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "D",
          })
        );
      } else if (diffX < -0.1) {
        dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "A",
          })
        );
      }
    } else if (gesture === "Call") {
      setState({ type: "usingAR", value: false });
    } else if (gesture === "Half Gun") {
      setState({ type: "usingAR", value: true });
    }
    // console.log(gesture);
    // count += 1;
  };

  const createControls = (object: Object3D) => {
    /**
     * Animation
     * */

    const radiansPerSecond = MathUtils.degToRad(30);

    const originalScale = object.scale.clone();

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key);

      switch (event.key) {
        case "a":
          object.rotation.x += radiansPerSecond;
          break;
        case "d":
          object.rotation.x -= radiansPerSecond;
          break;
        case "w":
          object.rotation.y += radiansPerSecond;
          break;
        case "s":
          object.rotation.y -= radiansPerSecond;
          break;
        case "W":
          // if(delta<5){

          object.scale.x += 0.01;
          object.scale.y += 0.01;
          object.scale.z += 0.01;
          // }
          break;
        case "S":
          // if(delta)
          const scale = Math.max(object.scale.x - 0.01, 0);
          object.scale.x = scale;
          object.scale.y = scale;
          object.scale.z = scale;
          break;
        case "A":
          object.scale.x = originalScale.x;
          object.scale.y = originalScale.y;
          object.scale.z = originalScale.z;

          break;
        case "D":
          object.rotation.x = 0;
          object.rotation.y = 0;
          object.rotation.z = 0;

          break;
      }
    };

    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
  };

  const { setStream } = useContext(SocketContext);

  const { ARStream, glbModelNames, setModelName } = useAR(createControls);
  const { setState } = useTray();
  useGesture(canvasRef.current!, func, true);
  useEffect(() => {
    setStream(ARStream);
    if (videoRef.current) videoRef.current.srcObject = ARStream!;
  }, [ARStream, setStream]);

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    // eslint-disable-next-line eqeqeq
    if (event.target.value == 69) {
      setModelName("cube");
    } else {
      setModelName(glbModelNames[event.target.value! as number]);
    }
  };
  return (
    <>
      <FormControl>
        <InputLabel>Available Models</InputLabel>
        <Select native onChange={handleChange}>
          <option value={69}>Default Cube</option>
          {glbModelNames.map((name, key) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <p>
        AR Marker:
        <a href="https://raw.githubusercontent.com/AR-js-org/AR.js/master/data/images/hiro.png">
          Hiro
        </a>
      </p>
      <p>Display marker to place AR model on.</p>
      <p>Rotation: w🔺 s🔻 d🔺 a🔻</p>
      <p>
        CapitalLetter(Shift+key) **Keep Pressing if slow scaling Scale by 0.01
        W🔺 S🔻
      </p>

      <p>Reset Rotation: D💞 </p>
      <p>Reset Scale: A💞 </p>
      <div className="container" style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            objectFit: "cover",
            transform: `scaleX(-1)`,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        />
        <video
          ref={videoRef}
          onCanPlayThrough={() => {
            videoRef.current?.play().catch((e) => {
              console.log(e);
            });
          }}
          onError={(error) => console.log(error)}
          autoPlay
          playsInline
          poster="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
          muted
          style={{
            width: "100%",
            objectFit: "cover",
            transform: `scaleX(-1)`,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      </div>
    </>
  );
};

export default ARPlayer;
