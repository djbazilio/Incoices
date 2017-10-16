(function () {
    'use strict';
    angular.module('core', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo : '/invoices'})
        }])
}());