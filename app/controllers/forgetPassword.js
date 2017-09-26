let express = require('express');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let nodemailer = require('nodemailer'); // FOR SMTP MAIL SERVER
let isEmailValid = require('../../middlewares/isEmailValid');
let mongoose = require('mongoose');
let userSecret = mongoose.model('userSecret');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// CONFIGURE SMTP SERVER
const SMTP = require('../../config/SMTP-CONFIG');


// EXPORT
module.exports = function(app,passport,responseGenerator){



	// FORGET PASSWORD PAGE VIEW
	router.get('/forgetpassword', (req, res) => {
		res.render('forgetPassword',{'message': req.flash('forgetPasswordMessage')});

	}); //END



   // FORGET PASSWORD PROCESSOR
   router.post('/api/forgetpassword',isEmailValid, (req, res)=>{


   	userSecret.findOne({"email":req.body.email}, function(err,secrets){
   		if(err){
   			throw err;
   			console.log(err);
   		};

   		let mailOptions={
   			to : secrets.email,
   			subject :"PASSWORD RECOVERY",
   			text :"  user name : "+ secrets.userName + "   password :  "+ secrets.password 
   		};

   		SMTP.sendMail(mailOptions, function(error, response){
   			if(error){
   				console.log(error);
   				res.send("error");
   			}else{
   				console.log( response);
   				req.flash('loginMessage','Password has been sent to your email address');
   				res.redirect('/login')
   			}
   		});



   	})






     }); // END

	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}
