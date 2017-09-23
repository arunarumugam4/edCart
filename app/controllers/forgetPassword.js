let express = require('express');
let router = express.Router(); // INITIALIZE EXPRESS ROUTER
let nodemailer = require('nodemailer'); // FOR SMTP MAIL SERVER
let isEmailValid = require('../../middlewares/isEmailValid');

// CONFIGURE SMTP SERVER
const SMTP = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "coolnuke477@gmail.com",
        pass: "badboy333"
    }
});

module.exports = function(app,passport,responseGenerator){

	// FORGET PASSWORD PAGE VIEW
	router.get('/forgetpassword', (req, res) => {
		res.render('forgetPassword',{'message': req.flash('forgetPasswordMessage')});

	}); //END


     
   // FORGET PASSWORD PROCESSOR
     router.post('/api/forgetpassword',isEmailValid, (req, res)=>{

     	let mailOptions={
        to : req.body.email,
        subject :"PASSWORD RECOVERY",
        text : "YOUR PASSWORD"
    };

     SMTP.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.send("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});


     }); // END
	
	// MOUNT OUR ROUTER IN APP AS APP LEVEL MIDDLEWARE
	app.use('/',router);
}
