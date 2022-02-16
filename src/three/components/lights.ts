import {
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PointLight,
  PointLightHelper,
  RectAreaLight,
  SphereGeometry,
} from "three";
const createLights = () => {
  const ambientLight = new HemisphereLight("skyblue", "#353535", 0.5);

  const width = 10;
  const height = 20;
  const intensity = 1;
  const rectLight = new RectAreaLight("#ffef87", intensity, width, height);
  rectLight.position.set(2, 2, 2);
  rectLight.lookAt(0, 0, 0);
  // rectLight.castShadow = true;

  const pointLight = new PointLight("green", 1, 10);
  pointLight.position.set(-2, 2, -2); //default; light shining from top
  pointLight.rotateZ(30);
  pointLight.castShadow = true;

  const pointLightHelper = new PointLightHelper(pointLight);

  var directionalLight = new DirectionalLight("skyblue", 0.5);
  directionalLight.position.set(15, 12, 3);
  directionalLight.target.position.set(0, 0, 0);
  directionalLight.castShadow = true;

  // this.sceneGroup.add(directionalLight);

  var directionalLightHelper = new DirectionalLightHelper(directionalLight);
  // this.sceneGroup.add(directionalLightHelper);

  const lightSphere = new Mesh(
    new SphereGeometry(0.1),
    new MeshBasicMaterial({
      color: "blue",
      transparent: true,
      opacity: 0.8,
    })
  );
  lightSphere.position.copy(directionalLight.position);

  return {
    ambientLight,
    pointLight,
    pointLightHelper,
    directionalLight,
    directionalLightHelper,
    lightSphere,
    rectLight,
  };
};

export { createLights };
