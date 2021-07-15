import { WebGLRenderer } from "three";

const createRenderer = (canvas?: HTMLCanvasElement) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas: canvas ? canvas : undefined,
  });

  // Turn on physicall correct lighting (how light fades with distance)🔦
  renderer.physicallyCorrectLights = true;

  return renderer;
};

export default createRenderer;
