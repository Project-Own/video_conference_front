import { Color, Mesh, MeshPhysicalMaterial, SphereGeometry } from "three";

const createCube = () => {
  var cubeGeometry = new SphereGeometry(1, 5, 5);
  var material = new MeshPhysicalMaterial({
    color: "white",
    sheen: 0.8,
    sheenColor: new Color("red"),
    transmission: 0.2,
    opacity: 1,
    metalness: 0.3,
    roughness: 0.8,
    emissive: new Color("red"),
  });
  var cubeMesh = new Mesh(cubeGeometry, material);
  cubeMesh.position.y = 0.5;
  // cubeMesh.position.set(-2, 2, -2);
  cubeMesh.castShadow = true;
  cubeMesh.receiveShadow = true;

  const cubeRenderFxn = () => {
    cubeMesh.rotation.y += 0.0005;
  };
  return { cubeMesh, cubeRenderFxn };
};

export { createCube };
