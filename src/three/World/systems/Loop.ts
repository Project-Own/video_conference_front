import { Camera, Clock, Scene, WebGLRenderer } from "three";
import CustomObject from "../components/CustomObject";

class Loop {
  #camera: Camera;
  #scene: Scene;
  #renderer: WebGLRenderer;
  updatables: CustomObject<any>[] = [];

  #clock: Clock;
  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.#camera = camera;
    this.#scene = scene;
    this.#renderer = renderer;

    this.#clock = new Clock();
  }

  start() {
    // tells every animated object to tick forward one frame
    this.tick();
    // render a frame
    this.#renderer.setAnimationLoop(() => {
      this.tick();
      this.#renderer.render(this.#scene, this.#camera);
    });
  }

  stop() {
    this.#renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta funciton once per frame
    const delta = this.#clock.getDelta();

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export default Loop;
