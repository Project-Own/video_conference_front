import { useEffect, useRef, useState } from "react";
import { useWebcam } from "src/hooks/useWebcam";
import { World } from "src/Three/World";
import StreamMerger from "src/utils/StreamMerger";
import { Object3D } from "three";
import { useTray } from "./useTray";

const useAR = (createControls?: (object: Object3D) => void) => {
  const { webcamVideoTracks, webcamHeight, webcamWidth } = useWebcam({
    frameRate: 60,
  });

  const arCanvasEl = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const arWorld = useRef<World>();

  const [ARStream, setARStream] = useState<MediaStream>();

  const [modelName, setModelName] = useState("");

  const [glbModelNames, setGlbModelNames] = useState<string[]>([]);

  const { usingAR, setState } = useTray();

  useEffect(() => {
    setState({ type: "microphone", value: true });
    setState({ type: "webcam", value: true });

    arCanvasEl.current.height = webcamHeight!;
    arCanvasEl.current.width = webcamWidth!;
    arCanvasEl.current.style.height = `${webcamHeight}px`;
    arCanvasEl.current.style.width = `${webcamWidth}px`;

    arWorld.current = new World(
      arCanvasEl.current,
      createControls ? createControls : undefined
    );

    arWorld.current?.init().then(() => {
      setGlbModelNames(arWorld.current?.glbModelNames!);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      setState({ type: "webcam", value: false });
      setState({ type: "microphone", value: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const streamMerger = new StreamMerger({
      height: webcamHeight,
      width: webcamWidth,
    });

    if (webcamVideoTracks) {
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
      }

      streamMerger.cleanupAudioTracks();

      streamMerger?.start();

      setARStream(streamMerger?.result!);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      streamMerger.stop();
      arWorld.current?.stop();
    };
  }, [webcamHeight, usingAR, webcamVideoTracks, webcamWidth]);

  useEffect(() => {
    if (modelName !== null && modelName !== "" && modelName)
      if (modelName === "cube") arWorld.current?.loadCube();
      else arWorld.current?.loadGithubGLBModels(modelName);
  }, [modelName]);
  return {
    ARStream,
    glbModelNames,
    setModelName,
  };
};

export default useAR;
