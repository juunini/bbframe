export class Engine {
  runRenderLoop = (callback: () => void) => callback();

  dispose() {}

  resize() {}
}
