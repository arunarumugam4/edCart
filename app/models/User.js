// DATA MODEL FOR THE USER
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


let userSchema = Schema({

	local : {
		firstName : {type:String, default:''},
		lastName : {type:String, default:''},
		email : {type:String, default:''},
		password : {type:String, default:''},
		cart:[{type:Schema.ObjectId, ref:'productModel'}],
		cartCount : {type:Number, default:0},
		userProducts :[{type:Schema.ObjectId, ref:'productModel'}]

	},

	facebook : {
		id       : {type:String},
		token    : {type:String},
		email    : {type:String},
		name     : {type:String}

	}
})

// DEFINING SCHEMA METHODS
    // FOR GENERATING HASH
userSchema.methods.createHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
    // CHECK FOR A VALID PASSWORD
userSchema.methods.checkHash = function(password){
	return bcrypt.compareSync(password, this.local.password);
}


let userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;
