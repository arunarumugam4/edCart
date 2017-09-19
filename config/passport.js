// IMPORT PASSPORT DEPENDENCIES
const localStrategy = require('passport-local');
const facebookLogin = require('passport-facebook');
const mongoose = require('mongoose');

// IMPORT USER MODEL
const userModel = require('../app/models/User');

// EXPORT TO OUR APP 
module.exports = function(passport){
	// SERIALIZING THE USER
	passport.serializeUser(function(user,done){
		done(null, user.id);
	});

	// DESERIALIZE THE USER
	passport.deserializeUser(function(id, done){
		// COMPARE THE ID WITH THE DATABASE
		userModel.findById(id, function(err,user){
			done(null, user);
		});

	});

	// LOCAL-SIGNUP 
	passport.use('local-signup', new localStrategy({
		usernameField:'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done){
		process.nextTick(function(
			){
			
			userModel.findOne({'local.email':email}, function(err, user){
				if(err){
					return done(err);
				}

				if(req.body.password !== req.body.confirmPassword){
                   return done(null, false, req.flash('signupMessage', "confirm password dosen't match"));
				}

				if(user){
					return done(null, false, req.flash('signupMessage', 'This email is already taken, if you already signed up try login'));
				} else {
					 //CREATE NEW USER
					let newUser = new userModel();
					newUser.local.firstName = req.body.firstName;
					newUser.local.lastName = req.body.lastName;
					newUser.local.email = req.body.email;
					newUser.local.password = newUser.createHash(req.body.password) // HASHING PASSWORD USING BCRYPT 
					
					newUser.save((err)=>{
						if(err){
							throw err;
						}

						return done(null, newUser);
					})
				}


			})
		})
	})) // SIGNUP- END



	// LOCAL-LOGIN
	passport.use('local-login', new localStrategy({
	    usernameField:'email',
		passwordField: 'password',
		passReqToCallback: true

	}, function(req, email, password,done){

        
        
		process.nextTick(function(){
           
			userModel.findOne({'local.email':email}, function(err, user){
				
				if(err){
					throw err;
				}
				if(!user){
                    console.log('login email fail');
					return done(null, false, req.flash('loginMessage', 'No user Find with this email'))
				}

				if(!user.checkHash(password)){
					console.log('password fail');
					return done(null, false, req.flash('loginMessage', 'Entered password is wrong, try correct one'));
				} else {
					return done(null, user);
				}
			})
		})

	}))// LOGIN-END



}// END