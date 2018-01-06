angular.module("gameApp")
  .service("renderService", ["graphicsEngineService", "mapService", "playerService", "allCollide", "ennemyService", "fireService", function(graphicsEngineService, mapService, playerService, allCollide, ennemyService, fireService) {
    "use strict";
    var gameMap = mapService.getMap();

    //TODO changer syntaxe
    return {
      draw: function(canvas) {
        playerService.draw();
        ennemyService.draw();
        mapService.draw(canvas);
        fireService.draw();

      }
    }
  }]);