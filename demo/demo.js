'use strict';

angular.module('demoApp', ['bl.ngFor'])

.controller('demoCtrl', ['$scope',
    function ($scope) {
		$scope.loopCount = 3;
}]);