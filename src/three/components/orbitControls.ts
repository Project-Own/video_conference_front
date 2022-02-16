import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createOrbitControls(camera: Camera, canvas: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, canvas);

  return controls;
}
