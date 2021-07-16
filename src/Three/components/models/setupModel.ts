import { AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

const setupModel = (data: GLTF) => {
  const model = data.scene.children[0];

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
