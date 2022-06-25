import { Camera } from '@babylonjs/core/Cameras/camera';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import type BBScene from './BBScene';

// TODO: Add many camera type
export default class BBCamera extends HTMLElement {
  public camera?: Camera;

  connectedCallback() {
    const bbScene = this.closest('bb-scene') as BBScene;

    bbScene.camera.dispose();
    this.camera = new FreeCamera('camera', new Vector3(0, 0, 0), bbScene.scene);
    bbScene.camera = this.camera;

    bbScene.camera.attachControl(bbScene.canvas, true);
  }
}
