import BBScene from 'bbframe/core/BBScene';
import BBPlane from 'bbframe/core/BBPlane';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-plane', BBPlane);

function checkCalledMethod(
  name: string,
  changeAttributeName: string,
  changeAttributeValue: string,
) {
  // @ts-ignore
  BBPlane.prototype[name] = jest.fn();

  // @ts-ignore
  expect(BBPlane.prototype[name]).not.toBeCalled();

  document.body.innerHTML = `
    <bb-scene>
      <bb-plane></bb-plane>
    </bb-scene>`;

  document.querySelector('bb-plane')!
    .setAttribute(changeAttributeName, changeAttributeValue);

  // @ts-ignore
  expect(BBPlane.prototype[name]).toBeCalled();
}

describe('BBPlane', () => {
  it('renders', () => {
    document.body.innerHTML = `
      <bb-scene>
        <bb-plane
          color="0 0 0"
          position="0 0 0"
          rotation="0 0 0"
          width="1"
          height="1"
        >
        </bb-plane>
      </bb-scene>`;

    document.querySelector('bb-plane')!.setAttribute('color', '#FFFFFF');
  });

  context('when change attribute "color"', () => {
    it('should be called "setColor" method', () => {
      checkCalledMethod('setColor', 'color', '0 0 0');
    });
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

  context('with attribute "width"', () => {
    it('should be called "setWidth" method', () => {
      checkCalledMethod('setWidth', 'width', '2');
    });
  });

  context('with attribute "height"', () => {
    it('should be called "setHeight" method', () => {
      checkCalledMethod('setHeight', 'height', '2');
    });
  });
});
