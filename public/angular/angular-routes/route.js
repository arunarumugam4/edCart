app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	
	// LET'S CONFIGURE STATES
	 $stateProvider
     .state('angular-allproducts',{
     	url: '/angular-allproducts',
     	templateUrl: '/angular-allproducts'

     });

     // FOR ANY OTHER STATE
     $urlRouterProvider
     .otherwise('/angular-allproducts');

}]);
