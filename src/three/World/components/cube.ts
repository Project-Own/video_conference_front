import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from "three";
import CustomObject from "./CustomObject";

const createCube = () => {
  const geometry = new BoxBufferGeometry(2, 2, 2);

  const material = new MeshStandardMaterial({ color: "purple" });

  const cube = new Mesh(geometry, material);
  cube.rotation.set(10, 10, 10);

  const cubeObj = new CustomObject(cube);

  const radiansPerSecond = MathUtils.degToRad(30);

  cubeObj.tick = (delta: number) => {
    // increase the cube's rotation each frame
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
    cube.rotation.z += radiansPerSecond * delta;
  };

  return cubeObj;
};

export default createCube;
