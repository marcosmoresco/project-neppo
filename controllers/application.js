'use strict';

var project = angular.module('project');

project.controller('applicationController', ['$scope', 
  function ($scope) {
    $scope.a = '1';
  }
]);