'use strict';

app.directive('signIn', function(AuthFactory) {
  return {
    restrict: 'E',
    templateUrl: '/browser/app/signin/signin.html',
    scope: {
      whattodo: '='
    },
    link: function(scope){
      scope.runMethod = function(){
        console.log('method:', scope.whattodo);
        console.log('method:', scope.current);
        if (scope.whattodo === 'login'){
          console.log('logging in')
          AuthFactory.login(scope.current);
        }else{
          console.log('signing up');
          AuthFactory.signup(scope.current);
        }
      }
    }
  }
})
