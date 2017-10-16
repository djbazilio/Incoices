(function () {
    'use strict';
    angular
        .module('customers')
        .service('CustomersService', CustomersService);

    CustomersService.$inject = ['$resource'];

    function CustomersService($resource) {
        var Customers = $resource('/api/customers/:customer_id', {
            customer_id: '@customer_id'
        },{
            GetCustomers: {
                method  : 'GET',
                isArray : true
            },
            SaveCustomers: {
                method  : 'POST'
            },
            UpdateCustomers: {
                method  : 'PUT'
            },
            DeleteCustomers: {
                method  : 'DELETE'
            }
        });

        angular.extend(Customers, {
            getCustomers: function () {
                return this.GetCustomers().$promise;
            },
            saveCustomers: function (params) {
                return this.SaveCustomers({
                    name    : params.name,
                    address : params.address,
                    phone   : params.phone
                }).$promise;
            },
            updateCustomers: function (params) {
                return this.UpdateCustomers({
                    customer_id : params.id,
                    address     : params.address,
                    phone       : params.phone,
                    name        : params.name
                }).$promise;
            },
            deleteCustomers: function (id) {
                return this.DeleteCustomers({customer_id:id}).$promise;
            }
        });

        return Customers;
    }
}());