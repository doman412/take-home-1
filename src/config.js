angular.module('duxter-take-home').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider

        .state('main', {
        url: "/",
        templateUrl: "partials/main/index.html",
        controller: MainController
    });
}]);
