
var BaseController = BaseClass.extend({
  scope: null,

  init:function(scope){
    // set the scope
    this.$scope = scope;

    // call the first lifecycle method
    this.initialize.apply(this,arguments);

    // bind the destroy event with this class
    this.$scope.$on('$destroy',this._b('destroy'));

    // call the second lifecycle method
    this.defineListeners();

    // call the last lifecycle method
    this.defineScope();
  },

  initialize:function(){
    //OVERRIDE
  },

  defineListeners: function(){
    //OVERRIDE
  },

  defineScope: function(){
    //OVERRIDE
  },

  destroy:function(event){
    //OVERRIDE
  }
});

BaseController.$inject = ['$scope'];
