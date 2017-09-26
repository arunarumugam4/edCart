// DEPENDENCIES
let mongoose = require('mongoose');
let productModel = mongoose.model('productModel');
let userModel = mongoose.model('userModel');	


  // VERIFY THE USER PRODUCT (THIS PROMISE GOING TO BE USED IN ASYNC AWAIT )

		let verifyProduct = function(productId){

			return new Promise((resolve, reject)=>{
               
              userModel.find(req.user.email, function(err, user){
              	if(err){
              		throw err;
              		console.log(err);
              	}
               let checkIndex = user.local.userProducts.indexOf(req.params.productId);

               if(checkIndex===-1){
               	// RESOLVE IS FALSE (PRODUCT NOT AVAILABLE IN USER PRODUCTS)
               	resolve(false);
               } else {
               	// RESOLVE IS TRUE (PRODUCT IS AVAILABLE IN USER PRODUCTS)
               	resolve(true);
               }

              });
	    });

		};



let getProduct = function(productId){

      return new Promise((resolve, reject)=>{


         //CHECK THE CURRENT PRODUCT DETAILS IN DATABASE
         productModel.findById(req.params.productId, function(err,product){

          if(err){
            throw err;
            console.log(err);
          }
         
          // RESOLVE THE PRODUCT
          resolve(product);      

         });


      });
     
     };



// VERIFY THE OWNER (EXPRIEMENTAL USE OF ASYNC AND AWAIT FUNCTION);
      async function checkOwner(productId){

        let condition = await verifyProduct(productId);
        if(condition){
               
               let productDetails = await getProduct(productId); 
              return  res.render('updateProduct', {'message':productDetails});

        } else {
          let response = responseGenerator(true,"Yor are not authorized to delete this product",400,null);
          return res.json(response);
        }
                 
  };


// EXPORT 
module.exports = checkOwner;  


