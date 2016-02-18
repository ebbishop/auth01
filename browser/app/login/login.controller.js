'use strict';

app.controller('LoginCtrl', function ($scope, $http, $state) {
	$scope.submitSignup = function() {
		$http.post('/api/login', $scope.current)
		.then(function() {
			$state.go('stories');
		})
	}
});