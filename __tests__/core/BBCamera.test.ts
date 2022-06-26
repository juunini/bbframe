import BBScene from 'bbframe/core/BBScene';
import BBCamera from 'bbframe/core/BBCamera';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-camera', BBCamera);

function checkCalledMethod(
  name: string,
  changeAttributeName: string,
  changeAttributeValue: string,
) {
  // @ts-ignore
  BBCamera.prototype[name] = jest.fn();

  // @ts-ignore
  expect(BBCamera.prototype[name]).not.toBeCalled();

  document.body.innerHTML = `
    <bb-scene>
      <bb-camera></bb-camera>
    </bb-scene>`;

  document.querySelector('bb-camera')!
    .setAttribute(changeAttributeName, changeAttributeValue);

  // @ts-ignore
  expect(BBCamera.prototype[name]).toBeCalled();
}

describe('BBCamera', () => {
  it('renders', () => {
    document.body.innerHTML = `
      <bb-scene>
        <bb-camera
          position="0 0 0"
          rotation="0 0 0"
        >
        </bb-camera>
      </bb-scene>`;
  });

  context('with attribute "position"', () => {
    it('should be called "setPosition" method', () => {
      checkCalledMethod('setPosition', 'position', '0 0 0');
    });
  });

  context('with attribute "rotation"', () => {
    it('should be called "setRotation" method', () => {
      checkCalledMethod('setRotation', 'rotation', '0 0 0');
    });
  });
});
