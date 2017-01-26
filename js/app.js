var app = angular.module('blackJack', ['ngRoute', 'ui.router']);

    app.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');
        
        $stateProvider
           
            .state('/', {
                url: '/',
                templateUrl: 'views/home.html'
            })
     
            .state('black-jack', {
                url: '/black-jack',
                templateUrl: 'views/black-jack.html',
                controller: 'BlackJackController'      
            });
            
    });