import { useEffect, useRef, useState } from "react";
import { useWebcam } from "src/hooks/useWebcam";
import StreamMerger from "src/utils/StreamMerger";
import { Scene } from "../ThreexComp/Scene";
import { useTray } from "./../../hooks/useTray";

const useAR = () => {
  const { videoTracks } = useWebcam();

  const arCanvasEl = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const scene = useRef<Scene>();

  const [ARStream, setARStream] = useState<MediaStream>();

  const streamMerger = useRef<StreamMerger>(
    new StreamMerger({ height: 400, width: 400 })
  );

  const { usingAR, setState } = useTray();

  useEffect(() => {
    setState({ type: "webcam", value: true });
    setState({ type: "microphone", value: true });
    scene.current = new Scene(arCanvasEl.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      setState({ type: "webcam", value: false });
      setState({ type: "microphone", value: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoTracks) {
      const webcamStream = new MediaStream(videoTracks);

      if (!usingAR) {
        streamMerger.current?.addStream(webcamStream);
      } else {
        scene.current?.animate();
        scene.current?.setWebcamStream(webcamStream);

        streamMerger.current?.addStream(webcamStream);
        streamMerger.current?.addCanvas(arCanvasEl.current);
      }

      streamMerger.current.cleanupAudioTracks();

      streamMerger.current?.start();

      setARStream(streamMerger.current?.result!);
    } else {
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => streamMerger.current.stop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usingAR, videoTracks]);

  return {
    ARStream,
  };
};

export default useAR;
