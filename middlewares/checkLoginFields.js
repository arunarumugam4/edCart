// MIDDLEWARE FOR LOGIN FIELDS OR EMPTY OR NOT

module.exports = function(req, res, next){
	
	if(!req.body.email){

		req.flash('loginMessage', 'pleace fill the email field');
		res.redirect('/login')
		
	}

	if(!req.body.password){
		
		req.flash('loginMessage', 'pleace fill the password field');
		res.redirect('/login')
		
	}
	
	return next();
}