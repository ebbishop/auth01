'use strict';

app.factory('AuthFactory',function($http, $state){
  var AuthFactory = {};
  AuthFactory.signup = function (current) {
    $http.post('/api/signup', current)
    .then(function() {
      $state.go('stories');
    });
  }

  AuthFactory.login = function(current){
    $http.post('/api/login', current)
    .then(function() {
      $state.go('stories');
    });
  }

  return AuthFactory;
})
