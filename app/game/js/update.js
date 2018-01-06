angular.module("gameApp")
  .service("updateService", ["mapService", "playerService", "spatialHash", "ennemyService", "fireService", function(mapService, playerService, spatialHash, ennemyService, fireService) {
    "use strict";

    var player = playerService.getPlayer();

    return {
      update: function(canvas) {
        canvas.clearRect(0, 0, 800, 575);
        spatialHash.clearHash();
        spatialHash.insertObj(player);
        mapService.getHit();
        spatialHash.detectCollision(player);
        playerService.update();
        fireService.update();
        ennemyService.update();
      }
    }
  }]);