'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

app.use(require('./logging.middleware'));

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

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google',{scope: 'email'}));
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

passport.use(
    new GoogleStrategy({
        clientID: '953322122905-qlmrbnbrqs8rsur0rmu6crhinb9mmua8.apps.googleusercontent.com',
        clientSecret: '0MqNRwCMeM0Xh8vVam0pNJRp',
        callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    // Google will send back the token and profile
    function (token, refreshToken, profile, done) {
      User.findOne({'google.id': profile.id}, function(err, user){
        if(err) return done(err);
        if(user){
          return done(null, user);
        }else{ //why not User.create()
          var newUser = new User();
          newUser.google.id = profile.id
          newUser.google.token = token;
          newUser.google.name = profile.displayName;
          newUser.google.email = profile.emails[0].value;
          newUser.email = newUser.google.email;
          newUser.name = newUser.google.name;
          newUser.photo = profile.photos[0].value;
          newUser.save(function(err){
            if(err) done(err);
            else done(null, newUser);
          })
        }
      })
      .then(function(user){

      })
      done();
    })
);

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
