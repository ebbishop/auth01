'use strict';

app.factory('AuthFactory',function($http, $state){
  var AuthFactory = {};
  var currentUser;
  AuthFactory.signup = function (current) {
    $http.post('/api/signup', current)
    .then(function(user) {
      AuthFactory.setCurrentUser(user.data);
      $state.go('stories');
    });
  };

  AuthFactory.login = function(current){
    $http.post('/api/login', current)
    .then(function(user) {
      AuthFactory.setCurrentUser(user.data);
      $state.go('stories');
    });
  };

  AuthFactory.getCurrentUser = function() {
    return currentUser;
  };

  AuthFactory.setCurrentUser = function(user) {
    currentUser = user;
  };

  return AuthFactory;
});
