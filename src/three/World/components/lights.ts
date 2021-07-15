import { AmbientLight, DirectionalLight } from "three";

const createLights = () => {
  // const ambientLight = new HemisphereLight("white", "darkslategrey", 2);
  const ambientLight = new AmbientLight("white", 2);
  const mainLight = new DirectionalLight("white", 8);

  mainLight.position.set(10, 10, 10);

  return { ambientLight, mainLight };
};

export default createLights;
