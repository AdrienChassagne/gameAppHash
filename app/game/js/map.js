angular.module("gameApp")
  .service("mapService", ["graphicsEngineService", "caracsMap", "spatialHash", function(graphicsEngineService, caracsMap, spatialHash) {
    "use strict";

    var map = caracsMap.map;


    return {
      build: function() {

        this.hit = [];
        this.frameCount = 0;
        this.camera = {
          x: 0,
          y: 0
        };
        this.tile_size = 32;
        this.viewport = {
          x: 800,
          y: 576
        };
        this.limit_viewport = true;


        this.set_viewport = function(x, y) {

          this.viewport.x = x;
          this.viewport.y = y;
        };
        this.current_map = map;
        var _this = this;
        this.current_map.width = 800;
        this.current_map.height = 576;
        this.current_map.viewport = {
          x: 800,
          y: 576
        };
        this.current_map.width_p = this.current_map.width * this.tile_size;
        this.current_map.height_p = this.current_map.height * this.tile_size;

        this.build = function(map) {

          map.keys.forEach(function(key) {

            map.data.forEach(function(row, y) {

              _this.current_map.height = Math.max(_this.current_map.height, y);

              row.forEach(function(tile, x) {

                _this.current_map.width = Math.max(_this.current_map.width, x);

                if (tile == key.id)
                  _this.current_map.data[y][x] = key;

              });
            });
          });


          return true;

        };
        this.get_solidBounds = function() {
          for (var y = 0; y < this.current_map.data.length; y++) {
            for (var x = 0; x < this.current_map.data[y].length; x++) {
              if (this.current_map.data[y][x].solid) {
                var locBox = {
                  x: x * this.tile_size,
                  y: y * this.tile_size,
                  type: "box",
                  collidableWith: "shot",
                  isColliding: "false",
                  width: this.tile_size,
                  height: this.tile_size
                };
                this.hit.push(locBox);
              }
            }
          }
        };
        this.build(map);
        this.get_solidBounds();
      },
      draw_tile: function(x, y, tile, context) {
        if (tile.id != 0) {
          if (tile.id != 13) {
            graphicsEngineService.drawTile(tile.x, tile.y, 16, 16, x, y);
            if (tile.id === 4 || tile.id === 1) {
              // graphicsEngineService.drawTile(96, 0, 16, 16, x, y - 32);
            }
          } else if (tile.id === 13) {
            if (this.frameCount < 10) {
              graphicsEngineService.drawWater(0, 0, 16, 16, x, y);
            } else if (this.frameCount >= 10 && this.frameCount < 20) {
              graphicsEngineService.drawWater(16, 0, 16, 16, x, y);
            } else if (this.frameCount >= 20 && this.frameCount < 30) {
              graphicsEngineService.drawWater(0, 16, 16, 16, x, y);
            } else if (this.frameCount >= 30 && this.frameCount < 40) {
              graphicsEngineService.drawWater(16, 16, 16, 16, x, y);
            } else if (this.frameCount >= 40 && this.frameCount < 50) {
              graphicsEngineService.drawWater(0, 32, 16, 16, x, y);
            } else if (this.frameCount >= 50 && this.frameCount < 60) {
              graphicsEngineService.drawWater(16, 32, 16, 16, x, y);
            }
          }
        }
      },
      draw_map: function(context, fore) {
        for (var y = 0; y < this.current_map.data.length; y++) {

          for (var x = 0; x < this.current_map.data[y].length; x++) {

            if ((!fore && !this.current_map.data[y][x].fore) || (fore && this.current_map.data[y][x].fore)) {
              if (this.camera.x < 0) {
                var t_x = (x * this.tile_size)
              } else {
                var t_x = (x * this.tile_size) - this.camera.x
              };
              var t_y = (y * this.tile_size) - this.camera.y;

              if (t_x < -this.tile_size ||
                t_y < -this.tile_size ||
                t_x > this.viewport.x ||
                t_y > this.viewport.y) continue;

              this.draw_tile(
                t_x,
                t_y,
                this.current_map.data[y][x],
                context
              );
            }
          }
        }

        if (!fore) this.draw_map(context, true);
      },
      draw: function(canvas) {
        this.frameCount++;
        if (this.frameCount === 59) {
          this.frameCount = 0;
        };
        this.draw_map(canvas);
      },
      getMap: function() {
        return this;
      },
      getTile: function(x, y) {
        return this.current_map.data[y] && this.current_map.data[y][x];
      },
      getCam: function() {
        return this.camera;
      },
      getHit: function() {
        for (var i = 0; i < this.hit.length; i++) {
          spatialHash.insertObj(this.hit[i]);
        }
      }
    }
  }]);