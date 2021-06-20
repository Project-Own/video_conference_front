export const Logger = (arg: any) => {
  var now = (window.performance.now() / 1000).toFixed(3);
  console.log(`${now}: ${arg}`);
};
