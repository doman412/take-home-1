

var AddressListDirective =  BaseDirective.extend({

    initialize:function($scope, AddressModel){

        this.addressModel = AddressModel;
    },

    defineScope:function(){

        this.$scope.changeSortCriteria = this._b('onChangeSortCriteria');
        this.$scope.deleteAddress = this._b('onDeleteAddress');
    },

    onChangeSortCriteria: function(criteria) {
        // if the user clicks the same one twice, reverse the order
        if (criteria === this.$scope.sortCriteria) {
            this.$scope.sortReverse = !this.$scope.sortReverse;
        } else {
            // otherwise set the criteria and assert reverse order is false
            this.$scope.sortCriteria = criteria;
            this.$scope.sortReverse = false;
        }
    },

    onDeleteAddress:function(addr){
        console.log(addr);
        this.addressModel.deleteAddress(addr);
        // this.addresses = this.addressModel.addresses;
    },

});


angular.module('address-list',[])

.directive('addressList',['AddressModel', function(AddressModel){
    return {
        restrict:'E',
        scope:{
            isEditing:'=',
            addresses:'='
        },
        templateUrl:'partials/main/addressListDirectiveTemplate.html',
        link:function($scope){
            new AddressListDirective($scope,AddressModel);
        }
    };
}]);
