import { FlyCamera } from '@babylonjs/core/Cameras/flyCamera';

import BBScene from 'bbframe/core/BBScene';
import BBCamera from 'bbframe/core/BBCamera';
import { Engine } from '@babylonjs/core/Engines/engine';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-camera', BBCamera);

describe('BBScene', () => {
  context('without bb-camera', () => {
    it('should generate flyCamera in bb-scene', () => {
      document.body.innerHTML = '<bb-scene></bb-scene>';

      const bbScene = document.querySelector('bb-scene') as BBScene;

      expect(bbScene.camera instanceof FlyCamera).toBeTruthy();
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

      expect(bbScene.camera).toEqual(bbFreeCamera.object3D);
    });
  });

  context('when bb-scene is removed', () => {
    it('should call disconnectedCallback', () => {
      document.body.innerHTML = '<bb-scene></bb-scene>';

      document.querySelector('bb-scene')!.remove();
    });
  });

  context('when window is resize', () => {
    it('should call engine.resize', () => {
      Engine.prototype.resize = jest.fn();

      document.body.innerHTML = '<bb-scene></bb-scene>';

      expect(Engine.prototype.resize).not.toBeCalled();

      global.dispatchEvent(new Event('resize'));

      expect(Engine.prototype.resize).toBeCalled();
    });
  });
});
