import { PerspectiveCamera } from "three";

const createCamera = () => {
  /**
   *Camera
   * */
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  return camera;
};

export { createCamera };
