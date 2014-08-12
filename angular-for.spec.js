'use strict';

describe('angular-forLoop directive', function () {

	var expect = chai.expect;
	var elemWrapper;
	var element;
	var scope;

	beforeEach(module('billludwig.ngFor'));

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	function buildDirective(template) {
		var tpl;
		if (!template) {
			template = '<li data-ng-for="iterations"></li>';
		}
		tpl = '<ol name="list">' + template + '</ol>';

		inject(function ($compile) {
			elemWrapper = $compile(tpl)(scope);
			element = elemWrapper.find('li');
		});
		scope.$digest();
	}

	describe('invalid input values: Array and Object - use ngRepeat instead', function () {

		it('should do nothing if it is passed an Array', function () {
			var items;
			scope.iterations = [1, 2, 3];
			buildDirective('<li data-ng-for="iterations"></li>');
			items = elemWrapper.find('li');
			expect(items.length).to.equal(0);
		});

		it('should do nothing if it is passed an Object', function () {
			var items;
			scope.iterations = {
				prop1: 1,
				prop2: 2,
				prop3: 3
			};
			buildDirective('<li data-ng-for="iterations"></li>');
			items = elemWrapper.find('li');
			expect(items.length).to.equal(0);
		});

	});

	describe('loop over $scope value', function () {
		var defaultTemplate = '<li data-ng-for="iterations"></li>';

		it('should loop once per value of scope item', function () {
			var items;
			scope.iterations = 3;
			buildDirective(defaultTemplate);
			items = elemWrapper.find('li');
			expect(items.length).to.equal(3);
		});

		it('should update loop count when value increases', function () {
			var items;
			scope.iterations = 3;
			buildDirective(defaultTemplate);
			items = elemWrapper.find('li');
			expect(items.length).to.equal(3);
			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items.length).to.equal(5);
		});

		it('should update loop count when value decreases', function () {
			var items;
			scope.iterations = 3;
			buildDirective(defaultTemplate);
			items = elemWrapper.find('li');
			expect(items.length).to.equal(3);
			scope.iterations = 1;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items.length).to.equal(1);
		});

		it('should display nothing if property not on scope', function () {
			var items;
			expect(scope.iterations).to.be.undefined;
			buildDirective(defaultTemplate);
			items = elemWrapper.find('li');
			expect(items.length).to.equal(0);
		});

		it('should update loop count if property is later added to scope', function () {
			var items;
			expect(scope.iterations).to.be.undefined;
			buildDirective(defaultTemplate);
			items = elemWrapper.find('li');
			expect(items.length).to.equal(0);

			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items.length).to.equal(5);
		});

		it('should have $scope.$index that stays accurate when value increases', function () {
			var items;
			scope.iterations = 3;
			buildDirective('<li data-ng-for="iterations">{{$index}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('1');
			expect(items[1].innerHTML).to.equal('2');
			expect(items[2].innerHTML).to.equal('3');
			// increase and retest
			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('1');
			expect(items[1].innerHTML).to.equal('2');
			expect(items[2].innerHTML).to.equal('3');
			expect(items[3].innerHTML).to.equal('4');
			expect(items[4].innerHTML).to.equal('5');
		});

		it('should have $scope.$index that stays accurate when value decreases', function () {
			var items;
			scope.iterations = 5;
			buildDirective('<li data-ng-for="iterations">{{$index}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('1');
			expect(items[1].innerHTML).to.equal('2');
			expect(items[2].innerHTML).to.equal('3');
			expect(items[3].innerHTML).to.equal('4');
			expect(items[4].innerHTML).to.equal('5');
			// decrease and retest
			scope.iterations = 3;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('1');
			expect(items[1].innerHTML).to.equal('2');
			expect(items[2].innerHTML).to.equal('3');
		});

		it('should have $scope.$first that stays accurate when value increases', function () {
			var items;
			scope.iterations = 3;
			buildDirective('<li data-ng-for="iterations">{{$first}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('false');
			// increase and retest
			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('false');
			expect(items[3].innerHTML).to.equal('false');
			expect(items[4].innerHTML).to.equal('false');
		});

		it('should have $scope.$first that stays accurate when value decreases', function () {
			var items;
			scope.iterations = 5;
			buildDirective('<li data-ng-for="iterations">{{$first}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('false');
			expect(items[3].innerHTML).to.equal('false');
			expect(items[4].innerHTML).to.equal('false');
			// decrease and retest
			scope.iterations = 3;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('false');
		});

		it('should have $scope.$last that stays accurate when value increases', function () {
			var items;
			scope.iterations = 3;
			buildDirective('<li data-ng-for="iterations">{{$last}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('true');
			// increase and retest
			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('false');
			expect(items[3].innerHTML).to.equal('false');
			expect(items[4].innerHTML).to.equal('true');
		});

		it('should have $scope.$last that stays accurate when value decreases', function () {
			var items;
			scope.iterations = 5;
			buildDirective('<li data-ng-for="iterations">{{$last}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('false');
			expect(items[3].innerHTML).to.equal('false');
			expect(items[4].innerHTML).to.equal('true');
			// decrease and retest
			scope.iterations = 3;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('true');
		});

		it('should have $scope.$middle that stays accurate when value increases', function () {
			var items;
			scope.iterations = 3;
			buildDirective('<li data-ng-for="iterations">{{$middle}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('false');
			// increase and retest
			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('true');
			expect(items[3].innerHTML).to.equal('true');
			expect(items[4].innerHTML).to.equal('false');
		});

		it('should have $scope.$middle that stays accurate when value decreases', function () {
			var items;
			scope.iterations = 5;
			buildDirective('<li data-ng-for="iterations">{{$middle}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('true');
			expect(items[3].innerHTML).to.equal('true');
			expect(items[4].innerHTML).to.equal('false');
			// decrease and retest
			scope.iterations = 3;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('false');
		});

		it('should have $scope.$even that stays accurate when value increases', function () {
			var items;
			scope.iterations = 3;
			buildDirective('<li data-ng-for="iterations">{{$even}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('false');
			// increase and retest
			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('false');
			expect(items[3].innerHTML).to.equal('true');
			expect(items[4].innerHTML).to.equal('false');
		});

		it('should have $scope.$even that stays accurate when value decreases', function () {
			var items;
			scope.iterations = 5;
			buildDirective('<li data-ng-for="iterations">{{$even}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('false');
			expect(items[3].innerHTML).to.equal('true');
			expect(items[4].innerHTML).to.equal('false');
			// decrease and retest
			scope.iterations = 3;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('false');
			expect(items[1].innerHTML).to.equal('true');
			expect(items[2].innerHTML).to.equal('false');
		});

		it('should have $scope.$odd that stays accurate when value increases', function () {
			var items;
			scope.iterations = 3;
			buildDirective('<li data-ng-for="iterations">{{$odd}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('true');
			// increase and retest
			scope.iterations = 5;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('true');
			expect(items[3].innerHTML).to.equal('false');
			expect(items[4].innerHTML).to.equal('true');
		});

		it('should have $scope.$odd that stays accurate when value decreases', function () {
			var items;
			scope.iterations = 5;
			buildDirective('<li data-ng-for="iterations">{{$odd}}</li>');
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('true');
			expect(items[3].innerHTML).to.equal('false');
			expect(items[4].innerHTML).to.equal('true');
			// decrease and retest
			scope.iterations = 3;
			scope.$digest();
			items = elemWrapper.find('li');
			expect(items[0].innerHTML).to.equal('true');
			expect(items[1].innerHTML).to.equal('false');
			expect(items[2].innerHTML).to.equal('true');
		});

	});

	describe('loop over primitive intiger value', function () {
		var defaultTemplate = '<li data-ng-for="5">{{$index}}</li>';

		it('should print 5 items when data-ng-for=5', function () {
			buildDirective(defaultTemplate);
			expect(element.length).to.equal(5);
		});

		it('should have $scope.$index that starts at 1 and increments by one each step', function () {
			buildDirective('<li data-ng-for="5">{{$index}}</li>');
			expect(element[0].innerHTML).to.equal('1');
			expect(element[1].innerHTML).to.equal('2');
			expect(element[2].innerHTML).to.equal('3');
			expect(element[3].innerHTML).to.equal('4');
			expect(element[4].innerHTML).to.equal('5');
		});

		it('should have $scope.$first that is true for the first item and false for all others', function () {
			buildDirective('<li data-ng-for="5">{{$first}}</li>');
			expect(element[0].innerHTML).to.equal('true');
			expect(element[1].innerHTML).to.equal('false');
			expect(element[2].innerHTML).to.equal('false');
			expect(element[3].innerHTML).to.equal('false');
			expect(element[4].innerHTML).to.equal('false');
		});

		it('should have $scope.$last that is true for the last item and false for all others', function () {
			buildDirective('<li data-ng-for="5">{{$last}}</li>');
			expect(element[0].innerHTML).to.equal('false');
			expect(element[1].innerHTML).to.equal('false');
			expect(element[2].innerHTML).to.equal('false');
			expect(element[3].innerHTML).to.equal('false');
			expect(element[4].innerHTML).to.equal('true');
		});

		it('should have $scope.$middle that is false for the first and last items and true for all others', function () {
			buildDirective('<li data-ng-for="5">{{$middle}}</li>');
			expect(element[0].innerHTML).to.equal('false');
			expect(element[1].innerHTML).to.equal('true');
			expect(element[2].innerHTML).to.equal('true');
			expect(element[3].innerHTML).to.equal('true');
			expect(element[4].innerHTML).to.equal('false');
		});

		it('should have $scope.$even that is true for the even items', function () {
			buildDirective('<li data-ng-for="5">{{$even}}</li>');
			expect(element[0].innerHTML).to.equal('false');
			expect(element[1].innerHTML).to.equal('true');
			expect(element[2].innerHTML).to.equal('false');
			expect(element[3].innerHTML).to.equal('true');
			expect(element[4].innerHTML).to.equal('false');
		});

		it('should have $scope.$odd that is true for the odd items', function () {
			buildDirective('<li data-ng-for="5">{{$odd}}</li>');
			expect(element[0].innerHTML).to.equal('true');
			expect(element[1].innerHTML).to.equal('false');
			expect(element[2].innerHTML).to.equal('true');
			expect(element[3].innerHTML).to.equal('false');
			expect(element[4].innerHTML).to.equal('true');
		});


	});


});