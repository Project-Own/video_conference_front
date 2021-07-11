import { useContext, useEffect, useRef } from "react";
import { SocketContext } from "src/pages/Context/Context";
import useAR from "./useAR";

const ARPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ARStream } = useAR();
  const { setStream } = useContext(SocketContext);

  useEffect(() => {
    setStream(ARStream);
    if (videoRef.current) videoRef.current.srcObject = ARStream!;
  }, [ARStream, setStream]);

  return (
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
      }}
    />
  );
};

export default ARPlayer;
