const router = require('express').Router();
const sequelize = require('sequelize');
const models = require('../models');
const jwt = require("jsonwebtoken");
const passport=require('passport')
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
router.route('/register').post((req, res) => {
	const { isValid, errors } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(404).json(errors);
	}

	models.users
		.findAll({
			where: {
				email: req.body.email
			}
		})
		.then(function(user) {
			console.log('-------->', user.length);
			if (user.length === 0) {
				console.log('Data is not there ITS NULLLLLLLLLL');
				const users = models.users.build({
					email: req.body.email,
					login: req.body.login,
					password: req.body.password
				});

				users
					.save()
					.then(function(newUser) {
						console.log(newUser);
						res.json(newUser);
					})
					.catch((err) => console.log(err));
			} else {
				errors.email = 'Email was used already!';
				return res.status(404).json(errors);
			}
		});
});

router.route('/login').post((req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(404).json(errors);
	}

	models.users
		.findAll({
			where: {
				email: req.body.email
			}
		})
		.then(function(user) {
			if (req.body.password === user[0].dataValues.password) {
				console.log('PASSWORD CORRECT!!!');
				const token = jwt.sign({ id: user[0].dataValues.id }, process.env.SECRET, { expiresIn: '1d' }, function (err, token) {
					return res.json({
						success: true,
                        token:token
					})
				})
			}
			else {
				errors.password = "Password is incorrect"
				return  res.status(404).json(errors)
			}

		})
		.catch((err) => console.log(err));
});


router.route('/')
	.get(passport.authenticate('jwt', { session: false }), (req, res) => {
		res.json({
			id: req.models.users.id,
			email: req.users.email,
			login: req.users.login,
			followers: req.models.users.followers,
			following:req.models.users.following
	})
})
module.exports = router;
