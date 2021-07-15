import { useContext, useEffect, useRef, useState } from "react";
import { useWebcam } from "src/hooks/useWebcam";
import { SocketContext } from "src/pages/Context/Context";
import StreamMerger, {
  HTMLCanvasElementWithCaptureStream,
} from "src/utils/StreamMerger";
import { Scene } from "./Scene";

const ModelLoader = () => {
  const { videoTracks, toggleWebcam } = useWebcam();
  const canvasRef = useRef<HTMLCanvasElementWithCaptureStream>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const { setStream } = useContext(SocketContext);
  const [scene, setScene] = useState<Scene>();
  useEffect(() => {
    setScene(new Scene(canvasRef.current!));

    // document.body.appendChild(renderer.domElement);
  }, []);

  useEffect(() => {
    const videoStreamMerger = new StreamMerger({ height: 100, width: 100 });

    if (videoRef.current) {
      const srcObject = videoTracks ? new MediaStream(videoTracks) : null;

      if (srcObject) {
        scene?.setWebcamStream(srcObject);
        scene?.animate();

        videoStreamMerger.addStream(srcObject);
        videoStreamMerger.addCanvas(canvasRef.current!);

        videoStreamMerger.start();
        if (videoRef2.current) {
          videoRef2.current.srcObject = videoStreamMerger.result;
          setStream(videoStreamMerger.result!);
        }
      }
      videoRef.current.srcObject = srcObject;
    }

    return () => {
      videoStreamMerger.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStream, videoTracks]);

  return (
    <>
      <video
        ref={videoRef2}
        onCanPlayThrough={() => {
          videoRef2.current?.play().catch((e) => {
            console.log(e);
          });
        }}
        onError={(error) => {
          console.log("Something went wrong in video");

          console.error(error);
        }}
        autoPlay
        playsInline
        muted
        style={{
          height: "500px",
          width: "500px",
          backgroundColor: "red",
          objectFit: "cover",
          transform: `scaleX(-1)`,
        }}
      ></video>
      <div
        style={{
          position: "relative",
          height: "500px",
          width: "500px",
        }}
      >
        <button onClick={toggleWebcam}>Toggle Webcam</button>
        <p>Sahas</p>

        <video
          id="arjs-video"
          onCanPlayThrough={() => {
            videoRef.current?.play().catch((e) => {
              console.log(e);
            });
          }}
          onError={() => console.log("Something went wrorn in video")}
          autoPlay
          playsInline
          muted
          ref={videoRef}
          style={{
            width: "inherit",
            height: "inherit",
            objectFit: "cover",
            transform: `scaleX(-1)`,
            position: "absolute",
          }}
        ></video>
        <canvas
          ref={canvasRef}
          style={{
            width: "inherit",
            height: "inherit",
            position: "absolute",

            transform: `scaleX(-1)`,
          }}
        ></canvas>
      </div>
    </>
  );
};

export default ModelLoader;
