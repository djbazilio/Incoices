(function () {
    'use strict';
    angular
        .module('products')
        .controller('ProductsCtrl', ProductsCtrl);

    ProductsCtrl.$inject = ['$location','ProductsService', 'CoreService','NgTableParams'];

    function ProductsCtrl($location, ProductsService, CoreService, NgTableParams) {
        var vm = this;
        var originalData;
        function setTableParams(data){
            originalData = angular.copy(data);

            vm.tParams = new NgTableParams({}, {
                filterDelay: 0,
                dataset: angular.copy(data)
            });
        }

        function resetRow(row, rowForm){
            row.isEditing = false;
            rowForm.$setPristine();
            return _.findWhere(originalData, function(r){
                return r.id === row.id;
            });
        }

        vm.cancel = function (row, rowForm) {
            var originalRow = resetRow(row, rowForm);
            angular.extend(row, originalRow);
        };

        function reloadTable(){
            vm.tParams.reload().then(function(data) {
                if (data.length === 0 && vm.tParams.total() > 0) {
                    vm.tParams.page(vm.tParams.page() - 1);
                    vm.tParams.reload();
                }
            });
        }
        vm.delete = function (row) {
             ProductsService.deleteProducts(row.id)
                 .then(function (e) {
                    var tarr = angular.copy(vm.tParams.settings().dataset);
                     vm.tParams.settings().dataset = [];
                     for(var i in tarr){
                         if(tarr[i].id!=e.id){
                             vm.tParams.settings().dataset.push(tarr[i])
                         }
                     }
                     reloadTable()
                })
                .catch(CoreService.Error);
        };
        vm.save = function (row, rowForm) {
            ProductsService.updateProducts(row)
                .then(function (e) {
                    var originalRow = resetRow(row, rowForm);
                    angular.extend(originalRow, row);
                })
                .catch(CoreService.Error);
        };

        vm.newProduct = function(entity){
            ProductsService.saveProducts(entity)
                .then(function (e) {
                    $location.path('/products')
                    vm.tParams.settings().dataset.push(e);
                    reloadTable();
                })
                .catch(CoreService.Error);
        };

        ProductsService.getProducts()
            .then(function (e) {
                setTableParams(e);
            })
            .catch(CoreService.Error);
    }
}());