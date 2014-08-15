define(function () {
  'use strict';
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function () {
      return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    }());
  }
  return window.requestAnimationFrame;
});
