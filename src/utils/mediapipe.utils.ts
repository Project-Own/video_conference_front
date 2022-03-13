import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import {
  Handedness,
  HAND_CONNECTIONS,
  NormalizedLandmark,
  NormalizedLandmarkList,
  Results,
} from "@mediapipe/hands";

export const displayLandmarks = (
  canvasElement: HTMLCanvasElement,
  results: Results
) => {
  const canvasCtx = canvasElement.getContext("2d")!;

  if (canvasCtx) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    //   canvasCtx.fillText("Count: " + count, 10, 50);
    //   canvasCtx.fillText("Gesture: " + gesture, 50, 50);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
    canvasCtx.restore();
  }
};

const distance = (
  landmark1: NormalizedLandmark,
  landmark2: NormalizedLandmark,
  standardize = 1
): number => {
  let x, y, z;
  x = landmark1.x - landmark2.x;
  y = landmark1.y - landmark2.y;
  z = landmark1.z - landmark2.z;
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2) / standardize;
};

const getFingerStatuses = (results: Results) => {
  const fingersTipsIds = [
    8, //mp_hands.HandLandmark.INDEX_FINGER_TIP,8
    12, //mp_hands.HandLandmark.MIDDLE_FINGER_TIP,12
    16, //mp_hands.HandLandmark.RING_FINGER_TIP,16
    20, //mp_hands.HandLandmark.PINKY_TIP,20
    4, //mp_hands.HandLandmark.THUMB_TIP,4
  ];
  const fingersLabel = ["INDEX", "MIDDLE", "RING", "PINKY", "THUMB"];
  //mp_hands.HandLandmark.Wrist,0

  let fingersStatuses: any = {};
  results.multiHandedness.forEach((element: Handedness, handKey: number) => {
    const handLandmarks: NormalizedLandmarkList =
      results.multiHandLandmarks[handKey];

    fingersStatuses[handKey] = {};
    fingersTipsIds.forEach((tipIndex, key) => {
      // console.log(tipLandmark);
      if (tipIndex === 4) {
        const d1 = distance(handLandmarks[tipIndex], handLandmarks[8 - 3]);
        const d2 = distance(handLandmarks[tipIndex - 2], handLandmarks[8 - 3]);
        const di = distance(handLandmarks[8], handLandmarks[4]);
        const di1 = distance(handLandmarks[8 - 1], handLandmarks[4 - 1], 1.25);
        const dm = distance(handLandmarks[12], handLandmarks[4]);
        const dm1 = distance(handLandmarks[12 - 1], handLandmarks[4 - 1], 1.25);
        const dr = distance(handLandmarks[16], handLandmarks[4]);
        const dr1 = distance(handLandmarks[16 - 1], handLandmarks[4 - 1], 1.25);
        const dp = distance(handLandmarks[20], handLandmarks[4]);
        const dp1 = distance(handLandmarks[20 - 1], handLandmarks[4 - 1], 1.25);

        if (d1 > d2 && di > di1 && dm > dm1 && dr > dr1 && dp > dp1) {
          fingersStatuses[handKey][fingersLabel[key]] = true;
        }
        // console.log(d1, d2, di, di1, dm, dm1, dr, dr1, dp, dp1);
        else fingersStatuses[handKey][fingersLabel[key]] = false;
      } else {
        const d1 = distance(handLandmarks[tipIndex], handLandmarks[0]);
        const d2 = distance(handLandmarks[tipIndex - 2], handLandmarks[0]);

        const dt = distance(handLandmarks[tipIndex], handLandmarks[4]);
        const dt1 = distance(
          handLandmarks[tipIndex - 1],
          handLandmarks[4 - 1],
          1.25
        );

        if (d1 > d2 && dt > dt1) {
          fingersStatuses[handKey][fingersLabel[key]] = true;
        } //console.log(d1, d2, dt, dt1);
        else fingersStatuses[handKey][fingersLabel[key]] = false;
      }
    });

    // console.log("Count:", count);
    // console.log("Finger Status: ", fingersStatuses);
  });

  return fingersStatuses;
};
const classify = (fingersStatus: any) => {
  // fingersStatus = fingersStatuses[hand_side]
  // print(fingersStatus)
  // console.log(fingersStatus);
  let gesture = "None";

  if (
    fingersStatus["THUMB"] === true &&
    fingersStatus["INDEX"] === true &&
    fingersStatus["MIDDLE"] === true &&
    fingersStatus["RING"] === true &&
    fingersStatus["PINKY"] === true
  )
    gesture = "High Five";
  else if (
    fingersStatus["THUMB"] === true &&
    fingersStatus["INDEX"] === true &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === true
  )
    gesture = "Spiderman";
  else if (
    fingersStatus["THUMB"] === false &&
    fingersStatus["INDEX"] === true &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === true
  )
    gesture = "Rock On";
  else if (
    fingersStatus["THUMB"] === false &&
    fingersStatus["INDEX"] === true &&
    fingersStatus["MIDDLE"] === true &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === false
  )
    gesture = "Peace";
  else if (
    fingersStatus["THUMB"] === false &&
    fingersStatus["INDEX"] === false &&
    fingersStatus["MIDDLE"] === true &&
    fingersStatus["RING"] === true &&
    fingersStatus["PINKY"] === true
  )
    gesture = "Ok";
  else if (
    fingersStatus["THUMB"] === false &&
    fingersStatus["INDEX"] === false &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === false
  )
    gesture = "Fist";
  else if (
    fingersStatus["THUMB"] === true &&
    fingersStatus["INDEX"] === false &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === false
  )
    gesture = "Thumbs Up";
  else if (
    fingersStatus["THUMB"] === false &&
    fingersStatus["INDEX"] === false &&
    fingersStatus["MIDDLE"] === true &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === false
  )
    gesture = "Middle Finger";
  else if (
    fingersStatus["THUMB"] === true &&
    fingersStatus["INDEX"] === false &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === true
  )
    gesture = "Call";
  else if (
    fingersStatus["THUMB"] === false &&
    fingersStatus["INDEX"] === false &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === true
  )
    gesture = "Break";
  else if (
    fingersStatus["THUMB"] === false &&
    fingersStatus["INDEX"] === true &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === false
  )
    gesture = "Point";
  else if (
    fingersStatus["THUMB"] === true &&
    fingersStatus["INDEX"] === true &&
    fingersStatus["MIDDLE"] === false &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === false
  )
    gesture = "Half Gun";
  else if (
    fingersStatus["THUMB"] === true &&
    fingersStatus["INDEX"] === true &&
    fingersStatus["MIDDLE"] === true &&
    fingersStatus["RING"] === false &&
    fingersStatus["PINKY"] === false
  )
    gesture = "Gun";
  else gesture = "None";

  return gesture;
};

export { classify, getFingerStatuses };
