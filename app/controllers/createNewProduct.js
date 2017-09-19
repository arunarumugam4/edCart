// API FOR CREATE NEW PRODUCTS AND DELETE EXISTING ONE
// END POINT IS "/api/addproduct"
// END POINT IS "/api/deleteproduct"


// DEPENDENCIES
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedIn = require('../../middlewares/isLogged');
let productModel = mongoose.model('productModel');
let userModel = mongoose.model('userModel');
let isProductAvailable = require('../../middlewares/isProductAvailable');
let checkProductFields = require('../../middlewares/checkProductFields');


// EXPORT
module.exports = function(app,passport,responseGenerator){
      
	// API FOR ADD PRODUCT
	router.post('/addproduct',isLoggedIn,checkProductFields,(req, res)=>{
         
         // CHECK THE USER IN DATABASE
		userModel.findOne({'local.email':req.user.local.email}, function(err, user){
            
            // CREATE A NEW PRODUCT USING PRODUCT MODEL
			let newProduct = new productModel();
			newProduct._productOwner = user._id; // REFERENCT THE ID OF THE USER WHO CREATED THIS PRODUCT
			newProduct.productName = req.body.productName;
			newProduct.productPrice = req.body.productPrice;
			newProduct.productCategory = req.body.productCategory;
			newProduct.productQuantity = req.body.productQuantity;

           // PUSH THIS PRODUCT ID TO THE USERS PRODUCTS ARRAY
		   user.local.userProducts.push(newProduct);

		   // UPDATE THE USER
		   user.save(function(err, user){
		   	  if(err){
		   	  	throw err
		   	  }
		   	  console.log('product has been updated in user document');
		   });
           
           // CREATE A NEW PRODUCT 
		   newProduct.save(function(err, product){
              
              if(err){
              	throw err
              } else {

              // SEND THE CREATED PRODUCT AS A RESPONSE
              let response = responseGenerator(false,"product has been successfully created",200,product);
              res.json(response);

              }

		   })
		})

	}); //END


	// DELETE THE PRODUCT
	router.post('/deleteproduct',isLoggedIn,isProductAvailable,function(req, res){
          
        //CHECK THE USER
		userModel.findById(req.user.id, function(err, user){
             
             // FIND THE PRODUCT IN THE USER CART AND REMOVE IT FROM USER UPLOADED PRODUCTS
             let indexOfTheProduct = user.local.userProducts.indexOf(req.body.id);
             user.local.userProducts.splice(indexOfTheProduct, 1);
             
             user.save(function(err){
             	if(err){
             		throw err;
             	}
                
                // CHECK THE PRODUCT IN THE PRODUCT DOCUMENT AND REMOVE IT
             	productModel.findById(req.body.id, function(err, product){
             		product.remove(function(err){
             			if(err){
             				throw err;
             			}

             			let response = responseGenerator(false,'product successfully removed',200,null);
             			res.json(response);
             		})
             	})
             })



		})
	})// END

	

	// MOUNT OUR ROUTER IN APP AS AN APP LEVEL MIDDLEWARE
	app.use('/api',router);
}
