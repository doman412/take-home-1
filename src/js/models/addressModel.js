

var AddressModel = BaseClass.extend({

    addresses:[],

    fetchAddresses:function(){
        // use promises, because promises are awesome
        var p = this.$q.defer();

        // check local storage
        addresses = window.localStorage.getItem('duxterAddressBook');

        // should probably add two services; localStorage and staticStorage
        // so its more extensible
        if(addresses){
            this.addresses = JSON.parse(addresses);
            p.resolve(this.addresses);
        } else {
            this.reloadAddressesFromFile(p);
        }

        return p.promise;
    },

    reloadAddressesFromFile:function(nP){
        var p = nP || this.$q.defer();

        $.getJSON('addresses.json',function(data){
            // clear the array
            this.addresses.splice(0,this.addresses.length);
            // push new objects onto array
            this.addresses.push.apply(this.addresses, data);
            // do it this way to keep the same object in memory so that updates
            // permeate to all things using this object
            // it was this or implememnt a notification service to notify observers of a change


            this.writeToLocalStorage(data);
            p.resolve(data);
        }.bind(this)).fail(function(){
            p.reject();
        }.bind(this));

        return p.promise;
    },

    deleteAddress:function(addr){
        var ix = this.addresses.indexOf(addr);

        this.addresses.splice(ix,1);

        this.writeToLocalStorage(this.addresses);
    },

    addAddress:function(addr){
        this.addresses.push(addr);

        this.writeToLocalStorage();
    },

    writeToLocalStorage:function(data){
        if(!data){
            data = this.addresses;
        }
        // this is to prevent writing the ng-repeat data to disk so we dont have dupes issues
        // not ideal for many objects but shouldnt be an issue with real date that has unique id's that ng-repeat can track by
        data = data.map(function(record){
            delete record.$$hashKey;
            return record;
        });
        window.localStorage.setItem('duxterAddressBook', JSON.stringify(data));
    }
});

(function(){
    var AddressModelProvider = BaseClass.extend({
        instance: new AddressModel(),

        $get: ['$q', function($q){
            this.instance.$q = $q;
            return this.instance;
        }]
    });

    angular.module('AddressModel',[])
        .provider('AddressModel', AddressModelProvider);
}());
