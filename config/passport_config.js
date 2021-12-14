var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');
const {
	GOOGLE_CALLBACK_URL,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	FAILURE_LINK,
	HOMEPAGE,
} = process.env;

module.exports = (app) => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
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
						done(null, user);
					} else {
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (error) {
					console.log(error);
				}
				// User.findOrCreate({ googleId: profile.id }, (err, user) => {
				// 	return done(err, user);
				// });
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
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
		passport.authenticate('google', {
			failureRedirect: HOMEPAGE,
		}),
		(req, res) => {
			res.redirect(HOMEPAGE);
		}
	);

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect(HOMEPAGE);
	});
};
