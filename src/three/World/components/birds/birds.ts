import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import setupModel from "./setupModel";

async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync(
      "https://corsanywhere.herokuapp.com/https://github.com/mrdoob/three.js/raw/dev/examples/models/gltf/Parrot.glb"
    ),
    loader.loadAsync(
      "https://corsanywhere.herokuapp.com/https://github.com/mrdoob/three.js/raw/dev/examples/models/gltf/Stork.glb"
    ),
    loader.loadAsync(
      "https://corsanywhere.herokuapp.com/https://github.com/mrdoob/three.js/raw/dev/examples/models/gltf/Flamingo.glb"
    ),
  ]);

  const parrot = setupModel(parrotData);
  const stork = setupModel(storkData);
  const flamingo = setupModel(flamingoData);

  parrot.object.position.set(0, 0, 25);
  stork.object.position.set(10, 0, -15);
  flamingo.object.position.set(0, -25, -30);
  parrot.object.scale.set(0.1, 0.1, 0.1);
  stork.object.scale.set(0.1, 0.1, 0.1);
  flamingo.object.scale.set(0.1, 0.1, 0.1);

  /**
   * GET name of all avaialbe .glb model from threejs examples
   */
  // const data = await fetch(
  //   "https://api.github.com/repositories/576201/contents/examples/models/gltf"
  // );

  // const gltfData: { name: string }[] = await data.json();

  // gltfData.map((data) => {
  //   const name = data.name.split(".");

  //   if (name.pop() === "glb") {
  //     console.log(name[0]);
  //   }
  // });

  return { parrot, stork, flamingo };
}
export default loadBirds;
