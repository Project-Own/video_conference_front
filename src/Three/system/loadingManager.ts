import { LoadingManager } from "three";

const createLoadingManager = () => {
  const manager = new LoadingManager();
  manager.onStart = (item, loaded, total) => {
    console.log("Loading Started");
  };
  manager.onProgress = (item, loaded, total) => {
    console.log(item, loaded, total);
  };
  manager.onError = () => {
    console.log("Error loading model");
  };
};

export { createLoadingManager };
