(function() {

  'use strict';

  angular
    .module('gameApp', [
      'ngRoute'
    ])

    .config(['$routeProvider',
      function($routeProvider) {

        $routeProvider
          .when('/', {
            templateUrl: 'game/game.html',
            controller: 'gameCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]);

}());