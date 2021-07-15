import { PerspectiveCamera } from "three";

const createCamera = () => {
  const camera = new PerspectiveCamera(
    35, //fov
    1, //aspect ratio
    0.1, //near clipping plane
    1000 //far clipping plane
  );

  // move camera back to view scenes
  camera.position.set(-5, 15, 65);

  return camera;
};

export default createCamera;
