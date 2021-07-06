import {
  ArMarkerControls,
  ArToolkitContext,
  ArToolkitProfile,
} from "@ar-js-org/ar.js/three.js/build/ar-threex.js";
import { useEffect, useRef } from "react";
import { useWebcam } from "src/hooks/useWebcam";
import { addURLPath } from "src/utils/utils";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface RenderFunction {
  callback: (delta?: number, now?: number) => void;
}
export class Scene {
  orbitControls?: OrbitControls;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGL1Renderer;
  onRenderFcts: RenderFunction["callback"][] = [];

  arToolkitProfile: typeof ArToolkitProfile;
  // arToolkitSource: typeof ArToolkitSource;
  arToolkitContext: typeof ArToolkitContext;
  arMarkerControls: typeof ArMarkerControls;

  constructor(canvasRef: HTMLCanvasElement, videoRef: HTMLVideoElement) {
    this.renderer = this.setRenderer(canvasRef);
    this.camera = this.setCamera();

    this.scene = this.setScene();
    // this.setLights();

    // this.orbitControls = this.setOrbitControls();

    // this.loadModel();

    this.setAr(videoRef);

    // this.setObjects();

    /**
     * Window Listener
     * */

    // const onWindowResize = () => {
    //   this.camera.aspect = window.innerWidth / window.innerHeight;
    //   this.camera.updateProjectionMatrix();
    //   this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   this.animate();
    // };

    // window.addEventListener("resize", onWindowResize, false);

    // this.animate();
  }
  setAr = (videoRef: HTMLVideoElement) => {
    // // handle resize
    // window.addEventListener("resize", function () {
    //   onResize();
    // });
    // const onResize = () => {
    //   this.arToolkitSource.onResizeElement();
    //   this.arToolkitSource.copyElementSizeTo(this.renderer.domElement);
    //   if (this.arToolkitContext.arController !== null) {
    //     this.arToolkitSource.copyElementSizeTo(
    //       this.arToolkitContext.arController.canvas
    //     );
    //   }
    // };
    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////

    // create atToolkitContext
    this.arToolkitContext = new ArToolkitContext({
      cameraParametersUrl: addURLPath("/data/camera_para.dat"),
      detectionMode: "mono",
    });

    // initialize it
    this.arToolkitContext.init(() => {
      // copy projection matrix to camera
      this.camera.projectionMatrix.copy(
        this.arToolkitContext.getProjectionMatrix()
      );
    });

    // update artoolkit on every frame
    this.onRenderFcts.push(() => {
      // if (this.arToolkitSource.ready === false) return;

      try {
        this.arToolkitContext.update(videoRef);
      } catch (error) {
        // console.log(error);
      }
    });

    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////

    var markerGroup = new THREE.Group();
    this.scene.add(markerGroup);

    this.arMarkerControls = new ArMarkerControls(
      this.arToolkitContext,
      markerGroup,
      {
        type: "pattern",
        patternUrl: addURLPath("/data/patt.hiro"),
      }
    );

    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////

    var markerScene = new THREE.Scene();
    markerGroup.add(markerScene);

    var axesHelper = new THREE.AxesHelper();
    markerScene.add(axesHelper);

    // add a torus knot
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = geometry.parameters.height / 2;
    markerScene.add(mesh);

    var torusGeometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
    var material2 = new THREE.MeshNormalMaterial();
    var mesh2 = new THREE.Mesh(torusGeometry, material2);
    mesh2.position.y = 0.5;
    markerScene.add(mesh2);

    this.onRenderFcts.push((delta = 0) => {
      mesh.rotation.x += delta * Math.PI;
    });

    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////
    this.onRenderFcts.push(() => {
      this.renderer.render(this.scene, this.camera);
    });
  };
  loadModel = () => {
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
  };
  setOrbitControls = () => {
    /**
     * Orbital Controls
     * */
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.screenSpacePanning = true;
    controls.target.set(0, 1, 0);

    return controls;
  };

  setCamera = () => {
    /**
     *Camera
     * */
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // camera.position.z = 2;

    return camera;
  };

  setRenderer = (canvasRef: HTMLCanvasElement) => {
    /**
     * Renderer
     * */
    const renderer = new THREE.WebGL1Renderer({
      canvas: canvasRef,
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    // renderer.setPixelRatio(2);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.domElement.style.position = "absolute";
    // renderer.domElement.style.top = "0px";
    // renderer.domElement.style.left = "0px";
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;

    // document.body.appendChild(renderer.domElement);
    return renderer;
  };

  setScene = () => {
    const scene = new THREE.Scene();
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    return scene;
  };
  // render = () => {
  //   this.renderer.render(this.scene, this.camera);
  // };
  animate = () => {
    // run the rendering loop
    var lastTimeMsec = 0;
    const animate = (nowMsec: number) => {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // call each update function
      this.onRenderFcts.forEach((onRenderFct) => {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    };
    requestAnimationFrame(animate);
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
        if (orbitControls) orbitControls.enabled = !event.value;
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
  const { videoTracks, toggleWebcam } = useWebcam();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const scene = new Scene(canvasRef.current!, videoRef.current!);
    scene.animate();
    // document.body.appendChild(renderer.domElement);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const srcObject = videoTracks ? new MediaStream(videoTracks) : null;

      videoRef.current.srcObject = srcObject;

      // const url = URL.createObjectURL();
    }
  }, [videoTracks]);
  return (
    <div style={{ position: "relative", height: "200px", width: "200px" }}>
      <button onClick={toggleWebcam}>Toggle Webcam</button>
      <p>Sahas</p>

      <video
        id="arjs-video"
        onCanPlayThrough={() => {
          videoRef.current?.play().catch((e) => {
            console.log(e);
          });
        }}
        onError={() => console.log("Something went wrorn in video")}
        autoPlay
        playsInline
        muted
        ref={videoRef}
        style={{
          width: "inherit",
          height: "inherit",
          objectFit: "cover",
          position: "absolute",
        }}
      ></video>
      <canvas
        ref={canvasRef}
        style={{ width: "inherit", height: "inherit", position: "absolute" }}
      ></canvas>
    </div>
  );
};

export default ModelLoader;
