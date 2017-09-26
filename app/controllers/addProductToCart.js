// API FOR ADD PRODUCTS TO THE USER CART AND REMOVE FROM THE CART
// END POINT IS "/api/addproducttocart"
// END POINT IS "/api/removeproductfromcart"


// DEPENDENCIES
let express = require('express');
let mongoose = require('mongoose');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let isLoggedIn = require('../../middlewares/isLogged');
let isProductAvailable = require('../../middlewares/isProductAvailable');
let productModel = mongoose.model('productModel');
let userModel = mongoose.model('userModel');


// EXPORT
module.exports = function(app,passport,responseGenerator){
 
 router.post('/addproducttocart',isLoggedIn,isProductAvailable,function(req, res){
        
         // CHECK THE PRODUCT IN THE DATABASE        
         productModel.findById(req.body.id).populate('productOwner','firstName').exec(function(err, product){
          
          if(err){
            throw err;   

          };     
      

                    // CHECk IF ENOUGH STOCKS AVAILABLE IN THAT PRODUCT
         if(product.productQuantity<=0){
                      console.log('hello');
                      let response = responseGenerator(true,'product is out of Stock',400,null);
                      return res.json(response);
                  }


                    //CHECK THE USER IN THE DATABASE
                    userModel.findOne({'local.email':req.user.local.email}, function(err, user){
                    	
                    	// PUSH THE PRODUCT TO THE USER CART
                      user.local.cart.push(product);

                        // INCREMENT THE CART COUNT
                        user.local.cartCount++

                        // SAVE THE USER 
                        user.save(function(err){
                          if(err){
                           throw err;
                         } 

                    		// DECREMENT THE PRODUCT QUANTITY COUNT
                    		productModel.findById(product._id, function(err, product){
                          
                         if(err){
                          throw err;
                        }
                        product.productQuantity-- ;
                        product.save(function(err){

                          
                          if(err){
                           throw err;
                         }

                         if(err){
                           throw err;
                         } else {

                    		    	// SEND THE UPDATED PRODUCT
                              

                              let response = responseGenerator(false,"porduct has been successfully added to the cart",200,product);
                              res.json(response);

                            }

                          })

                      });

                        
                    	})
                      });
                  })

   });// END  


   // REMOVE PRODUCT FROM THE USER CART
   router.post('/removeproductfromcart',isLoggedIn,function(req, res){

     userModel.findById(req.user.id, function(err, user){

   	   	    //CHECK IF THE PRODUCT IS AVAILABLE IN THE CART OR NOT
            let indexOfTheProduct = user.local.cart.indexOf(req.body.id);
            console.log(indexOfTheProduct);
            if(indexOfTheProduct === -1){
             
             let response = responseGenerator(true,"This product is not available in your cart",400,user);
             res.json(response);
           } else { 
               
               // UPDATE PRODUCT QUANTITY (INCREMENT);
               productModel.findById(req.body.id, (err, product)=>{
                  if(err){
                    throw err;
                    console.log(err);
                  }
                  product.productQuantity++;
                  product.save((err)=>{
                    if(err){
                      throw err;
                      console.log(err);
                    }
                    console.log('Quantity Updated');

                  })
               }); // END


            	// REMOVE THE PRODUCT FROM THE USER CART
            	user.local.cart.splice(indexOfTheProduct, 1);
            	// DECREMENT THE CART COUNT
            	user.local.cartCount--;

            	// UPDATE THE USER
            	user.save(function(err){
            		if(err){
            			throw err;
            		}
                delete user.local.password;
                let response = responseGenerator(false,"This product has been successfully removed from your cart",200,user);
                res.json(response);
              })

            }
            
          });
     

   })// END
   

   

	// MOUNT OUR ROUTER IN APP AS AN APP LEVEL MIDDLEWARE
	app.use('/api',router);
}
