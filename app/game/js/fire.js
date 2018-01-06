angular.module("gameApp")
  .factory("fireService", ["graphicsEngineService", "mapService", "playerDir", "keyPress", "caracsMap", "allCollide", "playerService", "spatialHash", function(graphicsEngineService, mapService, playerDir, keyPress, caracsMap, allCollide, playerService, spatialHash) {
    "use strict";

    function CreateBullet(id) {
      var shot = {
        id: id,
        vel: {
          x: 0,
          y: 0
        },
        type: 'shot',
        alive: false
      }
      return shot
    }


    var playerFire = keyPress.getDown();
    var size = 30;

    function spawn(pool, sX, sY, eX, eY) {
      if (!pool[size - 1].alive) {
        pool[size - 1].alive = true;
        var eX = eX;
        var camera = mapService.getCam();
        if (camera.x > 0) {
          eX += camera.x;
        };

        pool[size - 1].collidableWith = "box";
        pool[size - 1].isColliding = false;
        pool[size - 1].type = "shot";
        pool[size - 1].x = sX;
        pool[size - 1].y = sY;
        pool[size - 1].width = 6;
        pool[size - 1].height = 6;
        pool[size - 1].vel = {
          x: eX - sX,
          y: eY - sY
        }

        var dist = Math.sqrt(pool[size - 1].vel.x * pool[size - 1].vel.x + pool[size - 1].vel.y * pool[size - 1].vel.y);
        pool[size - 1].vel.x = pool[size - 1].vel.x / dist * 12;
        pool[size - 1].vel.y = pool[size - 1].vel.y / dist * 12;
      }
    }


    return {
      init: function() {
        this.pool = [];
        for (var i = 0; i < size; i++) {
          this.pool.push(CreateBullet(i));
        }
      },
      update: function() {

        if (playerFire.reload < 20 && playerFire.reload != 0) {
          playerFire.reload++;
        } else {
          playerFire.reload = 0;
        }
        if (playerFire.isFiring && playerFire.reload === 0) {
          playerFire.reload++;
          var playerLoc = playerService.getPcoord();
          spawn(this.pool, playerLoc.x, playerLoc.y, playerFire.x, playerFire.y);
          this.pool.unshift(this.pool.pop());
        }
        for (var i = 0; i < size; i++) {
          if (this.pool[i].alive) {
            this.pool[i].x += this.pool[i].vel.x;
            this.pool[i].y += this.pool[i].vel.y;
            spatialHash.insertObj(this.pool[i]);
            spatialHash.detectCollision(this.pool[i]);
            if (this.pool[i].isColliding) {
              this.pool[i].isColliding = false;
              this.pool[i].x = 0;
              this.pool[i].y = 0;
              this.pool[i].vel = {
                x: 0,
                y: 0
              }
              this.pool[i].alive = false;
              this.pool.push((this.pool.splice(i, 1))[0]);
            }
          }
        }
      },
      draw: function() {
        var camera = mapService.getCam();
        for (var i = 0; i < this.pool.length; i++) {
          if (this.pool[i].alive) {
            if (camera.x <= 0) {
              graphicsEngineService.drawThing(this.pool[i].x, this.pool[i].y, 6, 6, "blue");
            } else {
              graphicsEngineService.drawThing(this.pool[i].x - camera.x, this.pool[i].y, 6, 6, "blue");
            }
          }
        }
      }
    }
  }]);