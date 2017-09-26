// MIDDLEWARE FOR VERIFY THE EMAIL ADDRESS
const mongoose = require('mongoose');
const productModel = mongoose.model('productModel');
const userModel = mongoose.model('userModel');
const responseGenerator = require('../customLib/responseGenerator');

module.exports = function(req, res, next){


	// CHECK THE DATABASE TO VERIFY THE REQUESTED EMAIL
	userModel.find({'local.email': req.body.email}, function(err, user){

		if (err){
			throw err;
			console.log(err);
		}
		
		if(user.length >0){
			
			next();

		} else{
			
			req.flash('forgetPasswordMessage', 'This is not a valid one, give correct one');
			res.redirect('/forgetpassword');
		}
		
    }); // END
	
}