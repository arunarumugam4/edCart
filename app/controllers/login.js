let express = require('express');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let checkLoginFields = require('../../middlewares/checkLoginFields')

module.exports = function(app,passport,responseGenerator){

	// LOGIN PAGE
	router.get('/login', (req, res)=>{
		res.render('login', {'message': req.flash('loginMessage')});
	});

	// LOGIN-PROCESSOR
	router.post('/login',checkLoginFields,passport.authenticate('local-login',{
		successRedirect:'/profile',
		failureRedirect: '/login',
		failureFlash: true
	}))

	// LOGOUT-PROCESSOR
	router.get('/logout', function(req, res){
		req.logout();
		res.redirect('/login');
	})

	// API LOGOUT
	router.get('/api/logout', function(req, res){
		req.logout();
		let response = responseGenerator(false,"successfully logged Out",200,null);
		res.redirect('/login');
	})

	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}
