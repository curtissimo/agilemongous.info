require.config({
  baseUrl: '/js',
  paths: {
    hammerjs: 'hammerjs/hammer',
    ractive: 'ractive/ractive',
    'ractive-touch': 'ractive-touch/index'
  },
  shim: {
    'ractive-touch': {
      deps: [ 'ractive', 'hammerjs' ]
    }
  }
});

require([ 'raf' ], function (requestAnimationFrame) {
  'use strict';
  var horace, style;
  horace = document.getElementById('horace');

  function step() {
    var left;
    style = window.getComputedStyle(horace);
    left = parseInt(style.left || 0, 10) + 2;
    if (left > window.innerWidth) {
      left = -parseInt(style.width, 10);
    }
    horace.style.left = left + 'px';
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});
