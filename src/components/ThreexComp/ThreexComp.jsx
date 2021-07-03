/* eslint-disable no-redeclare */
import {
  ArMarkerControls,
  ArToolkitContext,
  ArToolkitProfile,
  ArToolkitSource,
} from "@ar-js-org/ar.js/three.js/build/ar-threex";
import React from "react";
import { addURLPath } from "src/utils/utils";
import * as THREE from "three";

export default class ThreexComp extends React.Component {
  componentDidMount() {
    ArToolkitContext.baseURL = "./";
    // init renderer
    var renderer = new THREE.WebGLRenderer({
      // antialias	: true,
      // canvas: this.mount,
      alpha: true,
    });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    // renderer.setPixelRatio( 2 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.left = "0px";
    document.body.appendChild(renderer.domElement);

    // array of functions for the rendering loop
    var onRenderFcts = [];

    // init scene and camera
    var scene = new THREE.Scene();

    //////////////////////////////////////////////////////////////////////////////////
    //		Initialize a basic camera
    //////////////////////////////////////////////////////////////////////////////////

    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);
    const artoolkitProfile = new ArToolkitProfile();
    artoolkitProfile.sourceWebcam();

    const arToolkitSource = new ArToolkitSource(
      artoolkitProfile.sourceParameters
    );

    arToolkitSource.init(function onReady() {
      onResize();
    });

    // handle resize
    window.addEventListener("resize", function () {
      onResize();
    });

    function onResize() {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(renderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
      }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////

    console.log(addURLPath("/data/camera_para.dat"));

    // create atToolkitContext
    var arToolkitContext = new ArToolkitContext({
      cameraParametersUrl: addURLPath("/data/camera_para.dat"),
      // ArToolkitContext.baseURL + "data/camera_para.dat",
      detectionMode: "mono",
    });

    // initialize it
    arToolkitContext.init(function onCompleted() {
      // copy projection matrix to camera
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    // update artoolkit on every frame
    onRenderFcts.push(function () {
      if (arToolkitSource.ready === false) return;

      arToolkitContext.update(arToolkitSource.domElement);
    });

    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////

    var markerGroup = new THREE.Group();
    scene.add(markerGroup);

    // eslint-disable-next-line no-unused-vars
    var markerControls = new ArMarkerControls(arToolkitContext, markerGroup, {
      type: "pattern",
      patternUrl: addURLPath("/data/patt.hiro"),
    });

    //////////////////////////////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////

    var markerScene = new THREE.Scene();
    markerGroup.add(markerScene);

    var mesh = new THREE.AxesHelper();
    markerScene.add(mesh);

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

    var geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.5;
    markerScene.add(mesh);

    onRenderFcts.push(function (delta) {
      mesh.rotation.x += delta * Math.PI;
    });

    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////
    onRenderFcts.push(function () {
      renderer.render(scene, camera);
    });

    // run the rendering loop
    var lastTimeMsec = null;
    requestAnimationFrame(function animate(nowMsec) {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // call each update function
      onRenderFcts.forEach(function (onRenderFct) {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    });
  }

  render() {
    return (
      <canvas
        style={{ width: "800px", height: "800px" }}
        ref={(mount) => {
          this.mount = mount;
        }}
      />
    );
  }
}
