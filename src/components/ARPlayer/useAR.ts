import { useEffect, useRef, useState } from "react";
import { useWebcam } from "src/hooks/useWebcam";
import StreamMerger from "src/utils/StreamMerger";
import { Object3D } from "three";
import { World } from "../../Three/World";
import { useTray } from "./../../hooks/useTray";

const useAR = (createControls?: (object: Object3D) => void) => {
  const { videoTracks, height, width } = useWebcam({
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
    setState({ type: "webcam", value: true });
    setState({ type: "microphone", value: true });

    arCanvasEl.current.height = height!;
    arCanvasEl.current.width = width!;
    arCanvasEl.current.style.height = `${height}px`;
    arCanvasEl.current.style.width = `${width}px`;

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
    const streamMerger = new StreamMerger({ height: height, width: width });

    if (videoTracks) {
      const webcamStream = new MediaStream(videoTracks);

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
  }, [height, usingAR, videoTracks, width]);

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
