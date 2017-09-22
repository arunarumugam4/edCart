
$(document).ready(function(){
	console.log('working');

         // LOAD ALL THE PRODUCTS
	 $.ajax({url: "/api/allproducts", 
	 	success: function(response){
        console.log(response);

        $.allproducts = response.data;
        console.log($.allproducts);
        let card;
        for(let i in $.allproducts){
        	
        	 card = "<div class='col-md-4'><div class='well productcard'><img class='productImg' src="+$.allproducts[i].productImage+">"+
         "<h6 style='text-align:left;font-size:0.9em;color:crimson'>"+$.allproducts[i].productName+"</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Price:<span style='color:crimson'>"+$.allproducts[i].productPrice+"</span></h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Quantity:<span style='color:crimson'>"+$.allproducts[i].productQuantity+"</span></h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Category:<span style='color:crimson'>"+$.allproducts[i].productCategory+"</span></h6>"+
          "<h6 class='btn btn-primary addcart' style='text-align:left;font-size:0.9em;cursor:pointer;' productId= "+$.allproducts[i]._id+">Add to cart</h6>"+
           "</div></div>";
           $('#parentCard').prepend(card);

        }


           // FUNCTION FOR ADD PRODUCT TO THE CART
	 $('.addcart').click(function(){
        
	 	$.productId = $(this).attr('productid');
	 	console.log($.productId);

	 
    $.post("/api/addproducttocart",
    {
        id:$.productId,
        
    },
    function(data, status){
    	console.log(data);
        
    });

	 	/* $.ajax({url: "/api/allproducts",
	 	success: function(response){
        console.log(response);

        $.allproducts = response.data;
        console.log($.allproducts);
        let card;
        for(let i in $.allproducts){
        	
        	 card = "<div class='col-md-4'><div class='well productcard'><img class='productImg' src="+$.allproducts[i].productImage+">"+
         "<h6 style='text-align:left;font-size:0.9em;color:crimson'>"+$.allproducts[i].productName+"</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Price:<span style='color:crimson'>"+$.allproducts[i].productPrice+"</span></h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Quantity:<span style='color:crimson'>"+$.allproducts[i].productQuantity+"</span></h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Category:<span style='color:crimson'>"+$.allproducts[i].productCategory+"</span></h6>"+
          "<h6 class='btn btn-primary' id='addcart'style='text-align:left;font-size:0.9em;cursor:pointer;' productId= "+$.allproducts[i]._id+">Add to cart</h6>"+
           "</div></div>";
           $('#parentCard').prepend(card);

        }

      }});*/

	 });




      }});

    

});