// MIDDLEWARE FOR CHECK USER IS LOGGED IN

module.exports = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/login');
	}
}