(function () {
    'use strict';
    angular
        .module('invoices')
        .service('InvoicesService', InvoicesService);

    InvoicesService.$inject = ['$resource'];

    function InvoicesService($resource) {
        var Invoices = $resource('/api/invoices/:invoice_id/:listCtrl/:item_id', {
            invoice_id  : '@invoice_id',
            item_id     : '@item_id'
        }, {
            GetInvoices: {
                method  : 'GET',
                isArray : true
            },
            GetInvoiceById: {
                method  : 'GET',
                isArray : false
            },
            SaveInvoices: {
                method  : 'POST'
            },
            UpdateInvoices: {
                method  : 'PUT'
            },
            DeleteInvoices: {
                method  : 'DELETE'
            },
            GetInvoicesItem: {
                method  : 'GET',
                isArray : true,
                params: {
                    listCtrl: 'items'
                }
            },
            SaveInvoicesItem: {
                method  : 'POST',
                params: {
                    listCtrl: 'items'
                }
            },
            UpdateInvoicesItem: {
                method  : 'PUT',
                params: {
                    listCtrl: 'items'
                }
            },
            DeleteInvoicesItem: {
                method  : 'DELETE',
                params: {
                    listCtrl: 'items'
                }
            }
        });

        angular.extend(Invoices, {
            getInvoices: function () {
                return this.GetInvoices().$promise;
            },
            getInvoiceById: function (id) {
                return this.GetInvoiceById({invoice_id:id}).$promise;
            },
            saveInvoice: function (params) {
                return this.SaveInvoices({
                    customer_id : params.customer_id,
                    discount    : params.discount,
                    total       : params.total
                }).$promise;
            },
            updateInvoices: function (params) {
                return this.UpdateInvoices({
                    invoice_id  : params.id,
                    customer_id : params.customer_id,
                    discount    : params.discount,
                    total       : params.total
                }).$promise;
            },
            deleteInvoices: function (id) {
                return this.DeleteInvoices({invoice_id:id}).$promise;
            },
            getInvoiceItem: function (id) {
                return this.GetInvoicesItem({invoice_id:id}).$promise;
            },
            saveInvoicesItem: function (params) {
                return this.SaveInvoicesItem({
                    product_id : params.product_id,
                    invoice_id : params.invoice_id,
                    quantity   : params.quantity
                }).$promise;
            },
            updateInvoicesItem: function (params) {
                return this.UpdateInvoicesItem({
                    product_id : params.product_id,
                    item_id    : params.id,
                    invoice_id : params.invoice_id,
                    quantity   : params.quantity
                }).$promise;
            },
            deleteInvoicesItem: function (params) {
                return this.DeleteInvoicesItem({
                    item_id     : params.id,
                    invoice_id  : params.invoice_id
                }).$promise;
            }
        });

        return Invoices;
    }
}());