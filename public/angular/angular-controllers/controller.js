app.controller('profileController', ['$http', function($http){
      
      	 let self = this;
         this.allproducts = null;

    // GET ALL THE PRODUCTS
	$http.get('/api/allproducts').then(function(response){
		console.log(response);

		this.allproducts = response.data.data;
		console.log(allproducts);
	
       });

}]);