var BaseClass = Class.extend({
    // binding util I wrote, creates a single instance of a binded function to
    // avoid memory leaks when adding binded functions to a notification service
    // inline, you cant remove them without a reference
    __binds:[],
    _b : function(name){
        if(this['_'+name+'_']){
            return this['_'+name+'_'];
        } else {
            return (this['_'+name+'_'] = ( (this[name]) && (this[name].bind(this)) ) );
        }
    },

    // this mimics jQuery's extend function to merge 'n' objects together, found online
    _extend : function(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    },

});
