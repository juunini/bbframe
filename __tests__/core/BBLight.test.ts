import BBScene from 'bbframe/core/BBScene';
import BBLight from 'bbframe/core/BBLight';
import BBBox from 'bbframe/core/BBBox';

jest.mock('@babylonjs/core');

customElements.define('bb-scene', BBScene);
customElements.define('bb-box', BBBox);
customElements.define('bb-light', BBLight);

function checkCalledMethod(
  name: string,
  changeAttributeName: string,
  changeAttributeValue: string,
  defaultType: string = 'directional',
) {
  // @ts-ignore
  BBLight.prototype[name] = jest.fn();

  // @ts-ignore
  expect(BBLight.prototype[name]).not.toBeCalled();

  document.body.innerHTML = `
    <bb-scene>
      <bb-light type="${defaultType}"></bb-light>
    </bb-scene>`;

  document.querySelector('bb-light')!
    .setAttribute(changeAttributeName, changeAttributeValue);

  // @ts-ignore
  expect(BBLight.prototype[name]).toBeCalled();
}

describe('BBLight', () => {
  it('renders', () => {
    document.body.innerHTML = `
      <bb-scene>
        <bb-light
          intensity="1"
          position="0 0 0"
          target-position="0 0 0"
        >
        </bb-light>
        <bb-box></bb-box>
      </bb-scene>`;

      document.querySelector('bb-light')!.setAttribute('intensity', '1.2');
      document.querySelector('bb-light')!.setAttribute('type', 'ambient');
      document.querySelector('bb-light')!.setAttribute('type', 'directional');
      document.querySelector('bb-light')!.setAttribute('position', '1 1 1');
  });

  context('with attribute "type" changes "ambient"', () => {
    it('should be called "setType" method', () => {
      checkCalledMethod('setType', 'type', 'ambient', 'directional');
    });
  });

  context('with attribute "type" changes "directional"', () => {
    it('should be called "setType" method', () => {
      checkCalledMethod('setType', 'type', 'directional', 'ambient');
    });
  });

  context('with attribute "intensity"', () => {
    it('should be called "setIntensity" method', () => {
      checkCalledMethod('setIntensity', 'intensity', '2.4');
    });
  });

  context('with attribute "position"', () => {
    it('should be called "setPosition" method', () => {
      checkCalledMethod('setPosition', 'position', '1 1 1', 'directional');
    });
  });

  context('with attribute "target-position"', () => {
    it('should be called "setTargetPosition" method', () => {
      checkCalledMethod('setTargetPosition', 'target-position', '1 1 1', 'directional');
    });
  });
});
