// API FOR UPDATE THE PRODUCT DETAILS
// END POINT IS "/api/updateproduct"



// DEPENDENCIES
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedIn = require('../../middlewares/isLogged');
let productModel = mongoose.model('productModel');
let userModel = mongoose.model('userModel');
let isProductAvailable = require('../../middlewares/isProductAvailable');


// EXPORT
module.exports = function(app,passport, responseGenerator){

   router.post('/updateproduct',isProductAvailable,function(req, res){

   	    // CHECK THE PRODUCT IN THE DATABASE
   	    productModel.findById(req.body.id, function(err, product){
   	    	if(err){
   	    		throw err;
   	    	};
          
          if(!req.body.productName && !req.body.productPrice && !req.body.productCategory && !req.body.productQuantity ){
                
                let response = responseGenerator(false,"Some parameters are missing, provide all the body parameter eventhoug that prperty is not edited",200, null);
                res.send(response);
          }
          // UPDATE THE PRODUCT DETAILS
   	    product.productName = req.body.productName;
          product.productPrice = req.body.productPrice;
          product.productCategory = req.body.productCategory;
          product.productQuantity = req.body.productQuantity;

         // UPDATE THE DATABASE
         product.save(function(err){
            if(err){
               throw err;
            }

            let response = responseGenerator(false,"Product details has been successfully updated",200, product);
            res.send(response);
         })
         
   	    	

   	    });
          
   })// END





	// MOUNT OUR ROUTER IN APP AS AN APP LEVEL MIDDLEWARE
	app.use('/api',router);
}

