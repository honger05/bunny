
seajs.config({
  base: '../sea-modules',
  alias: {
      '$': 'jquery/jquery/2.1.0/jquery',
      'position': 'arale/position/1.0.1/position',
      'backbone': 'gallery/backbone/1.1.2/backbone',
      'underscore': 'gallery/underscore/1.6.0/underscore',
      'base': 'arale/base/1.1.1/base',
      'class': 'arale/class/1.1.0/class',
      'events': 'arale/events/1.1.0/events',
      'position': 'arale/position/1.0.1/position',

      //-debug
      '$-debug': 'jquery/jquery/2.1.0/jquery-debug',
      'barcode-debug': 'jquery/barcode/2.1.0/barcode-debug',
      'position-debug': 'arale/position/1.0.1/position-debug',
      'backbone-debug': 'gallery/backbone/1.1.2/backbone-debug',
      'underscore-debug': 'gallery/underscore/1.6.0/underscore-debug',
      'dnd-debug': 'arale/dnd/1.0.0/dnd-debug',
      'base-debug': 'arale/base/1.1.1/base-debug',
      'class-debug': 'arale/class/1.1.0/class-debug',
      'events-debug': 'arale/events/1.1.0/events-debug',

      //origin
      'drag': '../static/drag/src/drag'
  }
});