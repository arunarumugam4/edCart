// SMTP SERVER CONFIGURATIONS
const nodemailer = require('nodemailer');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// CONFIGURE SMTP SERVER
const SMTP = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	auth: {
		user: "coolnuke477@gmail.com",
		pass: "badboy333"
	}
});

//EXPORT
module.exports = SMTP;