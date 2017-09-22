
$(document).ready(function(){
	console.log('working');

         // LOAD ALL THE PRODUCTS
	 $.ajax({url: "/api/cartproducts", 
	 	success: function(response){
        console.log(response);

        $.allproducts = response.data;
        console.log($.allproducts);
        let card;
        for(let i in $.allproducts){
        	
        	 card = "<div class='col-md-3'><div class='well productcard'><img class='productImg' src="+$.allproducts[i].productImage+">"+
         "<h6 style='text-align:left;font-size:0.9em;color:crimson'>"+$.allproducts[i].productName+"</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Price:<span style='color:crimson'>"+$.allproducts[i].productPrice+"</span></h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Added:<span style='color:crimson'>"+$.allproducts[i].productAdded+"</span></h6>"+
          "<h6 class='btn btn-primary' style='text-align:left;font-size:0.9em;cursor:pointer;'>Remove</h6>"+
           "</div></div>";
           $('#parentCard').prepend(card);

        }

      

       
        
    }});


});