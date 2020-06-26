var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String,
	token: String,
	salt: String,
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
