import { CreatePlane } from '@babylonjs/core/Meshes/Builders/planeBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';

import type BBScene from './BBScene';

const observedAttributes = [
  'position',
  'rotation',
  'color',
  'width',
  'height',
] as const;
type ObservedAttributes = typeof observedAttributes[number];

export default class BBPlane extends HTMLElement {
  static get observedAttributes(): typeof observedAttributes {
    return observedAttributes;
  }

  public object3D: Mesh;

  private width?: number;

  private height?: number;

  constructor() {
    super();

    const bbScene = this.closest('bb-scene') as BBScene;
    this.object3D = CreatePlane('plane', {}, bbScene.scene);
    this.object3D.material = new StandardMaterial('standard material for plane', bbScene.scene);
  }

  attributeChangedCallback(key: ObservedAttributes, _oldValue: string, newValue: string): void {
    const callbacks = {
      position: (value: string) => this.setPosition(value),
      rotation: (value: string) => this.setRotation(value),
      color: (value: string) => this.setColor(value),
      width: (value: string) => this.setWidth(value),
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

  private setRotation(rotation: string): void {
    const rotations = this.stringToNumber3(rotation);

    this.object3D.rotation = new Vector3(rotations[0], rotations[1], rotations[2]);
  }

  private setWidth(width: string): void {
    this.width = parseFloat(width);

    this.reRenderPlane();
  }

  private setHeight(height: string): void {
    this.height = parseFloat(height);

    this.reRenderPlane();
  }

  private reRenderPlane() {
    const scene = this.object3D.getScene();
    const { position, material } = this.object3D;

    this.object3D.dispose();

    this.object3D = CreatePlane('plane', { width: this.width, height: this.height }, scene);
    this.object3D.material = material;
    this.object3D.position = position;
  }

  private stringToNumber3(value: string): number[] {
    return value
      .split(' ')
      .map((currentValue) => parseFloat(currentValue));
  }
}
