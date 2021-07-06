import { useEffect, useRef } from "react";
import { addURLPath } from "src/utils/utils";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Scene {
  orbitControls: OrbitControls;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGL1Renderer;
  constructor(canvasRef: HTMLCanvasElement) {
    this.scene = new THREE.Scene();
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    this.setLights();

    /**
     *Camera
     * */
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 2;

    /**
     * Renderer
     * */
    this.renderer = new THREE.WebGL1Renderer({
      canvas: canvasRef,
      // alpha: true,
    });
    this.renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    // this.renderer.setPixelRatio(2);
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.domElement.style.position = "absolute";
    // this.renderer.domElement.style.top = "0px";
    // this.renderer.domElement.style.left = "0px";
    this.renderer.physicallyCorrectLights = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    /**
     * Orbital Controls
     * */
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.screenSpacePanning = true;
    this.orbitControls.target.set(0, 1, 0);

    /**
     * GLTF Loader
     * */

    const gltfLoader: GLTFLoader = new GLTFLoader();
    gltfLoader.load(
      addURLPath("/models/eve_out/eve.gltf"),
      (gltf) => {
        // gltf.scene.scale.set(0.1, 0.1, 0.1);
        this.setControls(gltf.scene.children);
        this.scene.add(gltf.scene);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    this.setObjects();

    /**
     * Window Listener
     * */

    const onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.render();
    };

    window.addEventListener("resize", onWindowResize, false);

    // this.animate();
  }
  render = () => {
    this.renderer.render(this.scene, this.camera);
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    // controls.update();

    this.render();
  };
  setLights = () => {
    const ambientLight = new THREE.AmbientLight();
    // light.position.set(5, 5, 5);
    this.scene.add(ambientLight);

    const spotLight = new THREE.PointLight("green");
    spotLight.position.set(0, 1, 0.5);
    this.scene.add(spotLight);

    const spotLightHelper = new THREE.PointLightHelper(spotLight);
    this.scene.add(spotLightHelper);

    var directionalLight = new THREE.DirectionalLight("red", 3);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    var directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight
    );
    this.scene.add(directionalLightHelper);
  };

  setObjects = () => {
    const objects: THREE.Object3D[] = [];

    const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(100, 20);
    const plane: THREE.Mesh = new THREE.Mesh(
      planeGeometry,
      new THREE.MeshPhongMaterial()
    );
    plane.rotateX(-Math.PI / 2);
    plane.position.y = -1;
    plane.receiveShadow = true;
    this.scene.add(plane);
    objects.push(plane);

    const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
    //const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true })
    //const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
    //scene.add(cube)

    const material: THREE.MeshPhongMaterial[] = [
      new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true }),
      new THREE.MeshPhongMaterial({ color: 0x00ff00, transparent: true }),
      new THREE.MeshPhongMaterial({ color: 0x0000ff, transparent: true }),
    ];

    const cubes: THREE.Mesh[] = [
      new THREE.Mesh(geometry, material[0]),
      new THREE.Mesh(geometry, material[1]),
      new THREE.Mesh(geometry, material[2]),
    ];
    cubes[0].position.x = -2;
    cubes[1].position.x = 0;
    cubes[2].position.x = 2;
    cubes.forEach((c) => this.scene.add(c));
    objects.concat(cubes);

    this.setControls(cubes);

    return objects;
  };

  setControls = (objects: THREE.Object3D[]) => {
    const orbitControls = this.orbitControls;
    // const dragControls = new DragControls(
    //   objects,
    //   this.camera,
    //   this.renderer.domElement
    // );

    // dragControls.addEventListener("hoveron", function () {
    //   orbitControls.enabled = false;
    // });
    // dragControls.addEventListener("hoveroff", function () {
    //   orbitControls.enabled = true;
    // });
    // dragControls.addEventListener("dragstart", function (event) {
    //   event.object.material.opacity = 0.33;
    // });
    // dragControls.addEventListener("dragend", function (event) {
    //   event.object.material.opacity = 1;
    // });

    objects.forEach((object) => {
      const transformControls = new TransformControls(
        this.camera,
        this.renderer.domElement
      );
      transformControls.attach(object);
      transformControls.setMode("rotate");
      this.scene.add(transformControls);
      transformControls.addEventListener("dragging-changed", function (event) {
        orbitControls.enabled = !event.value;
        // dragControls.enabled = !event.value;
      });

      window.addEventListener("keydown", function (event) {
        switch (event.key) {
          case "g":
            transformControls.setMode("translate");
            break;
          case "r":
            transformControls.setMode("rotate");
            break;
          case "s":
            transformControls.setMode("scale");
            break;
        }
      });
    });
  };
}

const ModelLoader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = new Scene(canvasRef.current!);
    scene.animate();

    // document.body.appendChild(renderer.domElement);
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};

export default ModelLoader;
