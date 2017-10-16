(function () {
    'use strict';
    angular
        .module('invoices')
        .controller('InvoicesCtrl', InvoicesCtrl);

    InvoicesCtrl.$inject = ['InvoicesService', 'CoreService','NgTableParams','CustomersService','ProductsService', '$routeParams', '$location', '$timeout'];

    function InvoicesCtrl(InvoicesService, CoreService, NgTableParams, CustomersService,ProductsService, $routeParams, $location, $timeout) {
        var vm = this;
        var sleep;
        CustomersService.getCustomers()
            .then(function(e){
                vm.customersList =  e;
                vm.customersById = _.groupBy(e, 'id')
            })
            .catch(CoreService.Error);
        ProductsService.getProducts()
            .then(function(e){
                vm.productsList =  e;
                vm.productsById = _.groupBy(e, 'id')
            })
            .catch(CoreService.Error);
        if(!$routeParams.id) {
            InvoicesService.getInvoices()
                .then(function (e) {
                    vm.tParams = new NgTableParams({}, {dataset: e});
                })
                .catch(CoreService.Error);
        }else if($routeParams.id=='new'){
            vm.invoice = {
                discount: 0,
                total   : 0,
                item    : []
            };
        }else{
            InvoicesService.getInvoiceById($routeParams.id)
                .then(function (r) {
                    vm.invoice = r;
                    vm.invoice.item =[];
                InvoicesService.getInvoiceItem($routeParams.id)
                    .then(function (e) {
                        vm.invoice.item = [];
                        for(var i in e){
                            if(e[i].id) {
                                vm.invoice.item.push({
                                    id          : e[i].id,
                                    product_id  : e[i].product_id,
                                    quantity    : e[i].quantity,
                                    invoice_id  : e[i].invoice_id,
                                    name        : vm.productsById[e[i].product_id] ? vm.productsById[e[i].product_id][0].name : 'Product Delete',
                                    price       : vm.productsById[e[i].product_id] ? vm.productsById[e[i].product_id][0].price : 'Product Delete'
                                })
                            }
                        }
                        vm.invoice.customer = vm.customersById[vm.invoice.customer_id][0];
                    })
                    .catch(CoreService.Error);
            })
            .catch(CoreService.Error);
        }

        function reloadTable(){
            vm.tParams.reload().then(function(data) {
                if (data.length === 0 && vm.tParams.total() > 0) {
                    vm.tParams.page(vm.tParams.page() - 1);
                    vm.tParams.reload();
                }
            });
        }
        vm.delete = function (row) {
            InvoicesService.deleteInvoices(row.id)
                .then(function (e) {
                    var tarr = angular.copy(vm.tParams.settings().dataset);
                    vm.tParams.settings().dataset = [];
                    for(var i in tarr){
                        if(tarr[i].id!=e.id){
                            vm.tParams.settings().dataset.push(tarr[i])
                        }
                    }
                    reloadTable();
                })
                .catch(CoreService.Error);
        };

        vm.rePrice = function(){
            var total = 0;
            for(var i in vm.invoice.item){
                total = total + (vm.invoice.item[i].price * vm.invoice.item[i].quantity);
            }
            if(vm.invoice.discount!=0) {
                total = total - ((total / 100) * vm.invoice.discount)
            }
            vm.invoice.total = parseFloat(total.toFixed(2));
            vm.changeInvoice();
        };

        vm.addToItem = function(row){
            if(!row.product_id) {
                row.product_id = angular.copy(row.id);
                delete row.id;
            }
            var clone = false;
            row.quantity = row.quantity ? row.quantity : 1;
            for(var i in vm.invoice.item){
                if(row.product_id==vm.invoice.item[i].product_id){
                    clone = true;
                    vm.invoice.item[i].quantity = vm.invoice.item[i].quantity +1;
                }
            }
            if(!clone) {
                vm.invoice.item.push(row);
            }
            vm.invoice.product = '';
            vm.rePrice();
        };

        function deleteFromItem(p){
            var arr = [];
            for(var i in vm.invoice.item){
                if(vm.invoice.item[i].product_id!=p.product_id){
                    arr.push(vm.invoice.item[i])
                }
            }
            vm.invoice.item = arr;
            vm.rePrice();
        }
        vm.deleteProd = function(item){
            if(item.id){
                InvoicesService.deleteInvoicesItem(item)
                    .then(function (e) {
                        deleteFromItem(e)
                    })
                    .catch(CoreService.Error);
            }else{
                deleteFromItem(item)
            }
        };

        vm.changeInvoice = function(){
            if (typeof sleep === 'object') {
                $timeout.cancel(sleep);
            }
            sleep = $timeout(function () {
                vm.saveInvoice();
            }, 1000)
        };

        function saveInvoiceItem(inv, arr){
            if(arr.length>0) {
                arr[0].invoice_id = inv.id;
                if (!arr[0].id) {
                    InvoicesService.saveInvoicesItem(arr[0])
                        .then(function (e) {
                            arr = arr.slice(1);
                            saveInvoiceItem(inv, arr);
                        })
                        .catch(CoreService.Error);
                }else{
                    InvoicesService.updateInvoicesItem(arr[0])
                        .then(function (e) {
                            arr = arr.slice(1);
                            saveInvoiceItem(inv, arr);
                        })
                        .catch(CoreService.Error);
                }
            }else{
                if($routeParams.id&&$routeParams.id=='new') {
                    $location.path('/invoices/edit/'+vm.invoice.invoice_id);
                }
            }
        }

        vm.newProduct = function(entity){
            ProductsService.saveProducts(entity)
                .then(function (e) {
                    vm.addToItem(e);
                    vm.newProduct = false;
                })
                .catch(CoreService.Error);
        };

        vm.saveInvoice = function(){
            vm.invoice.customer_id = vm.invoice.customer.id;
            if(!vm.invoice.id){
                InvoicesService.saveInvoice(vm.invoice)
                    .then(function(e){
                        vm.invoice.invoice_id = e.id;
                        saveInvoiceItem(e, vm.invoice.item);
                    })
                    .catch(CoreService.Error);
            }else{
                InvoicesService.updateInvoices(vm.invoice)
                    .then(function(e){
                        saveInvoiceItem(e, vm.invoice.item);
                    })
                    .catch(CoreService.Error);
            }
        }
    }
}());