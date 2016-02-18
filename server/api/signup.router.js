'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../utils/HttpError');
var User = require('./users/user.model');


router.post('/', function(req, res, next) {
	User.create({email: req.body.email, password: req.body.password})
	.then(function(user) {
		if (!user) {
			res.sendStatus(404);
		} else {
			req.session.userId = user._id;
			res.json(user);
		}
	})
	.then(null, next);
});

module.exports = router;