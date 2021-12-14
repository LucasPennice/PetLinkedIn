const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	created_by: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		required: true,
		default:
			'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
	},
	pet_name: {
		type: String,
		trim: true,
		required: true,
	},
	service: {
		type: String,
		trim: true,
		required: true,
	},
	price: {
		type: Number,
		max: 9999,
		min: 1,
		required: true,
	},
	hire_redirect: {
		type: String,
		default:
			'https://www.youtube.com/watch?v=f1-2xRx2gnE&t=1s&ab_channel=Mavial',
		required: true,
	},
});

module.exports = mongoose.model('Post', PostSchema);
