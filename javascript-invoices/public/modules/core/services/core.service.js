(function () {
    'use strict';
    angular
        .module('core')
        .service('CoreService', CoreService);

    CoreService.$inject = [];

    function CoreService() {
        var Core = {
            Error : function(response){
                console.error(response)
            }
        };

        return Core;
    }
}());