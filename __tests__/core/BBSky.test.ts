import BBScene from 'bbframe/core/BBScene';
import BBSky from 'bbframe/core/BBSky';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-sky', BBSky);

function checkCalledMethod(
  name: string,
  changeAttributeName: string,
  changeAttributeValue: string,
) {
  // @ts-ignore
  BBSky.prototype[name] = jest.fn();

  // @ts-ignore
  expect(BBSky.prototype[name]).not.toBeCalled();

  document.body.innerHTML = `
    <bb-scene>
      <bb-sky></bb-sky>
    </bb-scene>`;

  document.querySelector('bb-sky')!
    .setAttribute(changeAttributeName, changeAttributeValue);

  // @ts-ignore
  expect(BBSky.prototype[name]).toBeCalled();
}

describe('BBSky', () => {
  it('renders', () => {
    document.body.innerHTML = `
      <bb-scene>
        <bb-sky
          color="0 0 0"
        >
        </bb-sky>
      </bb-scene>`;

    document.querySelector('bb-sky')!.setAttribute('color', '#FFFFFF');
  });

  context('when change attribute "color"', () => {
    it('should be called "setColor" method', () => {
      checkCalledMethod('setColor', 'color', '0 0 0');
    });
  });
});
