// API FOR GET ALL THE AVAILABLE PRODUCTS
// END POINT IS "/api/allproducts"


// DEPENDENCIES
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedForQueryProducts = require('../../middlewares/isLoggedForQueryProducts');
let isProductAvailable = require('../../middlewares/isProductAvailable');
let productModel = mongoose.model('productModel');
let userModel = mongoose.model('userModel');


// EXPORT
module.exports = function(app, passport, responseGenerator){

	router.get('/allproducts',isLoggedForQueryProducts,function(req,res){
          
          // QUERY ALL PRODUCTs FROM THE DATABASE
          productModel.find({},function(err, products){
          	if(err){
          		throw err;
          	}

          	let response = responseGenerator(false,"successfull",200,products);
          	res.json(response);
          })

	})// END


	// MOUNT OUR ROUTER IN APP AS AN APP LEVEL MIDDLEWARE
	app.use('/api',router);
}