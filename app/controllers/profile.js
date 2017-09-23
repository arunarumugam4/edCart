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
	 
	// GET USER INFO
	router.get('/api/user',isLoggedIn, (req, res)=>{
		let data = {}
		data.userName = req.user.local.firstName;
		data.email = req.user.local.email;
		let response = responseGenerator(false,"successful",200,data);
		res.json(response);
	});

	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}
