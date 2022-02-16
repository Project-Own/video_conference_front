import {
  ArMarkerControls,
  ArSmoothedControls,
  ArToolkitContext,
} from "@ar-js-org/ar.js/three.js/build/ar-threex.js";
import { fetchModelNames } from "src/utils/three";
import {
  Group,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createAr } from "./components/ar";
import { createCamera } from "./components/camera";
import { createControls } from "./components/controls";
import { createCube } from "./components/cube";
import { createLights } from "./components/lights";
import loadModel from "./components/models/model";
import { createShadowCatcher } from "./components/shadowCatcher";
import Loop from "./system/Loop";
import { createRenderer } from "./system/renderer";

export class World {
  orbitControls?: OrbitControls;
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  loop: Loop;

  webcamElement?: HTMLVideoElement;

  arToolkitContext: typeof ArToolkitContext;
  arMarkerControls: typeof ArMarkerControls;

  smoothedControls: typeof ArSmoothedControls;

  markerGroup: Group;
  modelGroup: Group;
  createControls: (object: Object3D) => void;
  glbModelNames: string[] = [];
  constructor(
    canvasRef: HTMLCanvasElement,
    controls?: (object: Object3D) => void
  ) {
    this.renderer = createRenderer(canvasRef);

    this.camera = createCamera();

    this.scene = new Scene();

    this.loop = new Loop(this.camera, this.scene, this.renderer);

    const { ambientLight, mainLight, lightSphere } = createLights();

    const { markerGroup, arToolkitContext, smoothedControls } = createAr(
      this.camera
    );

    this.modelGroup = new Group();

    const floorMesh = createShadowCatcher();

    this.arToolkitContext = arToolkitContext;
    this.markerGroup = markerGroup;

    this.scene.add(markerGroup);

    this.markerGroup.add(
      floorMesh,
      ambientLight,
      mainLight,
      lightSphere,
      this.modelGroup
    );

    this.smoothedControls = smoothedControls;
    this.createControls = controls ? controls : createControls;
    this.loadCube();
  }

  setWebcamStream = (webcamStream: MediaStream) => {
    console.log("Web cam Set");
    this.webcamElement = document.createElement("video");
    this.webcamElement.autoplay = true;
    this.webcamElement.playsInline = true;
    this.webcamElement.muted = true;
    this.webcamElement.srcObject = webcamStream!;
    this.webcamElement.oncanplaythrough = () => {
      this.webcamElement?.play().catch((e) => {
        console.log(e);
      });
    };

    // update artoolkit on every frame
    this.loop.renderFunctions.push(() => {
      // if (this.arToolkitSource.ready === false) return;
      try {
        this.arToolkitContext.update(this.webcamElement!);

        this.smoothedControls.update(this.markerGroup);
      } catch (error) {
        // console.log(error);
      }
    });
  };
  init = async () => {
    this.glbModelNames = (await fetchModelNames()) as string[];
  };

  // Load a default Cube
  loadCube = () => {
    const { cubeMesh, cubeRenderFxn } = createCube();

    this.createControls(cubeMesh);

    this.modelGroup.remove(this.modelGroup.children[0]);
    this.modelGroup.add(cubeMesh);

    this.loop.renderFunctions.push(cubeRenderFxn);
  };
  // Load model by specifying URI
  loadModel = async (uri: string) => {
    const { model, modelRenderFxn } = await loadModel(uri);
    if (model === null) {
      throw Error("Failed to Load Model!");
    }
    if (model !== null && model) {
      this.createControls(model!);

      this.modelGroup.remove(this.modelGroup.children[0]);
      this.modelGroup.add(model!);
      this.loop.renderFunctions.push(modelRenderFxn);
    }
  };

  loadGithubGLBModels = async (name: string) => {
    console.log(name);
    const uri = `https://cors-anywhere.herokuapp.com/https://github.com/mrdoob/three.js/raw/dev/examples/models/gltf/${name}.glb`;

    await this.loadModel(uri);
  };
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };
  start = () => {
    this.loop.start();
  };

  stop = () => {
    this.loop.stop();
  };
}
