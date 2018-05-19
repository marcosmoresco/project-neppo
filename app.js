'use strict';

var project = angular.module('project', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'pascalprecht.translate'
]);

// configure our routes
project.config(['$routeProvider', '$translateProvider', '$controllerProvider', '$provide', '$compileProvider',
  function ($routeProvider, $translateProvider, $controllerProvider, $provide, $compileProvider) {

    project.controller = $controllerProvider.register;
    project.directive = $compileProvider.directive;
    project.factory = $provide.factory;
    project.service = $provide.service;
    project.constant = $provide.constant;
    project.value = $provide.value;

    $routeProvider
        .when('/', {
        templateUrl: '/.dist/home.html',
        controller: 'homeController',
        resolve: ['$q', function ($q) {
          var deferred = $q.defer();

          require.ensure([], function (require) {
            require('./controllers/home');
            deferred.resolve();
          });

          return deferred.promise;
        }]
      })
      .otherwise({
        redirectTo: '/'
      });
      var ptBrJsonDomain = require('./locales/pt.json'),
      enUsJsonDomain = require('./locales/en.json');

    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    $translateProvider.translations('pt-BR', ptBrJsonDomain);
    $translateProvider.translations('en-US', enUsJsonDomain);

    var language = window.navigator.language;
    if (angular.equals(language, 'pt-BR') || angular.equals(language, 'en-US')) {
      $translateProvider.preferredLanguage(language);
    } else {
      $translateProvider.preferredLanguage('en-US');
    }
  }
]);  