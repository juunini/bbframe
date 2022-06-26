import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Light } from '@babylonjs/core/Lights/light';
import { ShadowGenerator } from '@babylonjs/core/Lights/Shadows/shadowGenerator';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

import '@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent';

import type BBScene from './BBScene';

const observedAttributes = [
  'type',
  'intensity',
  'position',
  'target-position',
] as const;
type ObservedAttributes = typeof observedAttributes[number];
type LightType = 'ambient' | 'directional';

export default class BBLight extends HTMLElement {
  static get observedAttributes(): typeof observedAttributes {
    return observedAttributes;
  }

  public object3D: Light;

  private shadowGenerator?: ShadowGenerator;

  private type: LightType = 'directional';

  private intensity: number = 1;

  private position: Vector3 = new Vector3(-1.5, 1.6, -1);

  private targetPosition: Vector3 = new Vector3(0, 0, 0);

  constructor() {
    super();

    const bbScene = this.closest('bb-scene') as BBScene;

    this.object3D = new DirectionalLight('directional light', Vector3.Zero(), bbScene.scene);
    (this.object3D as DirectionalLight).position = this.position;
    (this.object3D as DirectionalLight).setDirectionToTarget(this.targetPosition);
  }

  connectedCallback() {
    if (this.getAttribute('type') === null) {
      this.setAttribute('type', 'directional');
    }
  }

  attributeChangedCallback(key: ObservedAttributes, _oldValue: string, newValue: string): void {
    const callbacks = {
      type: (value: string) => this.setType(value),
      intensity: (value: string) => this.setIntensity(value),
      position: (value: string) => this.setPosition(value),
      'target-position': (value: string) => this.setTargetPosition(value),
    };

    callbacks[key](newValue);
  }

  private setType(type: string): void {
    this.type = type as LightType;

    const bbScene = this.closest('bb-scene') as BBScene;

    this.object3D.dispose();

    if (type === 'directional') {
      this.object3D = new DirectionalLight('directional light', Vector3.Zero(), bbScene.scene);
      (this.object3D as DirectionalLight).position = this.position;
      (this.object3D as DirectionalLight).setDirectionToTarget(this.targetPosition);
      this.object3D.intensity = this.intensity;

      this.setShadow(bbScene);
      return;
    }

    this.shadowGenerator?.dispose();
    this.object3D = new HemisphericLight('ambient light', new Vector3(-1, 1.6, -1), bbScene.scene);
  }

  private setShadow(bbScene: BBScene) {
    this.shadowGenerator?.dispose();
    this.shadowGenerator = new ShadowGenerator(1024, this.object3D as DirectionalLight);

    const bbEntities = bbScene.querySelectorAll('.bb-entity');
    bbEntities.forEach((bbEntity) => {
      this.shadowGenerator!.addShadowCaster((bbEntity as any).object3D as Mesh, true);
    });
  }

  private setIntensity(intensity: string): void {
    this.intensity = parseFloat(intensity);
    this.object3D.intensity = this.intensity;
  }

  private setPosition(position: string): void {
    if (this.type === 'directional') {
      const positions = this.stringToNumber3(position);
      this.position = new Vector3(positions[0], positions[1], positions[2]);
      (this.object3D as DirectionalLight).position = this.position;
    }
  }

  private setTargetPosition(targetPosition: string): void {
    const positions = this.stringToNumber3(targetPosition);
    this.targetPosition = new Vector3(positions[0], positions[1], positions[2]);
    (this.object3D as DirectionalLight).setDirectionToTarget(this.targetPosition);
  }

  private stringToNumber3(value: string): number[] {
    return value
      .split(' ')
      .map((currentValue) => parseFloat(currentValue));
  }
}
