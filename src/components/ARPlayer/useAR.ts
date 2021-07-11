import { useEffect, useRef, useState } from "react";
import { useWebcam } from "src/hooks/useWebcam";
import StreamMerger from "src/utils/StreamMerger";
import { Scene } from "../ThreexComp/Scene";

const useAR = () => {
  const { videoTracks } = useWebcam();

  const arCanvasEl = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const scene = useRef<Scene>();

  const [ARStream, setARStream] = useState<MediaStream>();

  useEffect(() => {
    console.log("WHAAAAATTT");
    scene.current = new Scene(arCanvasEl.current);
  }, []);

  useEffect(() => {
    console.log("WHAAAAA");

    const streamMerger = new StreamMerger({ height: 400, width: 400 });

    if (videoTracks) {
      const webcamStream = new MediaStream(videoTracks);
      if (webcamStream) {
        scene.current?.animate();
        scene.current?.setWebcamStream(webcamStream);

        streamMerger.addStream(webcamStream);
        streamMerger.addCanvas(arCanvasEl.current);
      } else {
        // if (mediaStreamId) streamMerger.removeStream(mediaStreamId);
      }

      streamMerger.start();

      setARStream(streamMerger.result!);
    } else {
    }

    return () => streamMerger.stop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTracks]);

  return {
    ARStream,
  };
};

export default useAR;
