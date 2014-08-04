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

require([ 'ractive', 'ractive-touch' ], function (Ractive) {
  'use strict';
  return Ractive;
});
