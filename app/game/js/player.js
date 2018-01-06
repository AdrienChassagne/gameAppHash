angular.module("gameApp")
  .service("playerService", ["graphicsEngineService", "mapService", "playerDir", "keyPress", "caracsMap", "allCollide", function(graphicsEngineService, mapService, playerDir, keyPress, caracsMap, allCollide) {
    "use strict";

    var player = {
      height: 32,
      width: 32,
      x: 50,
      y: 50,
      vel: {
        x: 0,
        y: 0
      },
      isFalling: true,
      isJumping: false,
      type: 'player',
      collidableWith: 'enemy',
      isColliding: false
    };

    function playerUpdate(player) {
      var jumpCounter = 0;
      var player = player;
      var can_jump = true;
      var playerMove = keyPress.getDir();
      var jump_switch = 0;
      var map = mapService.getMap();
      var camera = mapService.getCam();

      allCollide.checkLvlColl(player);

      if (playerMove.left || playerMove.right || playerMove.up) {
        if (playerMove.left) {

          if (player.vel.x > -map.current_map.vel_limit.x)
            player.vel.x -= map.current_map.movement_speed.left;
        }

        if (playerMove.up) {

          if (player.can_jump && player.vel.y > -map.current_map.vel_limit.y) {

            player.vel.y -= map.current_map.movement_speed.jump;
            player.can_jump = false;
          }
        }

        if (playerMove.right) {

          if (player.vel.x < map.current_map.vel_limit.x)
            player.vel.x += map.current_map.movement_speed.left;
        }
      }

      var c_x = Math.round(player.x - map.viewport.x / 2);
      var c_y = Math.round(player.y - map.viewport.y / 2);
      var x_dif = Math.abs(c_x - camera.x);
      var y_dif = Math.abs(c_y - camera.y);

      if (x_dif > 5) {

        var mag = Math.round(Math.max(1, x_dif * 0.1));

        if (c_x != camera.x) {

          camera.x += c_x > camera.x ? mag : -mag;

          if (map.limit_viewport) {

            camera.x =
              Math.min(
                map.current_map.width_p - map.viewport.x + map.tile_size,
                camera.x
              );
            camera.x =
              Math.max(
                0,
                camera.x
              );
          }
        }
      };
    };



    // TODO: Rajouter une variable dans le tabmleau map qui prmet de savoir si on peux traverser la plateform ou non

    return {
      update: function() {
        playerUpdate(player);
      },
      draw: function() {
        var camera = mapService.getCam();
        if (camera.x < 0) {
          graphicsEngineService.drawPlayer(0, 0, player.width, player.height, player.x, player.y);
          // graphicsEngineService.drawThing(player.x, player.y, player.height, player.width, "red");
        } else {
          graphicsEngineService.drawPlayer(0, 0, player.width, player.height, player.x - camera.x, player.y);
          // graphicsEngineService.drawThing(player.x - camera.x, player.y, player.height, player.width, "red");
        }
      },
      getPcoord: function() {
        var coord = {
          x: player.x,
          y: player.y
        };
        return coord;
      },
      getPlayer: function() {
        return player;
      }

    }
  }]);