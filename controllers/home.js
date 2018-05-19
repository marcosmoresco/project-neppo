'use strict';

var project = angular.module('project');

project.controller('homeController', ['$scope', 'MyService',
  function ($scope, MyService) {  
    $scope.a = 'Test';

    $scope.data = MyService.get();
  }
]);