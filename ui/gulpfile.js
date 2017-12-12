/* Gulfile */

const gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglifyjs = require('uglify-js'),
    minifier = require('gulp-uglify/minifier'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpUtil = require('gulp-util'),
    gulpif = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),
    gzip = require('gulp-gzip'),
    clean = require('gulp-clean'),
    streamqueue = require('streamqueue'),
    runSequence = require('run-sequence'),
    ENV = process.env.ENV,
    isProd = ENV === 'production';


/**
 *
 *
 * Login Gulp Code
 *
 *
 */
gulp.task('loginVendorJs', () => {
    const minFiles = [
		'node_modules/angular/angular.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-messages/angular-messages.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'node_modules/opbeat-js/dist/angular-opbeat.min.js'
	];

    return gulp.src(minFiles)
        .pipe(concat('vendor.js'))
        .pipe(gzip().on('error', gulpUtil.log))
        .pipe(gulp.dest('server/login/js'));
});

gulp.task('loginJs', () => {
    const files = [
		'login/**/!(app)*.module.js',
		'login/**/*.service.js',
		'login/**/*.filter.js',
		'login/**/*.directive.js',
		'login/**/*.controller.js',
		'login/**/!(app)*.config.js',
		'login/app.module.js',
		'login/**/*.constant.js',
		'login/app.config.js',
		'login/**/*.js'
	];

    return gulp.src(files)
        .pipe(gulpif(isProd, sourcemaps.init()))
        .pipe(concat('app.js'))
        .pipe(gulpif(isProd, sourcemaps.write()))
        .pipe(gzip().on('error', gulpUtil.log))
        .pipe(gulp.dest('server/login/js'));
});

gulp.task('loginVendorCss', () => {
    const css = [
			'node_modules/font-awesome/css/font-awesome.min.css'
		],
        scss = [
			'node_modules/angular-material/angular-material.scss'
		],
        scssStream = gulp.src(scss)
        .pipe(sass({
            errLogToConsole: true
        })),
        cssStream = gulp.src(css);

    return streamqueue({
            objectMode: true
        }, scssStream, cssStream)
        .pipe(concat('vendor.css'))
        .pipe(gulpif(isProd, cleanCSS().on('error', gulpUtil.log)))
        .pipe(gzip().on('error', gulpUtil.log))
        .pipe(gulp.dest('server/login/styles'));
});

gulp.task('loginScss', () => {
    const files = [
		'login/**/*.scss'
	];

    return gulp.src(files)
        .pipe(sass())
        .pipe(gulpif(isProd, sourcemaps.init()))
        .pipe(concat('app.css'))
        .pipe(gulpif(isProd, sourcemaps.write()))
        .pipe(gzip().on('error', gulpUtil.log))
        .pipe(gulp.dest('server/login/styles'));
});

gulp.task('loginVendorFonts', () => {
    const files = [
		'node_modules/font-awesome/fonts/*.*'
	];

    return gulp.src(files)
        .pipe(gulp.dest('server/login/fonts'));
});

gulp.task('loginHtml', () => {
    const files = [
		'login/**/*.html'
	];

    return gulp.src(files)
        .pipe(gulpif(isProd, htmlmin({
            removeComments: true,
            collapseWhitespace: true
        })))
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gzip().on('error', gulpUtil.log))
        .pipe(gulp.dest('server/login/html'));
});

gulp.task('loginIndex', () => {
    return gulp.src('login/index.html')
        .pipe(gulpif(isProd, htmlmin({
            removeComments: true,
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('server/login'));
});
