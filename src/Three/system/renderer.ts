import { Color, PCFShadowMap, sRGBEncoding, WebGLRenderer } from "three";

const createRenderer = (canvasEl: HTMLCanvasElement) => {
  /**
   * Renderer
   * */
  const renderer = new WebGLRenderer({
    canvas: canvasEl,
    alpha: true,
    antialias: true,
  });
  renderer.setClearColor(new Color("lightgrey"), 0);
  // renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = sRGBEncoding;
  renderer.shadowMap.type = PCFShadowMap;

  return renderer;
};

export { createRenderer };
