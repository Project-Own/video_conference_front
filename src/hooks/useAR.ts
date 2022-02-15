import { useContext, useEffect, useRef } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import { World } from "src/three/World";
import StreamMerger from "src/utils/StreamMerger";
import { Object3D } from "three";

const useAR = (
  canvas: {
    height: number;
    width: number;
  },
  createControls?: (object: Object3D) => void
) => {
  const arCanvasEl = useRef<HTMLCanvasElement>(
    document.createElement("canvas")
  );
  const arWorld = useRef<World>();

  // const [ARStream, setARStream] = useState<MediaStream>();

  // const [glbModelNames, setGlbModelNames] = useState<string[]>([]);

  const { usingAR, modelName, webcamTrack, stream, setStream } =
    useContext(ConferenceContext);

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
    const streamMerger = new StreamMerger({
      height: canvas.height,
      width: canvas.width,
    });

    if (webcamTrack) {
      const webcamStream = new MediaStream([webcamTrack]);

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

      if (stream?.getAudioTracks() && stream.getAudioTracks.length > 0) {
        streamMerger.result?.addTrack(stream.getAudioTracks()[0]);
      }
      setStream(streamMerger?.result!);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      streamMerger.stop();
      arWorld.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas.height, canvas.width, setStream, usingAR, webcamTrack]);

  useEffect(() => {
    if (modelName !== null && modelName !== "" && modelName)
      if (modelName === "cube") arWorld.current?.loadCube();
      else arWorld.current?.loadGithubGLBModels(modelName);
  }, [modelName]);
};

export default useAR;
