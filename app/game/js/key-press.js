angular.module("gameApp")
  .service("keyPress", ["playerDir", function(playerDir) {
    "use strict";
    var keys = {
      left: false,
      right: false,
      up: false
    };
    var pFire = {
      isFiring: false,
      x: 0,
      y: 0,
      reload: 0
    };

    function processMouseDown(e) {
      pFire.isFiring = true,
        pFire.x = e.x,
        pFire.y = e.y
      return pFire;
    }

    function processMouseUp(e) {
      pFire.isFiring = false,
        pFire.x = 0,
        pFire.y = 0
      return pFire;
    }

    function processKeyCode(keyCode) {
      switch (keyCode) {
        case 81:
          keys.left = true;
          break;
        case 90:
          keys.up = true;
          break;
        case 68:
          keys.right = true;
          break;
      }
      return keys;
    }

    function processKeyCodeDown(keyCode) {
      switch (keyCode) {
        case 81:
          keys.left = false;
          break;
        case 90:
          keys.up = false;
          break;
        case 68:
          keys.right = false;
          break;
      }
      return keys;
    }

    return {
      mouseDown: function(e) {
        return processMouseDown(e);
      },
      mouseUp: function(e) {
        return processMouseUp(e);
      },

      keyPress: function(keyCode) {
        return processKeyCode(keyCode);
      },
      keyRelease: function(keyCode) {
        return processKeyCodeDown(keyCode);
      },
      getDir: function() {
        return keys;
      },
      getDown: function() {
        return pFire;
      }
    }
  }]);
