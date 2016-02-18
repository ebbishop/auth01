'use strict';

var router = require('express').Router(),
  _ = require('lodash');

var HttpError = require('../utils/HttpError');
var User = require('./users/user.model');

router.get('/', function (req, res, next) {
  req.session.userId = null;
  res.sendStatus(200);
});

module.exports = router;
