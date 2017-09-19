// MIDDLEWARE FOR CHECK USER IS LOGGED IN WHEN QUERY TO PRODUCTS
const responseGenerator = require('../customLib/responseGenerator');

module.exports = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
      } else {
      	
         let response = responseGenerator(true,"You must be login to your account to query this api",400,null);
      	 res.json(response);
      }
}