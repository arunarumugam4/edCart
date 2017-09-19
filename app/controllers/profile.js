let express = require('express');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedIn = require('../../middlewares/isLogged');


module.exports = function(app,passport,responseGenerator){
      

	// LOGIN PAGE
	router.get('/profile',isLoggedIn, (req, res)=>{
	    
	    // DELETE THE PASSWORD BEFORE SENT IT TO THE CLIENT SIDE
	       delete req.user.local.password
           res.render('profile', {'user':req.user.local});
	});


    // ADD NEW PRODUCT PAGE
    router.get('/addproduct',isLoggedIn, (req, res)=>{

    	res.render('product',{'message': req.flash('productDetailsMissing')});
    })
	

	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}
