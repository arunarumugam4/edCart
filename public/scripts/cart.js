
$(document).ready(function(){
	     
       // LOAD USER DETAILS
  $.ajax({url:"/api/user",
    success: function(response){
      let uname = response.data.userName;
      let email = response.data.email;
      $('#uname').html(uname);
      $('#email').html(email);
    }
        
        });


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

        	 card = "<div class='col-md-4' id="+$.allproducts[i]._id+"><div class='well productcard'><img class='productImg' src="+$.allproducts[i].productImage+">"+
         "<h6 style='text-align:left;font-size:0.9em;color:crimson'>"+$.allproducts[i].productName+"</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Price:<span style='color:crimson' id=price"+$.allproducts[i]._id+">"+$.allproducts[i].productPrice+" </span>Rupees</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Added:<span style='color:crimson'>"+$.allproducts[i].productAdded+"</span></h6>"+
          "<h6  class='btn btn-primary removecart cool' style='text-align:left;font-size:0.9em;cursor:pointer;'productid="+$.allproducts[i]._id+">Remove</h6>"+
           "</div></div>";
           $('#parentCard').prepend(card);

        }  

         $(".productcard").fadeIn('slow');

                 // FUNCTION  TO REMOVE THE PRODUCT FROM THE CART
   $('.removecart').click(function(){
        
    $.productId = $(this).attr('productid');
    console.log($.productId);

   
    $.post("/api/removeproductfromcart",
    {
        id:$.productId,
        
    },
    function(response, status){
      console.log(response);

          // UPDATE TOTAL PRODUCTS AND PRICE
        $.numberOfProducts -=1;

        if($.numberOfProducts===0){
            card = "<div class='col-md-12'><div class='well nocard'><h3> Nothing Availble in your cart</h3>";    
           
           $('#parentCard').prepend(card);
        }
        
        $('#totalproduct').html(String($.numberOfProducts)); 
        let priceid ="#price"+$.productId;
        
        $.total -= parseInt($(priceid).html());
        console.log($.total);

        $("#totalprice").html(String($.total));
         
        let removedelem = "#"+$.productId;
        
        $(removedelem).remove(); 

           $('#notification').fadeIn();
          // SHOW NOTIFICATION AND REMOVE IT AFTER FEW SECONDS
          setInterval(()=>{
             $('#notification').fadeOut();
          }, 1000)
          
         
    });



   });
        

      } else{
        console.log('cool');
        card = "<div class='col-md-12'><div class='well nocard'><h3> Nothing Availble in your cart</h3>";    
           
           $('#parentCard').prepend(card);
         };


        
       let cartdetails = "<h6 style='text-align:left;color:crimson;text-shadow:0px 0px 1px black;'>Total Products: <span id='totalproduct' style='color:black;text-shadow:0px 0px 1px;'>"+$.numberOfProducts+"</span></h6>"+
       "<h6 style='text-align:left;color:crimson;text-shadow:0px 0px 1px black;'>Total Price: <span id='totalprice' style='color:black;text-shadow:0px 0px 1px;'>"+String($.total)+" Rupees </span></h6>"
       $('#cartdetails').append(cartdetails);


       
        
    }});



  




     


    // LOGOUT FUNCTION

    $('#logout').click(function(){
          
          $.ajax({url:"/api/logout",
    success: function(response){
      console.log(response);
        //location.reload();
    }
        
        });

    });





});