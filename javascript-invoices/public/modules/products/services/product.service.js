(function () {
    'use strict';
    angular
        .module('products')
        .service('ProductsService', ProductsService);

    ProductsService.$inject = ['$resource'];

    function ProductsService($resource) {
        var Invoices = $resource('/api/products/:product_id', {
            product_id: '@product_id'
        }, {
            GetProducts: {
                method  : 'GET',
                isArray : true
            },
            SaveProducts: {
                method  : 'POST'
            },
            UpdateProducts: {
                method  : 'PUT'
            },
            DeleteProducts: {
                method  : 'DELETE'
            }
        });

        angular.extend(Invoices, {
            getProducts: function () {
                return this.GetProducts().$promise;
            },
            saveProducts: function (params) {
                return this.SaveProducts({
                    name    : params.name,
                    price   : params.price
                }).$promise;
            },
            updateProducts: function (params) {
                return this.UpdateProducts({
                    product_id  : params.id,
                    name        : params.name,
                    price       : params.price
                }).$promise;
            },
            deleteProducts: function (id) {
                return this.DeleteProducts({product_id:id}).$promise;
            }
        });

        return Invoices;
    }
}());