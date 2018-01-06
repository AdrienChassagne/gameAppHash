angular.module("gameApp")
  .service("graphicsEngineService", function() {
    "use strict";

    var tilesetImage = new Image();
    tilesetImage.src = 'assets/img/forest.png';
    var waterImage = new Image();
    waterImage.src = 'assets/img/water.png';
    var glandMan = new Image();
    glandMan.src = 'assets/img/aconman.png';
    var bird = new Image();
    bird.src = 'assets/img/bird.png';
    var bird2 = new Image();
    bird2.src = 'assets/img/bird2.png';
    var fish = new Image();
    fish.src = 'assets/img/fish.png';
    var coto = new Image();
    coto.src = 'assets/img/coto.png';
    return {
      initialise: function(canvas) {
        this.canvas = canvas;
      },
      drawThing: function(x, y, h, w, color) {
        this.color = color;
        this.canvas.fillStyle = this.color;
        this.canvas.fillRect(x, y, w, h);
      },
      drawTile: function(sx, sy, swidth, sheight, x, y) {
        this.canvas.drawImage(tilesetImage, sx, sy, swidth, sheight, x, y, 32, 32);
      },
      drawWater: function(sx, sy, swidth, sheight, x, y) {
        this.canvas.drawImage(waterImage, sx, sy, swidth, sheight, x, y, 32, 32);
      },
      drawPlayer: function(sx, sy, swidth, sheight, x, y) {
        this.canvas.drawImage(glandMan, sx, sy, 16, 16, x, y, 32, 32);
      },
      drawBird: function(sx, sy, swidth, sheight, x, y, state) {
        var birdo = bird;
        if (state === 0) {
          birdo = bird;
        } else {
          birdo = bird2;
        }
        this.canvas.drawImage(birdo, sx, sy, 25, 16, x, y, 50, 32);
      },
      drawFish: function(sx, sy, swidth, sheight, x, y) {
        this.canvas.drawImage(fish, sx, sy, 20, 32, x, y, 30, 42);
      },
      drawCoto: function(sx, sy, swidth, sheight, x, y) {
        this.canvas.drawImage(coto, sx, sy, 20, 26, x, y, 40, 52);
      }
    }
  });