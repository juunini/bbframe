import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Camera } from '@babylonjs/core/Cameras/camera';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

export default class BBScene extends HTMLElement {
  public canvas: HTMLCanvasElement = this.createCanvas();

  public engine: Engine;

  public scene: Scene;

  public camera: Camera;

  constructor() {
    super();

    this.appendChild(this.canvas);

    this.engine = new Engine(this.canvas);
    this.scene = new Scene(this.engine);
    this.camera = new FreeCamera('camera', new Vector3(0, 0, 0), this.scene);
  }

  createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    return canvas;
  }

  connectedCallback() {
    this.camera.attachControl(this.canvas, true);

    this.engine.runRenderLoop(() => {
      this.scene!.render();
    });
  }

  disconnectedCallback() {
    this.canvas.remove();
    this.camera.dispose();
    this.scene.dispose();
    this.engine.dispose();
  }
}
