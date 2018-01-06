angular.module("gameApp")
  .service("spatialHash", function() {
    "use strict";

    function makeKeysFn(shift) {
      return function(obj) {

        var sx = obj.x >> shift,
          sy = obj.y >> shift,
          ex = (obj.x + obj.width) >> shift,
          ey = (obj.y + obj.height) >> shift,
          x, y, keys = [];
        for (y = sy; y <= ey; y++) {
          for (x = sx; x <= ex; x++) {
            keys.push("" + x + ":" + y);
          }
        }

        return keys;
      }
    }


    return {
      createHash: function() {
        var DEFAULT_POWER_OF_TWO = 6;
        if (!power_of_two) {
          var power_of_two = DEFAULT_POWER_OF_TWO;
        }
        this.getKeys = makeKeysFn(power_of_two);
        this.hash = {};
        this.list = [];
        this._lastTotalCleared = 0;
      },
      insertObj: function(obj) {
        var keys = this.getKeys(obj),
          key, i;
        this.list.push(obj);
        for (i = 0; i < keys.length; i++) {
          key = keys[i];
          if (this.hash[key]) {
            this.hash[key].push(obj);
          } else {
            this.hash[key] = [obj];
          }
        }
      },
      retrieveObj: function(obj) {
        var ret = [],
          keys, i, key;
        if (!obj) {
          return this.list;
        }
        keys = this.getKeys(obj);
        for (i = 0; i < keys.length; i++) {
          key = keys[i];
          if (this.hash[key]) {
            ret = ret.concat(this.hash[key]);
          }
        }
        return ret;
      },
      clearHash: function() {
        var key;
        for (key in this.hash) {
          if (this.hash[key].length === 0) {
            delete this.hash[key];
          } else {
            this.hash[key].length = 0;
          }
        }
        this.list.length = 0;
      },
      getNbBuckets: function() {
        var key, count = 0;
        for (key in this.hash) {
          if (this.hash.hasOwnProperty(key)) {
            if (this.hash[key].length > 0) {
              count++;
            }
          }
        }
        return count;
      },
      detectCollision: function(that) {
        var ret = this.retrieveObj(that);
        for (var i = 0, l = ret.length; i < l; i++) {
          if (that.collidableWith === ret[i].type &&
            (that.x < ret[i].x + ret[i].width &&
              that.x + that.width > ret[i].x &&
              that.y < ret[i].y + ret[i].height &&
              that.y + that.height > ret[i].y)) {
            that.isColliding = true;
            ret[i].isColliding = true;
          }
        }
      }
    };
  });