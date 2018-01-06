angular.module("gameApp")
  .factory("ennemyService", ["graphicsEngineService", "mapService", "caracsMap", "allCollide", "spatialHash", function(graphicsEngineService, mapService, caracsMap, allCollide, spatialHash) {

    function createEnnemy() {
      var ennemy = {
        height: 0,
        width: 0,
        x: 0,
        y: 0,
        type: 'enemy',
        vel: {
          x: 0,
          y: 0
        },
        state: 0,
        isFalling: true,
        isJumping: false,
        isColliding: false,
        collidableWith: 'shot',
        cycle: 0
      }
      return ennemy;
    };

    return {
      init: function() {
        this.pool = [];
        this.cicle = 0;
        var ennemies = caracsMap.ennemy;
        for (var i = 0; i < ennemies.length; i++) {
          this.pool.push(createEnnemy());
          this.pool[i].n = ennemies[i].n;
          this.pool[i].height = ennemies[i].height;
          this.pool[i].width = ennemies[i].width;
          this.pool[i].x = ennemies[i].x;
          this.pool[i].y = ennemies[i].y;
        }
      },
      update: function() {
        if (this.pool.length > 0) {
          var frame = mapService.frameCount;
          for (var i = 0; i < this.pool.length; i++) {
            if (this.pool[i].n === 'fish') {
              if (this.pool[i].state === 0) {
                this.pool[i].y += 0;
                if (frame === 58) {
                  this.pool[i].state = 1;
                }
              } else if (this.pool[i].state === 1) {
                this.pool[i].y -= 3;
                if (frame === 58) {
                  this.pool[i].state = 2;
                }
              } else if (this.pool[i].state === 2) {
                this.pool[i].y += 3;
                if (frame === 58) {
                  this.pool[i].state = 0;
                }
              }
            }
            if (this.pool[i].n === 'bird') {
              if (frame < 60 && this.cicle === 0) {
                this.pool[i].x += 3;
                this.pool[i].state = 0
                if (frame === 58) {
                  this.cicle += 1;
                }
              } else if (frame < 60 && this.cicle === 1) {
                this.pool[i].x += 3;
                this.pool[i].state = 0
                if (frame === 58) {
                  this.cicle += 1;
                }
              } else if (frame < 60 && this.cicle === 2) {
                this.pool[i].x -= 3;
                this.pool[i].state = 1;
                if (frame === 58) {
                  this.cicle += 1;
                }
              } else if (frame < 60 && this.cicle === 3) {
                this.pool[i].x -= 3;
                this.pool[i].state = 1;
                if (frame === 58) {
                  this.cicle += 1;
                }
              } else if (this.cicle === 4) {
                this.cicle = 0;
              }
            }
            if (this.pool[i].isColliding) {
              this.pool.splice([i], 1);

            }
          }

        }
        // }
      },
      draw: function() {
        var camera = mapService.getCam();
        if (this.pool.length > 0) {
          var frame = mapService.frameCount;
          for (var i = 0; i < this.pool.length; i++) {
            if (this.pool[i].n === 'bird') {

              if (frame < 10) {
                graphicsEngineService.drawBird(0, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y, this.pool[i].state);
              } else if (frame >= 10 && frame < 20) {
                graphicsEngineService.drawBird(25, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y, this.pool[i].state);
              } else if (frame >= 20 && frame < 30) {
                graphicsEngineService.drawBird(0, 16, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y, this.pool[i].state);
              } else if (frame >= 30 && frame < 40) {
                graphicsEngineService.drawBird(25, 16, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y, this.pool[i].state);
              } else if (frame >= 40 && frame < 50) {
                graphicsEngineService.drawBird(0, 32, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y, this.pool[i].state);
              } else if (frame >= 50 && frame < 60) {
                graphicsEngineService.drawBird(26, 32, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y, this.pool[i].state);
              }

            } else if (this.pool[i].n === 'coto') {
              graphicsEngineService.drawCoto(0, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y);

            } else if (this.pool[i].n === 'fish') {

              if (frame < 10) {
                graphicsEngineService.drawFish(0, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y);
              } else if (frame >= 10 && frame < 20) {
                graphicsEngineService.drawFish(20, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y);
              } else if (frame >= 20 && frame < 30) {
                graphicsEngineService.drawFish(40, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y);
              } else if (frame >= 30 && frame < 40) {
                graphicsEngineService.drawFish(60, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y);
              } else if (frame >= 40 && frame < 50) {
                graphicsEngineService.drawFish(80, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y);
              } else if (frame >= 50 && frame < 60) {
                graphicsEngineService.drawFish(100, 0, this.pool[i].width, this.pool[i].height, this.pool[i].x - camera.x, this.pool[i].y);
              }
            }

            spatialHash.insertObj(this.pool[i]);
            spatialHash.detectCollision(this.pool[i]);
          }
        }
      },
      getPcoord: function() {
        var coord = ennemy;
        return coord;
      },
      getEnnemy: function() {
        return ennemyPool;
      }

    }
  }]);