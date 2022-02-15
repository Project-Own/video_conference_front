import { Mesh, PlaneGeometry, ShadowMaterial } from "three";

const createShadowCatcher = () => {
  /**
   * Floor
   * To Catch Shadow
   * */
  const floorGeometry = new PlaneGeometry(200, 200);
  const floorMaterial = new ShadowMaterial();
  floorMaterial.opacity = 0.3;
  const floorMesh = new Mesh(floorGeometry, floorMaterial);
  floorMesh.rotateX(-Math.PI / 2);
  floorMesh.position.y = -1;
  floorMesh.receiveShadow = true;

  return floorMesh;
};

export { createShadowCatcher };
