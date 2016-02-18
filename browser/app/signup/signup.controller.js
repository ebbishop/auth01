'use strict';

app.controller('SignupCtrl', function ($scope, AuthFactory) {
	$scope.submitSignup = function() {
    return AuthFactory.signup($scope.current);
	}
});
