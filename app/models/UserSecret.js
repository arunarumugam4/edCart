// DATA MODEL FOR THE USER  SECRETS
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let secretSchema = Schema({
	
	email:{type:String},
	password:{type:String},
	userName:{type:String}

});


let userSecret = mongoose.model('userSecret', secretSchema);
module.exports = userSecret;
