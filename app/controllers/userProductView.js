// API FOR GET ALL THE AVAILABLE PRODUCTS
// END POINT IS "/api/userproducts"


// DEPENDENCIES
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedIn = require('../../middlewares/isLogged');


// EXPORT
module.exports = function(app, passport, responseGenerator){

    
     router.get('/userproducts',isLoggedIn, (req, res)=>{
          
          res.render('userproduct',{'message': req.flash('productMessage')});

     });// END


	// MOUNT OUR ROUTER IN APP AS AN APP LEVEL MIDDLEWARE
	app.use('/',router);
}