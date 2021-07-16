import {
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PointLight,
  SphereGeometry,
} from "three";
const createLights = () => {
  const ambientLight = new HemisphereLight("skyblue", "brown", 2);

  const mainLight = new PointLight("white", 5, 100);
  mainLight.position.set(0, 10, 0); //default; light shining from top
  mainLight.castShadow = true;

  // const pointLightHelper = new .PointLightHelper(pointLight);
  // this.sceneGroup.add(pointLightHelper);

  // var directionalLight = new THREE.DirectionalLight("red", 3);
  // directionalLight.position.set(1, 1, 1);
  // this.sceneGroup.add(directionalLight);

  // var directionalLightHelper = new THREE.DirectionalLightHelper(
  //   directionalLight
  // );
  // this.sceneGroup.add(directionalLightHelper);

  const lightSphere = new Mesh(
    new SphereGeometry(0.1),
    new MeshBasicMaterial({
      color: "blue",
      transparent: true,
      opacity: 0.8,
    })
  );
  lightSphere.position.copy(mainLight.position);

  return { ambientLight, mainLight, lightSphere };
};

export { createLights };
