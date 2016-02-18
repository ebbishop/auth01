'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');

// app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(session({
  secret: 'wearecool',
  cookie: {
    maxAge: 60*10000,
    expires: new Date(Date.now() + 60*10000)
  }
}));

app.use(function(req, res, next){
  if(!req.session.number) req.session.number = Math.floor(Math.random()*100);

  console.log('session', req.session);
  next();
})

app.use(require('./statics.middleware'));


app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;
