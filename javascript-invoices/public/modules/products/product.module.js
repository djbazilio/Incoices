(function () {
    'use strict';
    angular.module('products', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/products', {
                templateUrl: 'modules/products/views/products.list.html',
                controller: 'ProductsCtrl',
                controllerAs: 'vm'
            }).when('/products/new', {
                templateUrl: 'modules/products/views/product.new.html',
                controller: 'ProductsCtrl',
                controllerAs: 'vm'
            });
        }])
}());