(function angularFor(window, document, undefined) {
	'use strict';

	angular.module('bl.ngFor', [])

	.directive('ngFor', ['$animate',
		function ($animate) {
			return {
				restrict: 'A',
				multiElement: true,
				transclude: 'element',
				priority: 1000,
				terminal: true,
				link: function ($scope, $element, attr, nullCtrl, $transclude) {
					var attribute = attr.ngFor;
					var limit;
					var index;

					$scope.attributeVal = $scope[attribute];

					// based on ngRepeat.js v1.2.21
					// Store a list of elements from previous run. This is a hash where key is the item from the
					// iterator, and the value is objects with following properties.
					//   - scope: bound scope
					//   - element: previous element.
					//   - index: position
					var elementHash = [];

					// handle scope parameter
					if (isNaN(parseInt(attribute, 10))) {
						if (typeof (attribute) === 'string') {
							$scope.$watch(attribute, function () {
								limit = $scope[attribute];
								cullHash();
								for (index = 0; index < limit; index++) {
									loop(index);
								}
							});
						}
					}

					// handle Numerical values
					// these do not update so no reason to run cullHash
					else {
						limit = attribute;
						for (index = 0; index < limit; index++) {
							loop(index);
						}
					}

					function loop(index) {
						// New items
						if (elementHash.length <= index) {
							$transclude(function (clone, scope) {
								addElement(clone, scope, index);
							});
						}
						// Update item
						else {
							updateScope(elementHash[index].scope, index);
						}
					}

					function cullHash() {
						var i;
						var startingLength = elementHash.length;
						if (startingLength > limit) {
							for (i = limit; i < startingLength; i++) {
								var hashItem = elementHash.pop();
								removeElement(hashItem);
							}
						}
					}

					function addElement(clone, scope, index) {
						updateScope(scope, index);
						elementHash.push({
							scope: scope,
							element: clone
						});
						$animate.enter(clone, null, $element);
					}

					function removeElement(hashItem) {
						$animate.leave(hashItem.element);
					}

					// based on ngRepeat.js v1.2.21
					function updateScope(scope, index) {
						scope.$index = limit - index;
						scope.$first = (index === (limit - 1));
						scope.$last = (index === 0);
						scope.$middle = !(scope.$first || scope.$last);
						// jshint bitwise: false
						scope.$odd = !(scope.$even = (index & 1) !== 0);
						// jshint bitwise: true
					}

				}
			};
		}]);


})(window, document);