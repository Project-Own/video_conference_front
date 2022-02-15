import { useContext } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import { MathUtils, Object3D } from "three";
import useAR from "./useAR";
import { useAudio } from "./useAudio";
import { useGesture } from "./useGesture";
import { useScreenShare } from "./useScreenShare";
import { useWebcam } from "./useWebcam";
import { Results } from "@mediapipe/hands";
import { useMediaServer } from "./useMediaServer";

export const useConference = () => {
  const { setUsingAR } = useContext(ConferenceContext);

  const params = {
    height: 720,
    width: 720,
  };
  const frameRate = 60;

  useWebcam({ ...params, frameRate: frameRate });
  useAudio();
  useScreenShare({
    ...params,
    frameRate: frameRate,
    cursor: "always",
  });

  // Variables
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
      setUsingAR(false);
    } else if (gesture === "Half Gun") {
      setUsingAR(true);
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

  useAR(params, createControls);
  useGesture(params, undefined, func, false);

  useMediaServer();
};
