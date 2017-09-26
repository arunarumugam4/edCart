// API FOR GET ALL THE AVAILABLE PRODUCTS
// END POINT IS "/api/userproducts"


// DEPENDENCIES
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedForQueryProducts = require('../../middlewares/isLoggedForQueryProducts');
let userModel = mongoose.model('userModel');


// EXPORT
module.exports = function(app, passport, responseGenerator){

    

	router.get('/userproducts',isLoggedForQueryProducts,function(req,res){

          // QUERY USER PRODUCTS FROM THE USER MODEL
          userModel.find({'local.email':req.user.local.email}).populate('local.userProducts').exec(function(err, user){
             if(err){
               throw err;
               console.log(err)
          }

          let response = responseGenerator(false,'successful',200,user[0].local.userProducts);
          res.json(response);

          }); 

     }); // END

	// MOUNT OUR ROUTER IN APP AS AN APP LEVEL MIDDLEWARE
	app.use('/api',router);
}