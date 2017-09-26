// MODEL FOR THE PRODUCT

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SCHEMA FOR THE PRODUCT
let productSchema = new Schema({
	
	_productOwner : {type:Schema.ObjectId, ref:'userModel'},
	productName : {type:String, default:''},
	productPrice : {type:Number, default:0},
	productImage : {type:String, default:'/productImages/avatar-1505828111327-imgnotavailable.jpg'},
	productAdded : {type:Date, default:Date.now()},
	productCategory: {type:String, default:''},
	productQuantity: {type:Number, default:0}
})




let productModel = mongoose.model('productModel', productSchema);
module.exports = productModel;
