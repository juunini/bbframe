import BBScene from 'bbframe/core/BBScene';
import BBSphere from 'bbframe/core/BBSphere';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-sphere', BBSphere);

function checkCalledMethod(
  name: string,
  changeAttributeName: string,
  changeAttributeValue: string,
) {
  // @ts-ignore
  BBSphere.prototype[name] = jest.fn();

  // @ts-ignore
  expect(BBSphere.prototype[name]).not.toBeCalled();

  document.body.innerHTML = `
    <bb-scene>
      <bb-sphere></bb-sphere>
    </bb-scene>`;

  document.querySelector('bb-sphere')!
    .setAttribute(changeAttributeName, changeAttributeValue);

  // @ts-ignore
  expect(BBSphere.prototype[name]).toBeCalled();
}

describe('BBSphere', () => {
  it('renders', () => {
    document.body.innerHTML = `
      <bb-scene>
        <bb-sphere
          color="0 0 0"
          position="0 0 0"
          radius="1"
        >
        </bb-sphere>
      </bb-scene>`;

    document.querySelector('bb-sphere')!.setAttribute('color', '#FFFFFF');
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

  context('with attribute "radius"', () => {
    it('should be called "setRadius" method', () => {
      checkCalledMethod('setRadius', 'radius', '1');
    });
  });
});
