var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const { NODE_ENV } = process.env;
const envJson = require('../config/env_variables.json');
const node_env = NODE_ENV || 'development';
const env_variables = envJson[node_env];
const { GOOGLE_CALLBACK_URL, HOMEPAGE, LOGIN_REDIRECT_URL } = env_variables;
module.exports = (app) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID:
					'1023148491900-2msh80u955k6bq82nnafep35517amhv8.apps.googleusercontent.com',
				clientSecret: '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',
				callbackURL: GOOGLE_CALLBACK_URL,
			},
			async (accessToken, refreshToken, profile, done) => {
				const { id, displayName, name, photos } = profile;
				const { givenName, familyName } = name;
				const newUser = {
					googleId: id,
					fullName: displayName,
					firstName: givenName,
					lastName: familyName,
					imageUrl: photos[0].value,
				};

				try {
					let user = await User.findOne({ googleId: profile.id });

					if (user) {
						return done(null, user);
					} else {
						user = await User.create(newUser);
						return done(null, user);
					}
				} catch (error) {
					console.log(error);
				}
			}
		)
	);

	// 	passport.use(new GoogleStrategy({
	//     consumerKey: GOOGLE_CONSUMER_KEY,
	//     consumerSecret: GOOGLE_CONSUMER_SECRET,
	//     callbackURL: "http://www.example.com/auth/google/callback"
	//   },
	//   function(token, tokenSecret, profile, done) {
	//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
	//         return done(err, user);
	//       });
	//   }
	// ));

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['https://www.googleapis.com/auth/plus.login'],
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', { failureRedirect: LOGIN_REDIRECT_URL }),
		function (req, res) {
			res.redirect(HOMEPAGE);
		}
	);

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect(HOMEPAGE);
	});
};
