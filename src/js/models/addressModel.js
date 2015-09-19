

var AddressModel = BaseClass.extend({

    addresses:[],

    fetchAddresses:function(){
        var p = this.$q.defer();

        // check local storage
        addresses = window.localStorage.getItem('duxterAddressBook');

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
            this.addresses.splice(0,this.addresses.length);
            console.log(this.addresses);
            this.addresses.push.apply(this.addresses, data);
            console.log(this.addresses);
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
