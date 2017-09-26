
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
   $.ajax({url: "/api/userproducts", 
    success: function(response){
        console.log(response);

        $.allproducts = response.data;
        $.total=0;
        $.numberOfProducts =($.allproducts.length);
        console.log($.allproducts);
        let card;
        if($.allproducts.length !==0){
        for(let i in $.allproducts){
              
            $.total += $.allproducts[i].productPrice * $.allproducts[i].productQuantity;
          
           card = "<div class='col-md-4' id="+$.allproducts[i]._id+"><div class='well productcard'><img class='productImg ' src="+$.allproducts[i].productImage+">"+
         "<h6 style='text-align:left;font-size:0.9em;color:crimson'>"+$.allproducts[i].productName+"</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Price:<span style='color:crimson' id=price"+$.allproducts[i]._id+">"+$.allproducts[i].productPrice+" </span>Rupees</h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Added:<span style='color:crimson'>"+$.allproducts[i].productAdded+"</span></h6>"+
          "<h6 style='text-align:left;font-size:0.9em'>Quantity:<span style='color:crimson' id="+$.allproducts[i]._id+'uniq'+" >"+$.allproducts[i].productQuantity+"</span></h6>"+"<h6  class='btn btn-primary editproduct cool' style='text-align:left;margin-right:2%;font-size:0.9em;cursor:pointer;'productid="+$.allproducts[i]._id+" id="+$.allproducts[i]._id+'pop'+">Edit</h6>"+"<h6  class='btn btn-primary removecart cool' style='text-align:left;font-size:0.9em;cursor:pointer;'productid="+$.allproducts[i]._id+">Delete</h6>"+
           "</div></div>";
           $('#parentCard').prepend(card);
           let popid ="#"+ $.allproducts[i]._id +"pop"

          

            // POP CONFIGURATION FOR EDIT THE PRODUCT   
         $(popid).webuiPopover({
   type:'async',
   url:'/updateproduct/'+$.allproducts[i]._id,
      placement:'bottom',
   width:'auto',
   height:'auto',
   closeable:true,
   backdrop:true,
   style:'inverse',
   arrow:true,
   animation:'pop',
   dismissible:false


});
        }  
         

          

         $(".productcard").fadeIn('slow');

      

                 // FUNCTION  TO DELETE THE PRODUCT COMPLETLY
   $('.removecart').click(function(){
        
    $.productId = $(this).attr('productid');
    console.log($.productId);

   
    $.post("/api/deleteproduct",
    {
        id:$.productId,
        
    },
    function(response, status){
      console.log(response);

          // UPDATE TOTAL PRODUCTS AND PRICE
        $.numberOfProducts -=1;

        if($.numberOfProducts===0){
            card = "<div class='col-md-12'><div class='well nocard'><h3>You uploded nothing, add new products</h3>";    
           
           $('#parentCard').prepend(card);
        }
        
        $('#totalproduct').html(String($.numberOfProducts)); 
        let priceid ="#price"+$.productId;
        let quantityid = "#"+$.productId +'uniq';
        console.log($(priceid).html());
        console.log($(quantityid).html());
        let updateValue = parseInt($(priceid).html()) * parseInt($(quantityid).html())
        $.total -= updateValue;
        console.log($.total );

        $("#newasset").html(String($.total));
         
        let removedelem = "#"+$.productId;
        
        $(removedelem).remove(); 

           $('#notification').fadeIn();
          // SHOW NOTIFICATION AND REMOVE IT AFTER FEW SECONDS
          setInterval(()=>{
             $('#notification').fadeOut();
          }, 1000)
          
         //$(id).html(String(QuantityUpdate));
    });



   });
        

      } else{
        console.log('cool');
        card = "<div class='col-md-12'><div class='well nocard'><h3>You uploded nothing, add new products</h3>";    
           
           $('#parentCard').prepend(card);
         };


        console.log($.total); 
       let cartdetails = "<h6 style='text-align:left;color:crimson;text-shadow:0px 0px 1px black;'>Uploaded Products: <span id='totalproduct' style='color:black;text-shadow:0px 0px 1px;'>"+$.numberOfProducts+"</span></h6>"+
       "<h6 style='text-align:left;color:crimson;text-shadow:0px 0px 1px black;'>Asset Worth: <span id='newasset' style='color:black;text-shadow:0px 0px 1px;'>"+String($.total)+" </span>  Rupees</h6>"
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