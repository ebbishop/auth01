'use strict';

app.controller('SignupCtrl', function ($scope, $http, $state) {
	$scope.submitSignup = function() {
		$http.post('/api/signup', $scope.current)
		.then(function() {
			$state.go('stories');
		})
	}
});