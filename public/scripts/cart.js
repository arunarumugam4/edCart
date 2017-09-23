
$(document).ready(function(){
	console.log('working');

         // LOAD ALL THE PRODUCTS
	 $.ajax({url: "/api/cartproducts", 
	 	success: function(response){
        console.log(response);

        $.allproducts = response.data;
        $.total=0;
        $.numberOfProducts =$.allproducts.length;
        console.log($.allproducts);
        let card;
        if($.allproducts.length !==0){
        for(let i in $.allproducts){
        	  $.total += $.allproducts[i].productPrice;

        	 card = "<div class='col-md-3'><div class='well productcard'><img class='productImg' src="+$.allproducts[i].productImage+">"+
         "<h6 style='text-align:left;font-size:0.9em;color:crimson'>"+$.allproducts[i].productName+"</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Price:<span style='color:crimson'>"+$.allproducts[i].productPrice+" Rupees</span></h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Added:<span style='color:crimson'>"+$.allproducts[i].productAdded+"</span></h6>"+
          "<h6 class='btn btn-primary' style='text-align:left;font-size:0.9em;cursor:pointer;'>Remove</h6>"+
           "</div></div>";
           $('#parentCard').prepend(card);

        }  

         $(".productcard").fadeIn('slow');
        

      } else{
        card = "<div class='col-md-12'><div class='well productcard'><h3> Nothing Availble in your cart</h3>";    
           $('#parentCard').prepend(card);
         };
        console.log($.total);
       let cartdetails = "<h6 style='text-align:left;color:crimson;text-shadow:1px 1px 1px black;'>Total Products: <span style='color:white'>"+$.numberOfProducts+"</span></h6>"+
       "<h6 style='text-align:left;color:crimson;text-shadow:1px 1px 1px black;'>Total Price: <span style='color:white'>"+String($.total)+" Rupees </span></h6>"
       $('#cartdetails').append(cartdetails);
       
        
    }});


    // LOGOUT FUNCTION

    $('#logout').click(function(){
          
          $.ajax({url:"/api/logout",
    success: function(response){
      console.log(response);
        location.pathname = '/';
    }
        
        });

    });





});