'use strict'
const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const notify = require('gulp-notify');
const less = require('gulp-less');
const path = require('path');
const livereload = require('gulp-livereload');

gulp.task('js', () => {
	return browserify('./client/index.js')
		.transform('babelify', {
			presets: ['es2015','react']
		})
		.bundle()
		.on('error',notify.onError({
			message: "Error: <%= error.message %>",
			title: 'Error in JS 💀'
		}))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('./client/public/dist/js'))

});

gulp.task('less', function () {
  return gulp.src('./client/public/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'client/public/less', 'includes') ]
    }))
    .pipe(gulp.dest('./client/public/css'))
		.pipe(livereload({ start: true }));
});

gulp.task('default', ['js','less'], () => {
	gulp.watch('./client/**/*.js',['js']);
	gulp.watch('./client/index.js',['js']);
	gulp.watch('./client/*.js',['js']);
	gulp.watch('./client/public/less/*.less',['less']);
});
