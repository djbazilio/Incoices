(function () {
    'use strict';
    angular.module('invoices', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/invoices', {
                templateUrl: 'modules/invoices/views/invoices.list.html',
                controller: 'InvoicesCtrl',
                controllerAs: 'vm'
            }).when('/invoices/edit/:id', {
                templateUrl: 'modules/invoices/views/invoices.edit.html',
                controller: 'InvoicesCtrl',
                controllerAs: 'vm'
            });
        }])
}());