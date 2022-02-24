import { Camera, Clock, Scene, WebGLRenderer } from "three";
import Stats from "three/examples/jsm/libs/stats.module";

class Loop {
  #camera: Camera;
  #scene: Scene;
  #renderer: WebGLRenderer;
  #stats: Stats;

  renderFunctions: ((delta: number) => void)[] = [];

  #clock: Clock;
  constructor(camera: Camera, scene: Scene, renderer: WebGLRenderer) {
    this.#camera = camera;
    this.#scene = scene;
    this.#renderer = renderer;

    this.#stats = Stats();
    document.body.append(this.#stats.dom);

    this.#clock = new Clock();
  }

  start() {
    // tells every animated object to tick forward one frame
    this.tick();
    // render a frame
    this.#renderer.setAnimationLoop(() => {
      this.#stats.begin();
      this.tick();
      this.#renderer.render(this.#scene, this.#camera);
      this.#stats.end();

      this.#stats.update();
    });
  }
  stop() {
    this.#renderer.setAnimationLoop(null);
  }

  tick() {
    try {
      // only call the getDelta funciton once per frame
      const delta = this.#clock.getDelta();
      // console.log(`The last frame rendered in ${delta * 1000} milliseconds`);

      for (const fxn of this.renderFunctions) {
        fxn(delta);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export default Loop;
