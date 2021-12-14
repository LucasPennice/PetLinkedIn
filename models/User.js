const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	googleId: {
		type: String,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', UserSchema);
