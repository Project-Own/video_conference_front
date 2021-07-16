import { BoxBufferGeometry, Mesh, MeshNormalMaterial } from "three";

const createCube = () => {
  var cubeGeometry = new BoxBufferGeometry(1, 1, 1);
  var material = new MeshNormalMaterial();
  var cubeMesh = new Mesh(cubeGeometry, material);
  cubeMesh.position.y = 0.5;
  cubeMesh.castShadow = true;
  cubeMesh.receiveShadow = true;

  const cubeRenderFxn = () => {};
  return { cubeMesh, cubeRenderFxn };
};

export { createCube };
