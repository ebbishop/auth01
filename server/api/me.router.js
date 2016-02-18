'use strict';

var router = require('express').Router(),
  _ = require('lodash');

var HttpError = require('../utils/HttpError');
var User = require('./users/user.model');

router.get('/', function (req, res, next) {
  User.findOne({_id: req.session.userId})
  .then(function(user){
    res.json(user);
  })
})

module.exports = router;
