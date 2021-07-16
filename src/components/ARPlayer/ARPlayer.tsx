import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { SocketContext } from "src/pages/Context/Context";
import useAR from "./useAR";

const ARPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ARStream, glbModelNames, setModelName } = useAR();
  const { setStream } = useContext(SocketContext);

  useEffect(() => {
    setStream(ARStream);
    if (videoRef.current) videoRef.current.srcObject = ARStream!;
  }, [ARStream, setStream]);

  const handleChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    // eslint-disable-next-line eqeqeq
    if (event.target.value == 69) {
      setModelName("cube");
    } else {
      setModelName(glbModelNames[event.target.value! as number]);
    }
  };
  return (
    <>
      <FormControl>
        <InputLabel>Available Models</InputLabel>
        <Select native onChange={handleChange}>
          <option value={69}>Default Cube</option>
          {glbModelNames.map((name, key) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </Select>
      </FormControl>
      <p>Rotation: w🔺 s🔻 d🔺 a🔻</p>
      <p>
        CapitalLetter(Shift+key) **Keep Pressing if slow scaling Scale by 0.01
        W🔺 S🔻
      </p>

      <p>Reset Rotation: D💞 </p>
      <p>Reset Scale: A💞 </p>
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
    </>
  );
};

export default ARPlayer;
