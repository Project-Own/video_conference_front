import { Box3, Vector3 } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import setupModel from "./setupModel";

async function loadModel(uri: string) {
  // const loadingManger = createLoadingManager();

  try {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
    );
    dracoLoader.setDecoderConfig({ type: "js" });

    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(
      "https://corsanywhere.herokuapp.com/https://github.com/mrdoob/three.js/tree/dev/examples/js/libs/basis/"
    );
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.setKTX2Loader(ktx2Loader);

    const modelData = await loader.loadAsync(uri, (event) => {
      console.log(event);
    });

    const { model, modelRenderFxn } = setupModel(modelData);

    /**
     * Scaling Information from
     * https://discourse.threejs.org/t/does-three-have-any-kind-of-independent-unit-i-understand-that-a-unit-in-three-is-abstract-but-scale-set-seems-to-be-relative-to-the-models-imported-size/16019/7
     * */
    const box = new Box3().setFromObject(model);
    const size = new Vector3();
    box.getSize(size);
    const scaleVec = new Vector3(1, 1, 1).divide(size);
    const scale = Math.min(scaleVec.x, Math.min(scaleVec.y, scaleVec.z));
    model.scale.setScalar(scale);

    // model.scale.set(0.01, 0.01, 0.01);
    // model.position.set(1.5, 0, 0);

    model.castShadow = true;
    model.receiveShadow = true;

    return { model, modelRenderFxn };
  } catch (err) {
    console.log(err);
  }

  const model = null;
  const modelRenderFxn = () => {};
  return { model, modelRenderFxn };
}
export default loadModel;
