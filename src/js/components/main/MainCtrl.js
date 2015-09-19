var MainController = BaseController.extend({

    initialize: function($scope, AddressModel) {
        this.addressModel = AddressModel;
    },

    defineListeners: function() {

    },

    defineScope: function() {
        this.$scope.isEditing = false;
        this.$scope.changeEditing = this._b('onChangeEditing');
        this.$scope.reloadAddressesFromFile = this._b('reloadAddressesFromFile');
        this.addressModel.fetchAddresses().then(this._b('onAddressesLoaded'), this._b('onAddressesLoadFailed'));
        this.$scope.exportToJSON = this._b('exportToJSON');
    },

    // event handlers
    onChangeEditing: function() {
        this.$scope.isEditing = !this.$scope.isEditing;
    },

    reloadAddressesFromFile: function() {
        this.addressModel.reloadAddressesFromFile().then(this._b('onAddressesLoaded'), this._b('onAddressesLoadFailed'));
    },

    // event handlers
    onAddressesLoaded: function(addresses) {
        // apply changes async to avoid digest crashes
        this.$scope.$applyAsync(function(scope) {
            scope.addresses = this.addressModel.addresses;
        }.bind(this));

    },

    onAddressesLoadFailed: function() {
        console.error('addresses failed to load');
    },

    exportToJSON: function() {
        // never had to use this, so I had to look it up
        var a = $('<a></a>').appendTo('body').css({display:'none'}),
            data = window.localStorage.getItem('duxterAddressBook'),
            blob = new Blob([data], {type:'octet/stream'}),
            url = window.URL.createObjectURL(blob);

        a.attr('href',url);
        a.attr('download', 'addresses.json');
        a[0].click();
        window.URL.revokeObjectURL(url);
        a.remove();
    },


});

MainController.$inject = ['$scope', 'AddressModel'];
