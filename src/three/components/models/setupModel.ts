import { AnimationMixer, Box3, Vector3 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

const setupModel = (data: GLTF) => {
  const model = data.scene.children[0];

  const bbox = new Box3().setFromObject(model);
  let sizeVec = new Vector3();
  let worldSizeVec = new Vector3();
  bbox.getSize(sizeVec);
  console.log("Three Modle", bbox.min, bbox.max);
  console.log("Three Model size", sizeVec);
  model.getWorldScale(worldSizeVec);
  console.log("THree Model World Scale", worldSizeVec);
  if (sizeVec.x > 100 && sizeVec.y > 100 && sizeVec.z > 100)
    model.scale.set(
      worldSizeVec.x / sizeVec.x,
      worldSizeVec.y / sizeVec.y,
      worldSizeVec.z / sizeVec.z
    );
  let modelRenderFxn = (delay: number) => {};
  if (data.animations.length > 0) {
    const clip = data.animations[0];

    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);

    action.play();

    modelRenderFxn = (delta: number) => mixer.update(delta);
  }

  return { model, modelRenderFxn };
};
export default setupModel;
