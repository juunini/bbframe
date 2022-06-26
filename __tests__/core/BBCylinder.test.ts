import BBScene from 'bbframe/core/BBScene';
import BBCylinder from 'bbframe/core/BBCylinder';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-cylinder', BBCylinder);

function checkCalledMethod(
  name: string,
  changeAttributeName: string,
  changeAttributeValue: string,
) {
  // @ts-ignore
  BBCylinder.prototype[name] = jest.fn();

  // @ts-ignore
  expect(BBCylinder.prototype[name]).not.toBeCalled();

  document.body.innerHTML = `
    <bb-scene>
      <bb-cylinder></bb-cylinder>
    </bb-scene>`;

  document.querySelector('bb-cylinder')!
    .setAttribute(changeAttributeName, changeAttributeValue);

  // @ts-ignore
  expect(BBCylinder.prototype[name]).toBeCalled();
}

describe('BBCylinder', () => {
  it('renders', () => {
    document.body.innerHTML = `
      <bb-scene>
        <bb-cylinder
          color="0 0 0"
          position="0 0 0"
          radius="1"
          height="1"
        >
        </bb-cylinder>
      </bb-scene>`;

    document.querySelector('bb-cylinder')!.setAttribute('color', '#FFFFFF');
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

  context('with attribute "height"', () => {
    it('should be called "setHeight" method', () => {
      checkCalledMethod('setHeight', 'height', '1');
    });
  });
});
