import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';

import type BBScene from './BBScene';

const observedAttributes = [
  'position',
  'color',
  'rotation',
] as const;
type ObservedAttributes = typeof observedAttributes[number];

export default class BBBox extends HTMLElement {
  static get observedAttributes(): typeof observedAttributes {
    return observedAttributes;
  }

  public object3D: Mesh;

  constructor() {
    super();

    const bbScene = this.closest('bb-scene') as BBScene;
    this.object3D = CreateBox('box', {}, bbScene.scene);
    this.object3D.material = new StandardMaterial('standard material for box', bbScene.scene);
  }

  attributeChangedCallback(key: ObservedAttributes, _oldValue: string, newValue: string): void {
    const callbacks = {
      color: (value: string) => this.setColor(value),
      position: (value: string) => this.setPosition(value),
      rotation: (value: string) => this.setRotation(value),
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

  private setPosition(position: string): void {
    const positions = this.stringToNumber3(position);

    this.object3D.position = new Vector3(positions[0], positions[1], positions[2]);
  }

  private setRotation(rotation: string): void {
    const rotations = this.stringToNumber3(rotation);

    this.object3D.rotation = new Vector3(rotations[0], rotations[1], rotations[2]);
  }

  private stringToNumber3(value: string): number[] {
    return value
      .split(' ')
      .map((currentValue) => parseInt(currentValue, 10));
  }
}
