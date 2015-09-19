var BaseClass = Class.extend({
    // binding util
    __binds:[],
    _b : function(name){
        if(this['_'+name+'_']){
            return this['_'+name+'_'];
        } else {
            return (this['_'+name+'_'] = ( (this[name]) && (this[name].bind(this)) ) );
        }
    },

    _extend : function(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    },
    
});
