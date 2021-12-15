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
				clientID:
					'1023148491900-2msh80u955k6bq82nnafep35517amhv8.apps.googleusercontent.com',
				clientSecret: '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',
				callbackURL: 'https://pet-work.herokuapp.com/auth/google/callback',
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
			failureRedirect: '/login',
		}),
		(req, res) => {
			res.redirect('/');
		}
	);

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect(HOMEPAGE);
	});
};
