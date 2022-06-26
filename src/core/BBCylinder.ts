import { CreateCylinder } from '@babylonjs/core/Meshes/Builders/cylinderBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';

import type BBScene from './BBScene';

const observedAttributes = [
  'position',
  'color',
  'radius',
  'height',
] as const;
type ObservedAttributes = typeof observedAttributes[number];

export default class BBCylinder extends HTMLElement {
  static get observedAttributes(): typeof observedAttributes {
    return observedAttributes;
  }

  public object3D: Mesh;

  private diameter?: number;

  private height?: number;

  constructor() {
    super();

    const bbScene = this.closest('bb-scene') as BBScene;
    this.object3D = CreateCylinder('cylinder', {}, bbScene.scene);
    this.object3D.material = new StandardMaterial('standard material for cylinder', bbScene.scene);
  }

  attributeChangedCallback(key: ObservedAttributes, _oldValue: string, newValue: string): void {
    const callbacks = {
      color: (value: string) => this.setColor(value),
      position: (value: string) => this.setPosition(value),
      radius: (value: string) => this.setRadius(value),
      height: (value: string) => this.setHeight(value),
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

  private setRadius(radius: string): void {
    this.diameter = parseFloat(radius);

    this.reRenderCylinder();
  }

  private setHeight(height: string): void {
    this.height = parseFloat(height);

    this.reRenderCylinder();
  }

  private reRenderCylinder() {
    const scene = this.object3D.getScene();
    const { position, material } = this.object3D;

    this.object3D.dispose();

    this.object3D = CreateCylinder('cylinder', { diameter: this.diameter, height: this.height }, scene);
    this.object3D.material = material;
    this.object3D.position = position;
  }

  private stringToNumber3(value: string): number[] {
    return value
      .split(' ')
      .map((currentValue) => parseFloat(currentValue));
  }
}
