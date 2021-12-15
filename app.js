const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
dotenv.config({ path: './config/config.env' });
const cors = require('cors');
const Post = require('./models/Post');
const methodOverride = require('method-override');
const { response } = require('express');
const { HOMEPAGE, NODE_ENV, MONGO_URI, DEFAULT_IMAGE, DEFAULT_REDIRECT } =
	process.env;
const path = require('path');

connectDB();
const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(express.json());

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: MONGO_URI }),
	})
);

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport_config')(app);

app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			let method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

app.get('/api/loggedState', cors(), (req, res) => {
	const isLogged = req.isAuthenticated();
	console.log('Checking if user is Logged...');
	res.send(isLogged);
});

app.get('/api/userInfo', cors(), (req, res) => {
	const userInfo = req.user;
	console.log('Getting logged user info...');
	res.send(userInfo);
});

app.get('/api/posts', cors(), async (req, res) => {
	try {
		const posts = await Post.find().lean();
		res.send(posts);
	} catch (err) {
		res.send(err);
	}
});

app.post('/api/new', cors(), async (req, res) => {
	try {
		const { pet_name, service, price, image_url, hire_redirect, created_by } =
			req.body;
		console.log(hire_redirect);
		const write = {
			created_by: created_by,
			image_url: image_url || DEFAULT_IMAGE,
			pet_name: pet_name,
			service: service,
			price: price,
			hire_redirect: hire_redirect || DEFAULT_REDIRECT,
		};
		await Post.create(write);
		res.redirect(HOMEPAGE);
	} catch (error) {
		console.error(error);
	}
});

app.get('/api/logout', (req, res) => {
	req.logout();
	res.redirect(HOMEPAGE);
});

app.get('/api/login', (req, res) => {
	res.redirect('/auth/google');
});

app.use(methodOverride('_method'));

app.put('/api/edit/:id', async (req, res) => {
	const editingPostId = req.params.id;
	console.log(`Editing post with id of ${editingPostId}`);
	const editingPostChanges = req.body;
	const userRequestingChanges = req.user.googleId;
	const { pet_name, service, price, image_url, hire_redirect, created_by } =
		editingPostChanges;
	const update = { pet_name, service, price, image_url, hire_redirect };
	const filter = {
		created_by: req.user.googleId,
		_id: editingPostId,
	};

	if (userRequestingChanges === created_by) {
		let modifiedPost = await Post.findOneAndUpdate(filter, update, {
			new: true,
			runValidators: true,
		});
		console.log(modifiedPost);
	}
	res.redirect(HOMEPAGE);
});

app.delete('/api/edit/:id', async (req, res) => {
	console.log('working delete ');
	const editingPostId = req.params.id;
	const filter = { _id: editingPostId };

	const post = await Post.findOneAndDelete(filter);
	console.log(post);
	res.redirect(HOMEPAGE);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running in ${NODE_ENV} on port ${port}`));
