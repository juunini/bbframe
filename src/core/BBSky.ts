import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';

import type BBScene from './BBScene';

const observedAttributes = [
  'color',
] as const;
type ObservedAttributes = typeof observedAttributes[number];

export default class BBSky extends HTMLElement {
  static get observedAttributes(): typeof observedAttributes {
    return observedAttributes;
  }

  public object3D: Mesh;

  constructor() {
    super();

    const bbScene = this.closest('bb-scene') as BBScene;
    this.object3D = CreateSphere('sphere', { diameter: 500, segments: 64 }, bbScene.scene);
    this.object3D.material = new StandardMaterial('standard material for sphere', bbScene.scene);
    this.object3D.material.sideOrientation = 0;
    this.setColor('255 255 255');
  }

  attributeChangedCallback(key: ObservedAttributes, _oldValue: string, newValue: string): void {
    const callbacks = {
      color: (value: string) => this.setColor(value),
    };

    callbacks[key](newValue);
  }

  private setColor(color: string): void {
    if (color.includes(' ')) {
      const colors = this.stringToNumber3(color);

      (this.object3D.material! as StandardMaterial)
        .emissiveColor = new Color3(colors[0], colors[1], colors[2]);
      return;
    }

    (this.object3D.material! as StandardMaterial)
      .emissiveColor = Color3.FromHexString(color);
  }

  private stringToNumber3(value: string): number[] {
    return value
      .split(' ')
      .map((currentValue) => parseFloat(currentValue));
  }
}
