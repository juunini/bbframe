import BBScene from 'bbframe/core/BBScene';
import BBBox from 'bbframe/core/BBBox';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-box', BBBox);

function checkCalledMethod(
  name: string,
  changeAttributeName: string,
  changeAttributeValue: string,
) {
  // @ts-ignore
  BBBox.prototype[name] = jest.fn();

  // @ts-ignore
  expect(BBBox.prototype[name]).not.toBeCalled();

  document.body.innerHTML = `
    <bb-scene>
      <bb-box></bb-box>
    </bb-scene>`;

  document.querySelector('bb-box')!
    .setAttribute(changeAttributeName, changeAttributeValue);

  // @ts-ignore
  expect(BBBox.prototype[name]).toBeCalled();
}

describe('BBBox', () => {
  it('renders', () => {
    document.body.innerHTML = `
      <bb-scene>
        <bb-box
          color="0 0 0"
          position="0 0 0"
          rotation="0 0 0"
        >
        </bb-box>
      </bb-scene>`;

    document.querySelector('bb-box')!.setAttribute('color', '#FFFFFF');
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
    it('should be called "setRotation" method', () => {
      checkCalledMethod('setRotation', 'rotation', '0 0 0');
    });
  });
});
