// MIDDLEWARE TO CHECK ALL PRODUCT FIELDS ARE FILLED UP

module.exports = function(req, res, next){
      console.log(req.body.productName);

       if(!(req.body.productName) ||!(req.body.productPrice) ||!(req.body.productQuantity) ||!(req.body.productCategory)){
               console.log('cool')
       	       req.flash('productDetailsMissing', 'some fields are missing, all the fields are necessary');
       	       res.redirect('/addproduct');
               
         } else{
    
        return next();

    }
}