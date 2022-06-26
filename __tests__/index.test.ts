import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';

import BBScene from 'bbframe/core/BBScene';
import BBCamera from 'bbframe/core/BBCamera';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-camera', BBCamera);

describe('BBScene', () => {
  context('without bb-camera', () => {
    it('should generate freeCamera in bb-scene', () => {
      document.body.innerHTML = '<bb-scene></bb-scene>';

      const bbScene = document.querySelector('bb-scene') as BBScene;

      expect(bbScene.camera instanceof FreeCamera).toBeTruthy();
    });
  });

  context('with bb-camera', () => {
    it('should get camera from bb-camera', () => {
      document.body.innerHTML = `
      <bb-scene>
        <bb-camera></bb-camera>
      </bb-scene>`;

      const bbScene = document.querySelector('bb-scene') as BBScene;
      const bbFreeCamera = document.querySelector('bb-camera') as BBCamera;

      expect(bbScene.camera).toEqual(bbFreeCamera.camera);
    });
  });

  context('when bb-scene is removed', () => {
    it('should call disconnectedCallback', () => {
      document.body.innerHTML = '<bb-scene></bb-scene>';

      document.querySelector('bb-scene')!.remove();
    });
  });
});
