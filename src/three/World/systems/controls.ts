import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObject from "../components/CustomObject";

const createControls = (camera: Camera, canvas: HTMLCanvasElement) => {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const controlsObject = new CustomObject(controls);
  controlsObject.tick = () => controls.update();

  return controlsObject;
};
export default createControls;
