(function () {
    'use strict';
    angular.module('customers', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/customers', {
                templateUrl: 'modules/customers/views/customers.list.html',
                controller: 'CustomersCtrl',
                controllerAs: 'vm'
            }).when('/customers/new', {
                templateUrl: 'modules/customers/views/customers.new.html',
                controller: 'CustomersCtrl',
                controllerAs: 'vm'
            });
        }])
}());