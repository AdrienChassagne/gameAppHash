var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	browserSync = require('browser-sync'),
	del = require('del'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-minify-css'),
	prefix = require('gulp-autoprefixer'),
	rename = require('gulp-rename');

var $ = require('gulp-load-plugins')();

var paths = {
	dirs: {
		src: 'app/',
		build: 'dist/',
		assets: 'dist/assets/'
	},
	html: [
		'app/**/*.html',
		'app/*.html'
	],
	js: [
		'app/*.js',
		'app/*/*.js'
	],
	css: 'app/css/',
	images: 'app/assets/*.{jpg,png,gif}',
	less: 'app/less/style.less',
	vendor: {
		js: [
			'node_modules/angular-animate/angular-animate.js',
			'node_modules/angular-aria/angular-aria.js',
			'node_modules/angular-material/angular-material.js',
			'node_modules/angular-sanitize/angular-sanitize.js',
			'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
			'node_modules/bootstrap/dist/js/bootstrap.js'
		],
		fonts: [
			'node_modules/font-awesome/fonts/*'
		]
	}
};

// Tasks

// gulp clean => Erase dist folder
gulp.task('clean', function () {
	del(paths.dirs.build);
});

// gulp html => Get all html files and put them in dist folder
gulp.task('html', function () {
	return gulp.src(paths.html)
		.pipe(gulp.dest(paths.dirs.build));
});

gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe(gulp.dest(paths.dirs.assets + '/images/'));
});

gulp.task('less', function () {
	return gulp.src(paths.less)
		.pipe(less().on('error', function (err) {
			console.log('less error: ', err);
		}))
		.pipe(prefix())
		.pipe(gulp.dest(paths.css))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('scripts', function () {
	return gulp.src(paths.js)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.dirs.build));
});

gulp.task('vendor:js', function () {
	return gulp.src(paths.vendor.js)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(paths.dirs.build ));
});

gulp.task('vendor:css', function () {
	return gulp.src(paths.less)
		.pipe(less().on('error', function (err) {
			console.log('less error: ', err);
		}))
		.pipe(prefix())
		.pipe(cssmin().on('error', function (err) {
			console.log(err);
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dirs.build))
});

gulp.task('vendor:fonts', function () {
	return gulp.src(paths.vendor.fonts)
		.pipe(gulp.dest(paths.dirs.assets + 'fonts/'));
});

gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:fonts'], function () {
	console.log('- Building vendors -');
});

gulp.task('watch', ['less', 'browserSync'], function () {
	gulp.watch('app/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/**/*.js', browserSync.reload);
	gulp.watch('app/**/*.less', ['less']);
});

gulp.task('browserSync', function () {
	browserSync({
		open: false,
		server: {
			baseDir: paths.dirs.src
		}
	})
});

gulp.task('fonts', function () {
	return gulp.src([
		'node_modules/font-awesome/fonts/fontawesome-webfont.*'])
		.pipe(gulp.dest('app/assets/fonts/'));
});

gulp.task('serve', ['fonts', 'less', 'watch'], function () {
	console.log('*- Yay! -* Building files');
});

gulp.task('build', ['clean', 'html', 'images', 'scripts', 'vendor', 'less'], function () {
	console.log('*- Yay! -* Building app');
});
