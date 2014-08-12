'use strict';

var gulp = require('gulp');

gulp.task('default', ['minify']);

gulp.task('minify', function () {
	var concat = require('gulp-concat');
	var src = './angular-for.js';
	var uglify = require('gulp-uglify');

	return gulp.src(src)
		.pipe(uglify())
		.pipe(concat('angular-for.min.js'))
		.pipe(gulp.dest('./'));
});