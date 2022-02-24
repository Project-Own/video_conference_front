import {
  ArMarkerControls,
  ArToolkitContext,
  ArSmoothedControls,
} from "@ar-js-org/ar.js/three.js/build/ar-threex.js";
import { Group } from "three";
import { addURLPath } from "src/utils/utils";
import { PerspectiveCamera } from "three";
const createAr = (camera: PerspectiveCamera) => {
  // // handle resize
  // window.addEventListener("resize", function () {
  //   onResize();
  // });
  // const onResize = () => {
  //   arToolkitSource.onResizeElement();
  //   arToolkitSource.copyElementSizeTo(renderer.domElement);
  //   if (arToolkitContext.arController !== null) {
  //     arToolkitSource.copyElementSizeTo(
  //       arToolkitContext.arController.canvas
  //     );
  //   }
  // };
  ////////////////////////////////////////////////////////////////////////////////
  //          initialize arToolkitContext
  ////////////////////////////////////////////////////////////////////////////////

  // create atToolkitContext
  const arToolkitContext = new ArToolkitContext({
    cameraParametersUrl: addURLPath("/data/camera_para.dat"),
    detectionMode: "mono",
  });

  // initialize it
  arToolkitContext.init(() => {
    // copy projection matrix to camera
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  ////////////////////////////////////////////////////////////////////////////////
  //          Create a ArMarkerControls
  ////////////////////////////////////////////////////////////////////////////////

  const markerGroup = new Group();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const arMarkerControls = new ArMarkerControls(arToolkitContext, markerGroup, {
    type: "pattern",
    patternUrl: addURLPath("/data/patt.hiro"),
    // patternUrl: addURLPath("/data/pattern-marker.patt"),
  });

  const smoothedControls = new ArSmoothedControls(markerGroup, {
    lerpPosition: 0.8,
    lerpQuaternion: 0.8,
    lerpScale: 1,
    // minVisibleDelay: 1,
    // minUnvisibleDelay: 1,
  });
  return { markerGroup, arToolkitContext, smoothedControls };
};

export { createAr };
