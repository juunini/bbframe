import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { FlyCamera } from '@babylonjs/core/Cameras/flyCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Camera } from '@babylonjs/core/Cameras/camera';

export default class BBScene extends HTMLElement {
  public canvas: HTMLCanvasElement = this.createCanvas();

  public engine: Engine;

  public scene: Scene;

  public camera?: Camera;

  constructor() {
    super();

    this.appendChild(this.canvas);

    this.engine = new Engine(this.canvas);
    this.scene = new Scene(this.engine);
  }

  connectedCallback() {
    if (!this.querySelector('bb-camera')) {
      this.camera = new FlyCamera('camera', new Vector3(0, 1.6, 0), this.scene);

      this.camera.attachControl(this.canvas, true);

      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
    }

    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  disconnectedCallback() {
    this.canvas.remove();
    this.camera!.dispose();
    this.scene.dispose();
    this.engine.dispose();
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    return canvas;
  }
}
