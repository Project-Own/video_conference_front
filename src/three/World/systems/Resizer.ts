import { PerspectiveCamera, WebGLRenderer } from "three";

class Resizer {
  constructor(
    container: Element,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) {
    // set initial size
    this.#setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      // set size when resize occurs
      this.#setSize(container, camera, renderer);
      // performs custom actions
      this.onResize();
    });
  }

  #setSize = (
    container: Element,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer
  ) => {
    // Set camera aspect ratio
    camera.aspect = container.clientWidth! / container.clientHeight!;

    //  Update the camera's frustum
    camera.updateProjectionMatrix();

    // update size of renderer and canvas
    renderer.setSize(container.clientWidth!, container.clientHeight!);

    // set pixel ration(for mobile devices)
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  onResize = () => {};
}

export default Resizer;
