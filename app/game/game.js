angular.module("gameApp", [])

  .controller('gameCtrl', ["keyPress", function(keyPress) {
    var vm = this;

    vm.keydown = function(e) {
      keyPress.keyPress(e.keyCode);

    };

    vm.keyup = function(e) {
      keyPress.keyRelease(e.keyCode);
    };

    vm.mouseMove = function(e) {

    };

    vm.mouseUp = function(e) {
      keyPress.mouseUp(e);
    };

    vm.mouseDown = function(e) {
      keyPress.mouseDown(e);
    };


  }])

  .directive("platformGame", ["graphicsEngineService", "renderService", "mapService", "spatialHash", "updateService", "fireService", "backgroundService", "ennemyService", function(graphicsEngineService, renderService, mapService, spatialHash, updateService, fireService, backgroundService, ennemyService) {
    return {
      restrict: 'A',
      template: '</canvas><canvas width="800" height="576" class="move"></canvas><canvas width="800" height="576" class="layer">',

      link: function(scope, element) {

        function setpixelated(context) {
          context['imageSmoothingEnabled'] = false;
          context['mozImageSmoothingEnabled'] = false;
          context['oImageSmoothingEnabled'] = false;
          context['webkitImageSmoothingEnabled'] = false;
          context['msImageSmoothingEnabled'] = false;
        }
        var canvas = element.find('canvas')[0].getContext("2d");
        setpixelated(canvas);
        var canvasBg = element.find('canvas')[1].getContext("2d");
        graphicsEngineService.initialise(canvas);
        backgroundService.initialise(canvas);

        mapService.build();

        fireService.init();
        ennemyService.init();

        spatialHash.createHash();



        var requestAnimFrame = (function() {
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
              window.setTimeout(callback, 1000 / 30);
            };
        })();


        function startGame() {
          animate();
        }

        function animate() {
          requestAnimFrame(animate);
          updateService.update(canvas);
          backgroundService.drawThing();
          renderService.draw(canvas);
        }
        startGame();
      }
    }


  }]);