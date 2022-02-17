import { useContext, useEffect, useRef } from "react";
import { ConferenceContext } from "src/context/ConferenceContext";
import { World } from "src/three/World";

const useModelDisplay = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const arWorld = useRef<World>();
  const { modelName, setShowCORSInfo, setting } = useContext(ConferenceContext);
  useEffect(() => {
    arWorld.current = new World(canvasRef.current!, false);

    arWorld.current?.init().then(() => {
      // setGlbModelNames(arWorld.current?.glbModelNames!);
    });
    arWorld.current?.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (setting) arWorld.current?.start();
    else arWorld.current?.stop();
  }, [setting]);
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
};

export default useModelDisplay;
