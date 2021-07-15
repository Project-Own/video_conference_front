// Inorder to add Tick function for adding animations
class CustomObject<T> {
  object: T;
  constructor(object: T) {
    this.object = object;
  }
  tick = (delta: number) => {};
}

export default CustomObject;
