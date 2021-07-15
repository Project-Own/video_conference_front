import { AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import CustomObject from "../CustomObject";

const setupModel = (data: GLTF) => {
  const model = data.scene.children[0];

  const clip = data.animations[0];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);

  action.play();

  const modelObj = new CustomObject(model);
  modelObj.tick = (delta: number) => mixer.update(delta);
  return modelObj;
};
export default setupModel;
