// IMPORT ALL DEPENDENCIES
'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const responseGenerator = require('./customLib/responseGenerator');



// INITIALIZE EXPRESS APP
const app = express();

// SET PORT
const port = process.env.PORT || 3000;

// SET APP LEVEL MIDDLEWARES
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(session({ secret:'hey cool stop this mess!!', 
	resave:false, 
	httpOnly:true,
	saveUninitialized:true,
	cookie : {secure:false}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// LET INITIALIZE PASSPORT CONFIGURATIONS
require('./config/passport')(passport);

// SET VIEW ENGINE
app.set('views', './app/views' )
app.set('view engine', 'ejs');

// SET STATIC FILE FOLDER
app.use(express.static(path.join(__dirname,'public')));

// LET'S KICK START DATABASE 
const dbconfig = require('./config/database');
const dburl = dbconfig.dburl;
const dbname = dbconfig.dbname;
const db = mongoose.connection;
mongoose.Promise = global.Promise; // USE JAVASCRIPT LOCAL PROMISE INSTEAD OF MONGOOSE PROMISE
mongoose.connect(dburl,{ useMongoClient: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() => {

	console.log('-----------------------------------------------------------------------');
	console.log(`| ***** Server successfully connected to our database ${dbname} ******** |`);
	console.log('-----------------------------------------------------------------------');
})


// SET OUR MODELS
fs.readdirSync('./app/models/').forEach((filename)=>{
	if(filename.indexOf('.js') !== -1){
		require(`./app/models/${filename}`);
		
	}

});




// SET OUR ROUTES
fs.readdirSync('./app/controllers/').forEach((filename) =>{
	if(filename.indexOf('.js') !== -1){
		let router = require(`./app/controllers/${filename}`);
		router(app,passport,responseGenerator);
	}

});



// SET 404 PAGE
app.get('*', function(req, res){
	res.redirect('/');
});

// SET 400 ERROR FOR INVALID API'S
app.post('*', function(req, res){
	let response = responseGenerator(true,"This is not an valid api, try valid one",400,null);
	res.json(response);

});

// LET'S KICK OUR SERVER
app.listen(port, ()=>{
	console.log('------------------------------------------------------------------');
	console.log(`| ***** Server is waiting to receive you on port ${port} ********   |`);
	console.log('------------------------------------------------------------------');
});

// END