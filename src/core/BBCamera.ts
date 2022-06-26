import { Camera } from '@babylonjs/core/Cameras/camera';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import type BBScene from './BBScene';

const observedAttributes = [
  'position',
  'rotation',
] as const;
type ObservedAttributes = typeof observedAttributes[number];

// TODO: Add many camera type
export default class BBCamera extends HTMLElement {
  static get observedAttributes(): typeof observedAttributes {
    return observedAttributes;
  }

  public object3D: Camera;

  constructor() {
    super();

    const bbScene = this.closest('bb-scene') as BBScene;

    this.object3D = new FreeCamera('camera', new Vector3(0, 1.6, 0), bbScene.scene);
  }

  connectedCallback() {
    const bbScene = this.closest('bb-scene') as BBScene;

    bbScene.camera = this.object3D;

    bbScene.camera.attachControl(bbScene.canvas, true);

    bbScene.engine.runRenderLoop(() => {
      bbScene.scene.render();
    });
  }

  attributeChangedCallback(key: ObservedAttributes, _oldValue: string, newValue: string): void {
    const callbacks = {
      position: (value: string) => this.setPosition(value),
      rotation: (value: string) => this.setRotation(value),
    };

    callbacks[key](newValue);
  }

  private setPosition(position: string): void {
    const positions = this.stringToNumber3(position);

    this.object3D.position = new Vector3(positions[0], positions[1], positions[2]);
  }

  private setRotation(rotation: string): void {
    const rotations = this.stringToNumber3(rotation);

    (this.object3D as FreeCamera).rotation = new Vector3(rotations[0], rotations[1], rotations[2]);
  }

  private stringToNumber3(value: string): number[] {
    return value
      .split(' ')
      .map((currentValue) => parseFloat(currentValue));
  }
}
