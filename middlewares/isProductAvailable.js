// MIDDLEWARE TO CHECK THE PRODUCT IS AVAILABLE ARE NOT
const mongoose = require('mongoose');
const productModel = mongoose.model('productModel');
const responseGenerator = require('../customLib/responseGenerator');

module.exports = function(req, res, next){

     productModel.findById(req.body.id, function(err, product){
     	   console.log(product);
             if(product){
             	return next();
             }
            let response = responseGenerator(true,'This product is not available',404,null);
            res.json(response);
     });
}



