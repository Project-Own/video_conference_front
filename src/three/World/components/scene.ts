import { Color, Scene } from "three";

const createScene = () => {
  const scene = new Scene();

  scene.background = new Color("skyblue");

  return scene;
};

export default createScene;
