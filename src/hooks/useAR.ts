import { useContext, useEffect, useRef, useState } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import { World } from "src/three/World";
import StreamMerger from "src/utils/StreamMerger";
import { Object3D } from "three";
import { useWebcam } from "./useWebcam";

const useAR = (
  canvas: {
    height: number;
    width: number;
    frameRate: number;
  },
  createControls?: (object: Object3D) => void
) => {
  const arCanvasEl = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const arWorld = useRef<World>();

  const [arVideoTrack, setARVideoTrack] = useState<MediaStreamTrack>();

  // const [glbModelNames, setGlbModelNames] = useState<string[]>([]);

  const {
    usingAR,
    modelName,

    setWebcam,
    setStream,
    setShowCORSInfo,
  } = useContext(ConferenceContext);

  const { webcamVideoTracks } = useWebcam({
    ...canvas,
  });
  useEffect(() => {
    arCanvasEl.current.height = canvas.height;
    arCanvasEl.current.width = canvas.width;
    arCanvasEl.current.style.height = `${canvas.height}px`;
    arCanvasEl.current.style.width = `${canvas.width}px`;

    arWorld.current = new World(
      arCanvasEl.current,
      createControls ? createControls : undefined
    );

    arWorld.current?.init().then(() => {
      // setGlbModelNames(arWorld.current?.glbModelNames!);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (!usingAR) return;

    const streamMerger = new StreamMerger({
      height: canvas.height,
      width: canvas.width,
      frameRate: canvas.frameRate,
    });

    if (webcamVideoTracks) {
      // if (usingAR) {
      console.log("Webcam Track", webcamVideoTracks);
      const webcamStream = new MediaStream(webcamVideoTracks);

      arWorld.current?.stop();
      if (!usingAR) {
        streamMerger?.addStream(webcamStream);
      } else {
        arWorld.current?.setWebcamStream(webcamStream);

        // arWorld.current?.init();
        arWorld.current?.start();

        streamMerger?.addStream(webcamStream);
        streamMerger?.addCanvas(arCanvasEl.current);
        // }
      }
    } else {
      setWebcam(false);
    }
    streamMerger.cleanupAudioTracks();

    streamMerger?.start();

    if (streamMerger.result?.getVideoTracks())
      setARVideoTrack(streamMerger?.result?.getVideoTracks()[0]);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      streamMerger.stop();
      arWorld.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas.height, canvas.width, setStream, usingAR, webcamVideoTracks]);

  useEffect(() => {
    if (modelName !== null && modelName !== "" && modelName)
      if (modelName === "cube") arWorld.current?.loadCube();
      else
        arWorld.current
          ?.loadGithubGLBModels(modelName)
          .then(() => {
            setShowCORSInfo(false);
          })
          .catch((err) => {
            setShowCORSInfo(true);
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelName]);

  return { arVideoTrack };
};

export default useAR;
