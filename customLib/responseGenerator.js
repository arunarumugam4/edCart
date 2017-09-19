// STANDARD RESPONSE FORMAT


module.exports = function (err, message, status, data) {

	let myResponse = {
		error: err,
		message:message,
		status:status,
		data: data
	}

	return myResponse;
}

