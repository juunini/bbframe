<h1 align="center">BB-Frame</h1>

<p align="center">
  <b>B web framework for building virtual reality experiences.</b>
</p>

<p align="center">
  <a href="https://codecov.io/gh/juunini/bbframe">
    <img src="https://codecov.io/gh/juunini/bbframe/branch/main/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/bbframe">
    <img src="https://img.shields.io/npm/dt/bbframe.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/bbframe">
    <img src="https://img.shields.io/npm/v/bbframe.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/bbframe">
    <img src="https://img.shields.io/npm/l/bbframe.svg?style=flat-square" alt="License"></a>
  </a>
</p>

> ## Caution
> 
> This Framework is Working in progress.  
> Not completed.  

## Features

Inspired by [A-Frame](https://github.com/aframevr/aframe)

## License

This program is free software and is distributed under an [MIT License](LICENSE).

## Usage

### Example

[![Link to CodeSandbox Example](https://img.shields.io/badge/Codesandbox-000000?style=for-the-badge&logo=CodeSandbox&logoColor=white)](https://codesandbox.io/embed/github/juunini/bbframe-example/tree/main/?fontsize=14&hidenavigation=1&theme=dark)

```html
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/bbframe@0.0.2/dist/bbframe.min.js" async></script>
  </head>
  <body>
    <bb-scene>
      <bb-box position="-1 0.5 5" rotation="0 45 0" color="#4CC3D9"></bb-box>
      <bb-sphere position="0 1.25 7" radius="2.5" color="#EF2D5E"></bb-sphere>
      <bb-cylinder position="1 0.75 5" radius="1" height="1.5" color="#FFC65D"></bb-cylinder>
      <bb-ground position="0 0 6" width="4" height="4" color="#7BC8A4"></bb-ground>
      <bb-sky color="#ECECEC"></bb-sky>
      <bb-light type="ambient"></bb-light>
      <bb-light type="directional" intensity="0.4" position="-1.5 1.6 -1"></bb-light>
    </bb-scene>
  </body>
</html>
```
