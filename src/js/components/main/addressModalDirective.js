var AddressModalDirective = BaseDirective.extend({

    initialize: function($scope, AddressModel) {
        this.addressModel = AddressModel;
    },

    defineScope: function() {

        this.$scope.changeSortCriteria = this._b('onChangeSortCriteria');
        this.$scope.deleteAddress = this._b('onDeleteAddress');
    },

    onChangeSortCriteria: function(criteria) {
        if (criteria === this.$scope.sortCriteria) {
            this.$scope.sortReverse = !this.$scope.sortReverse;
        } else {
            this.$scope.sortCriteria = criteria;
            this.$scope.sortReverse = false;
        }
    },

    onModalReady:function(){
        this.$scope.add = false;
        this.$scope.record = {};
    },

    onModalComplete:function(){
        console.log(' on modal complete');

        if(this.$scope.add){
            this.$scope.$applyAsync(function(scope){
                this.addressModel.addAddress(scope.record);
            }.bind(this))


        }
    }

});


angular.module('address-modal', [])

.directive('addressModal', ['AddressModel', function(AddressModel) {
    return {
        restrict: 'E',
        scope:{},
        templateUrl: 'partials/main/addressModalDirectiveTemplate.html',
        link: function($scope, el) {
            var dir = new AddressModalDirective($scope, AddressModel);
            var $el = $(el);
            $el.addClass('modal modal-fixed-footer');
            $el.attr('id','address-modal');
            $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
                ready: dir._b('onModalReady'), // Callback for Modal open
                complete: dir._b('onModalComplete')
            });

        }
    };
}]);
