// API FOR UPDATE THE PRODUCT DETAILS
// END POINT IS "/api/updateproduct"



// DEPENDENCIES
// DEPENDENCIES
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedIn = require('../../middlewares/isLogged');
let productModel = mongoose.model('productModel');
let userModel = mongoose.model('userModel');
let isProductAvailable = require('../../middlewares/isProductAvailable');
let checkProductFields = require('../../middlewares/checkProductFields');

// CONFIGURE MULTER FOR PARSE MULTIPART-FORMDATA
let path = require('path');
let multer  = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../../public/productImages')); // STORE THE IMAGE TO THE STATIC FILE FOLDER
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname); // THIS CREATES UNIQUE FILE NAME FOR EACH IMAGE FILES
  }
});

let upload = multer({ storage: storage });


// EXPORT
module.exports = function(app,passport, responseGenerator){

 router.post('/updateproduct',isLoggedIn,upload.single('productImg'),isProductAvailable,function(req, res){
         console.log("***********************")
         console.log(req.body);
         console.log(req.file);
           console.log("***********************")
   	    // CHECK THE PRODUCT IN THE DATABASE
   	    productModel.findById(req.body.id, function(err, product){
   	    	if(err){
   	    		throw err;
   	    	};
          
          if(!product){
            let response = responseGenerator(false,"There is no product is available with this id",200, null);
            return res.json(response);
          }
          if(!req.body.productName && !req.body.productPrice && !req.body.productCategory && !req.body.productQuantity ){
            
            let response = responseGenerator(false,"Some parameters are missing, provide all the body parameter eventhough that property is not edited",200, null);
            return res.json(response);
          }
          // UPDATE THE PRODUCT DETAILS
          product.productName = req.body.productName;
          product.productPrice = req.body.productPrice;
          product.productCategory = req.body.productCategory;
          product.productQuantity = req.body.productQuantity;

          // UPDATE IMAGE IF AVAILABLE
          if(req.file){
                         // CREATE PRODUCT IMAGE URL
             let imgUrl = '/productImages/';
             product.productImage = imgUrl + req.file.filename;
          }

         // UPDATE THE DATABASE
         product.save(function(err){
          if(err){
           throw err;
         }

         let response = responseGenerator(false,"Product details has been successfully updated",200, product);
         res.redirect('/userproducts');
       })
         
         

       });
        
   })// END





	// MOUNT OUR ROUTER IN APP AS AN APP LEVEL MIDDLEWARE
	app.use('/api',router);
}

