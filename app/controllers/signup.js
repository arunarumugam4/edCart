let express = require('express');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER

module.exports = function(app,passport,responseGenerator){

	// SIGNUP PAGE
	router.get('/signup', (req, res)=>{

		res.render('signup', {'message':req.flash('signupMessage')});
	});

	// SIGNUP-PROCESSOR
	router.post('/signup', passport.authenticate('local-signup',{
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true // THIS ALLOW FLASH MESSAGES

	}));

	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}
