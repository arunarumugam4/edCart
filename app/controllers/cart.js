let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedIn = require('../../middlewares/isLogged');
let productModel = mongoose.model('productModel');
let userModel = mongoose.model('userModel');


module.exports = function(app,passport,responseGenerator){
	

	// CART PAGE
	router.get('/cart',isLoggedIn, (req, res)=>{
		
	    // DELETE THE PASSWORD BEFORE SENT IT TO THE CLIENT SIDE
	    delete req.user.local.password
	    res.render('cartandproduct');
	});


	
     // ALL PRODUCTS IN THE USER CART
     router.get('/api/cartproducts', isLoggedIn, (req, res)=>{

     	userModel.findById(req.user.id).populate('local.cart').exec(function(err, user){
     		if(err){
     			throw err;
     		}
     		let response = responseGenerator(false,"successfull",200,user.local.cart);
     		res.json(response);
          });//END
     	
     });


	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}
