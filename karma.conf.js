module.exports = function (config) {
	'use strict';
	config.set({
		basePath: '.',
		files: [
			'node_modules/mocha/mocha.js',
			'node_modules/chai/chai.js',

			'bower_components/angular/angular.js',
			'bower_components/angular-mocks/angular-mocks.js',

			'angular-for.js',
            'angular-for.spec.js'
        ],
		reporters: ['progress', 'brackets'],
		frameworks: ['mocha'],
		port: 9876,
		runnerPort: 9100,
		colors: true,
		autoWatch: true,
		browsers: ['PhantomJS'],
		captureTimeout: 60000,
		singleRun: false
	});
};