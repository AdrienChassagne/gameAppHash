angular.module("gameApp")
  .service("backgroundService", function() {
    "use strict";

    return {
      initialise: function(canvas) {
        this.canvas = canvas;
        this.bg = new Image();
        this.bg.src = 'assets/img/bg.png';
      },
      drawThing: function(x, y, h, w) {
        this.canvas.drawImage(this.bg, 0, 0);
      },
    }
  });