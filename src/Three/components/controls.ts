import { MathUtils, Object3D } from "three";

const createControls = (object: Object3D) => {
  /**
   * Animation
   * */

  const radiansPerSecond = MathUtils.degToRad(30);

  const originalScale = object.scale.clone();

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "a":
        object.rotation.x += radiansPerSecond;
        break;
      case "d":
        object.rotation.x -= radiansPerSecond;
        break;
      case "w":
        object.rotation.y += radiansPerSecond;
        break;
      case "s":
        object.rotation.y -= radiansPerSecond;
        break;
      case "W":
        // if(delta<5){

        object.scale.x += 0.01;
        object.scale.y += 0.01;
        object.scale.z += 0.01;
        // }
        break;
      case "S":
        // if(delta)
        const scale = Math.max(object.scale.x - 0.01, 0);
        object.scale.x = scale;
        object.scale.y = scale;
        object.scale.z = scale;
        break;
      case "A":
        object.scale.x = originalScale.x;
        object.scale.y = originalScale.y;
        object.scale.z = originalScale.z;

        break;
      case "D":
        object.rotation.x = 0;
        object.rotation.y = 0;
        object.rotation.z = 0;

        break;
    }
  };

  window.removeEventListener("keydown", handleKeyDown);
  window.addEventListener("keydown", handleKeyDown);
};

export { createControls };
