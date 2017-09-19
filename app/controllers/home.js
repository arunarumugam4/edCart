let express = require('express');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER

module.exports = function(app,passport,responseGenerator){
	router.get('/', (req, res)=>{

         res.render('home.ejs');
	});

	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}

