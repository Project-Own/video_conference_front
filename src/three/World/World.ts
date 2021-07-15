import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import loadBirds from "./components/birds/birds";
import createCamera from "./components/camera";
import createCube from "./components/cube";
import createLights from "./components/lights";
import createScene from "./components/scene";
import createControls from "./systems/controls";
import Loop from "./systems/Loop";
import createRenderer from "./systems/renderer";
import Resizer from "./systems/Resizer";

class World {
  #camera: PerspectiveCamera;
  #scene: Scene;
  #renderer: WebGLRenderer;
  #loop: Loop;
  #controls: OrbitControls;

  constructor(htmlElement: Element) {
    this.#camera = createCamera();
    this.#scene = createScene();

    if (htmlElement.nodeName === "CANVAS") {
      this.#renderer = createRenderer(htmlElement as HTMLCanvasElement);
    } else {
      this.#renderer = createRenderer();
      htmlElement.append(this.#renderer.domElement);
    }

    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer);

    const controls = createControls(this.#camera, this.#renderer.domElement);
    this.#controls = controls.object;

    const { ambientLight, mainLight } = createLights();

    const cube = createCube();
    this.#loop.updatables.push(cube);
    this.#loop.updatables.push(controls);

    this.#scene.add(ambientLight, mainLight, cube.object);

    const resizer = new Resizer(htmlElement, this.#camera, this.#renderer);

    resizer.onResize = () => {
      this.render();
    };
  }

  async init() {
    const { parrot, stork, flamingo } = await loadBirds();

    this.#controls.target.copy(parrot.object.position);

    this.#loop.updatables.push(parrot, stork, flamingo);

    this.#scene.add(parrot.object, stork.object, flamingo.object);
  }
  // produce a single frame (render on demand)
  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }
  // start loop (produce a stream of frames)
  start() {
    this.#loop.start();
  }
  stop() {
    this.#loop.stop();
  }
}

export default World;
