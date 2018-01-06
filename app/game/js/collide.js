angular.module("gameApp")
  .factory("allCollide", ["playerDir", "mapService", function(playerDir, mapService) {
    "use strict";


    return {
      checkLvlColl: function(type) {

        this.object = type;
        var map = mapService.getMap();
        var tX = this.object.x + this.object.vel.x;
        var tY = this.object.y + this.object.vel.y;
        var offset = Math.round((map.tile_size / 2) - 1);

        var tile = mapService.getTile(
          Math.round(this.object.x / map.tile_size),
          Math.round(this.object.y / map.tile_size)
        );

        if (tile.gravity) {

          this.object.vel.x += tile.gravity.x;
          this.object.vel.y += tile.gravity.y;

        } else {

          this.object.vel.x += map.current_map.gravity.x;
          this.object.vel.y += map.current_map.gravity.y;
        }

        if (tile.friction) {

          this.object.vel.x *= tile.friction.x;
          this.object.vel.y *= tile.friction.y;
        }

        var t_y_up = Math.floor(tY / map.tile_size);
        var t_y_down = Math.ceil(tY / map.tile_size);
        var y_near1 = Math.round((this.object.y) / map.tile_size);
        var y_near2 = Math.round((this.object.y + offset) / map.tile_size);

        var t_x_left = Math.floor(tX / map.tile_size);
        var t_x_right = Math.ceil(tX / map.tile_size);
        var x_near1 = Math.round((this.object.x - offset) / map.tile_size);
        var x_near2 = Math.round((this.object.x + offset) / map.tile_size);

        var top1 = mapService.getTile(x_near1, t_y_up);
        var top2 = mapService.getTile(x_near2, t_y_up);
        var bottom1 = mapService.getTile(x_near1, t_y_down);
        var bottom2 = mapService.getTile(x_near2, t_y_down);
        var left1 = mapService.getTile(t_x_left, y_near1);
        var left2 = mapService.getTile(t_x_left, y_near2);
        var right1 = mapService.getTile(t_x_right, y_near1);
        var right2 = mapService.getTile(t_x_right, y_near2);


        if (tile.jump && this.object.jump_switch > 15) {

          this.object.can_jump = true;

          this.object.jump_switch = 0;

        } else this.object.jump_switch++;

        this.object.vel.x = Math.min(Math.max(this.object.vel.x, -map.current_map.vel_limit.x), map.current_map.vel_limit.x);
        this.object.vel.y = Math.min(Math.max(this.object.vel.y, -map.current_map.vel_limit.y), map.current_map.vel_limit.y);

        this.object.x += this.object.vel.x;
        this.object.y += this.object.vel.y;

        this.object.vel.x *= .9;

        if (left1.solid || left2.solid || right1.solid || right2.solid) {


          while (mapService.getTile(Math.floor(this.object.x / map.tile_size), y_near1).solid ||
            mapService.getTile(Math.floor(this.object.x / map.tile_size), y_near2).solid)
            this.object.x += 0.1;

          while (mapService.getTile(Math.ceil(this.object.x / map.tile_size), y_near1).solid ||
            mapService.getTile(Math.ceil(this.object.x / map.tile_size), y_near2).solid)
            this.object.x -= 0.1;

          var bounce = 0;

          if (left1.solid && left1.bounce > bounce) bounce = left1.bounce;
          if (left2.solid && left2.bounce > bounce) bounce = left2.bounce;
          if (right1.solid && right1.bounce > bounce) bounce = right1.bounce;
          if (right2.solid && right2.bounce > bounce) bounce = right2.bounce;

          this.object.vel.x *= -bounce || 0;

        }

        if (top1.solid || top2.solid || bottom1.solid || bottom2.solid) {


          while (mapService.getTile(x_near1, Math.floor(this.object.y / map.tile_size)).solid ||
            mapService.getTile(x_near2, Math.floor(this.object.y / map.tile_size)).solid)
            this.object.y += 0.1;

          while (mapService.getTile(x_near1, Math.ceil(this.object.y / map.tile_size)).solid ||
            mapService.getTile(x_near2, Math.ceil(this.object.y / map.tile_size)).solid)
            this.object.y -= 0.1;

          var bounce = 0;

          if (top1.solid && top1.bounce > bounce) bounce = top1.bounce;
          if (top2.solid && top2.bounce > bounce) bounce = top2.bounce;
          if (bottom1.solid && bottom1.bounce > bounce) bounce = bottom1.bounce;
          if (bottom2.solid && bottom2.bounce > bounce) bounce = bottom2.bounce;

          this.object.vel.y *= -bounce || 0;

          if ((bottom1.solid || bottom2.solid) && !tile.jump) {

            this.object.on_floor = true;
            this.object.can_jump = true;
          }

        }
      },
    }
  }]);