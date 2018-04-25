/* Do not do this to regular JS files */
/* eslint "strict": "off" */
/* eslint "sort-vars": "off" */
/* eslint "max-lines": "off" */
/* eslint "no-nested-ternary": "off" */
/* eslint "no-magic-numbers": "off" */
/* eslint "angular/json-functions": "off" */

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

/**
 *
 *
 * Field Gulp Code
 *
 *
 */
gulp.task('fieldVendorJs', () => {
	const minFiles = [
		'node_modules/lodash/lodash.min.js',
		'node_modules/angular/angular.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-messages/angular-messages.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'node_modules/opbeat-js/dist/angular-opbeat.min.js',
		'node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
		'node_modules/angular-material-data-table/dist/md-data-table.min.js',
		'node_modules/angular-google-maps/dist/angular-google-maps.min.js'
	];

	return gulp.src(minFiles)
	.pipe(concat('vendor.js'))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/field/js'));
});

gulp.task('fieldJs', () => {
	const files = [
		'field/**/!(app)*.constant.js',
		'field/**/appointment.module.js',
		'field/**/!(app)*.module.js',
		'field/**/*.service.js',
		'field/**/*.filter.js',
		'field/**/*.directive.js',
		'field/**/*.controller.js',
		'field/**/appointment.config.js',
		'field/**/!(app)*.config.js',
		'field/app.module.js',
		'field/app.config.js',
		'field/**/*.js'
	];

	return gulp.src(files)
	.pipe(gulpif(isProd, sourcemaps.init()))
	.pipe(concat('app.js'))
	.pipe(gulpif(isProd, sourcemaps.write()))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/field/js'));
});

gulp.task('fieldVendorCss', () => {
	const css = [
			'node_modules/font-awesome/css/font-awesome.min.css',
			'node_modules/angular-material-data-table/dist/md-data-table.min.css'
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
	.pipe(gulp.dest('server/field/styles'));
});

gulp.task('fieldScss', () => {
	const files = [
		'field/**/*.scss'
	];

	return gulp.src(files)
	.pipe(sass())
	.pipe(gulpif(isProd, sourcemaps.init()))
	.pipe(concat('app.css'))
	.pipe(gulpif(isProd, sourcemaps.write()))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/field/styles'));
});

gulp.task('fieldVendorFonts', () => {
	const files = [
		'node_modules/font-awesome/fonts/*.*'
	];

	return gulp.src(files)
	.pipe(gulp.dest('server/field/fonts'));
});

gulp.task('fieldHtml', () => {
	const files = [
		'field/**/*.html'
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
	.pipe(gulp.dest('server/field/html'));
});

gulp.task('fieldIndex', () => {
	return gulp.src('field/index.html')
		.pipe(gulpif(isProd, htmlmin({
			removeComments: true,
			collapseWhitespace: true
		})))
		.pipe(gulp.dest('server/field'));
});

/**
 *
 *
 * Admin Gulp Code
 *
 *
 */
gulp.task('adminVendorJs', () => {
	const minFiles = [
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/moment/min/moment.min.js',
		'node_modules/lodash/lodash.min.js',
		'node_modules/angular/angular.min.js',
		'node_modules/angular-animate/angular-animate.min.js',
		'node_modules/angular-aria/angular-aria.min.js',
		'node_modules/angular-messages/angular-messages.min.js',
		'node_modules/angular-material/angular-material.min.js',
		'node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'node_modules/opbeat-js/dist/angular-opbeat.min.js',
		'node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
		'node_modules/angular-material-data-table/dist/md-data-table.min.js',
		'node_modules/mdPickers/dist/mdPickers.js'
	];

	return gulp.src(minFiles)
	.pipe(concat('vendor.js'))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/admin/js'));
});

gulp.task('adminJs', () => {
	const files = [
		'admin/**/!(app)*.constant.js',
		'shared-utils/**/*.constant.js',
		'admin/**/appointment.module.js',
		'admin/**/!(app)*.module.js',
		'admin/**/*.service.js',
		'shared-utils/**/*.service.js',
		'admin/**/*.filter.js',
		'admin/**/*.directive.js',
		'shared-utils/**/*.directive.js',
		'admin/**/*.controller.js',
		'admin/**/appointment.config.js',
		'admin/**/!(app)*.config.js',
		'admin/app.module.js',
		'admin/app.constants.js',
		'admin/app.config.js',
		'admin/**/*.js'
	];

	return gulp.src(files)
	.pipe(gulpif(isProd, sourcemaps.init()))
	.pipe(concat('app.js'))
	.pipe(gulpif(isProd, sourcemaps.write()))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/admin/js'));
});

gulp.task('adminVendorCss', () => {
	const css = [
			'node_modules/font-awesome/css/font-awesome.min.css',
			'node_modules/angular-material-data-table/dist/md-data-table.min.css',
			'node_modules/mdPickers/dist/mdPickers.css'
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
	.pipe(gulp.dest('server/admin/styles'));
});

gulp.task('adminScss', () => {
	const files = [
		'admin/app.scss'
	];

	return gulp.src(files)
	.pipe(sass())
	.pipe(gulpif(isProd, sourcemaps.init()))
	.pipe(concat('app.css'))
	.pipe(gulpif(isProd, sourcemaps.write()))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/admin/styles'));
});

gulp.task('adminVendorFonts', () => {
	const files = [
		'node_modules/font-awesome/fonts/*.*'
	];

	return gulp.src(files)
	.pipe(gulp.dest('server/admin/fonts'));
});

gulp.task('adminHtml', () => {
	const files = [
		'admin/**/*.html',
		'shared-utils/**/*.html'
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
	.pipe(gulp.dest('server/admin/html'));
});

gulp.task('adminIndex', () => {
	return gulp.src('admin/index.html')
		.pipe(gulpif(isProd, htmlmin({
			removeComments: true,
			collapseWhitespace: true
		})))
		.pipe(gulp.dest('server/admin'));
});

/**
 *
 *
 * Office Gulp Code
 *
 *
 */
gulp.task('officeVendorJs', () => {
	const minFiles = [
			'node_modules/jquery/dist/jquery.min.js',

			'node_modules/moment/min/moment.min.js',

			'node_modules/lodash/lodash.min.js',

			'node_modules/api-check/dist/api-check.min.js',
			'node_modules/angular/angular.min.js',
			'node_modules/angular-formly/dist/formly.min.js',
			'node_modules/angular-formly-material/dist/formly-material.min.js',
			'node_modules/angular-aria/angular-aria.min.js',
			'node_modules/angular-ui-router/release/angular-ui-router.min.js',
			'node_modules/angular-animate/angular-animate.min.js',
			'node_modules/angular-messages/angular-messages.min.js',
			'node_modules/angular-material/angular-material.min.js',
			'node_modules/angular-material-data-table/dist/md-data-table.min.js',
			'node_modules/angular-touch/angular-touch.min.js',
			'node_modules/angular-cookies/angular-cookies.min.js',
			'node_modules/angular-resource/angular-resource.min.js',
			'node_modules/angular-filter/dist/angular-filter.min.js',
			'node_modules/angular-csv-import/dist/angular-csv-import.min.js',
			'node_modules/mdPickers/dist/mdPickers.js',
			'node_modules/ng-storage/ngStorage.min.js',
			'node_modules/ng-file-upload/dist/ng-file-upload.min.js',
			'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
			'node_modules/angular-moment/angular-moment.min.js',
			'node_modules/angular-sanitize/angular-sanitize.min.js',
			'node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
			'node_modules/angular-google-maps/dist/angular-google-maps.min.js',
			'node_modules/opbeat-js/dist/angular-opbeat.min.js',
			'node_modules/v-accordion/dist/v-accordion.min.js'
		],
		nonMinFiles = [],
		minStream = gulp.src(minFiles),
		nonMinStream = gulp.src(nonMinFiles)
		.pipe(minifier({}, uglifyjs).on('error', gulpUtil.log));

	return streamqueue({
		objectMode: true
	}, minStream, nonMinStream)
	.pipe(concat('vendor.js'))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/office/js'));
});

gulp.task('officeVendorCss', () => {
	const css = [
			'node_modules/font-awesome/css/font-awesome.min.css',

			'node_modules/mdPickers/dist/mdPickers.css',

			'node_modules/ui-select/dist/select.css',

			'node_modules/angular-material-data-table/dist/md-data-table.min.css',

			'node_modules/v-accordion/dist/v-accordion.min.css'
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
	.pipe(gulp.dest('server/office/styles'));
});

gulp.task('officeVendorFonts', () => {
	const files = [
		'node_modules/font-awesome/fonts/*.*'
	];

	return gulp.src(files)
	.pipe(gulp.dest('server/office/fonts'));
});

gulp.task('officeIndex', () => {
	return gulp.src('office/index.html')
		.pipe(gulpif(isProd, htmlmin({
			removeComments: true,
			collapseWhitespace: true
		})))
		.pipe(gulp.dest('server/office'));
});

gulp.task('officeJs', () => {
	const files = [
		'office/**/*.constant.js',
		'shared-utils/**/*.constant.js',
		'office/**/!(app)*.module.js',
		'office/**/*.service.js',
		'shared-utils/**/*.service.js',
		'office/**/*.filter.js',
		'office/**/*.directive.js',
		'shared-utils/**/*.directive.js',
		'office/**/*.controller.js',
		'office/**/!(app)*.config.js',
		'office/app.module.js',
		'office/app.constants.js',
		'office/app.config.js',
		'office/**/*.js'
	];

	return gulp.src(files)
	.pipe(gulpif(isProd, sourcemaps.init()))
	.pipe(concat('app.js'))
	.pipe(gulpif(isProd, sourcemaps.write()))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/office/js'));
});

gulp.task('officeScss', () => {
	const files = [
		'office/**/*.scss'
	];

	return gulp.src(files)
	.pipe(sass())
	.pipe(gulpif(isProd, sourcemaps.init()))
	.pipe(concat('app.css'))
	.pipe(gulpif(isProd, sourcemaps.write()))
	.pipe(gzip().on('error', gulpUtil.log))
	.pipe(gulp.dest('server/office/styles'));
});

gulp.task('officeHtml', () => {
	const files = [
		'office/**/*.html',
		'shared-utils/**/*.html'
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
	.pipe(gulp.dest('server/office/html'));
});

gulp.task('images', () => {
	const files = [
		'office/**/*.{png,gif,jpg,svg}',
		'field/**/*.{png,gif,jpg,svg}',
		'images/**/*.{png,gif,jpg,svg}',
		'office/test.csv'
	];

	return gulp.src(files)
	.pipe(rename({
		dirname: ''
	}))
	.pipe(gulp.dest('server/images'));
});

gulp.task('favicon', () => {
	return gulp.src('favicon.ico')
		.pipe(gulp.dest('server'));
});

gulp.task('lint', () => {
	const jsFiles = [
			'./**/*.js',
			'!node_modules/',
			'!server/'
		],
		jsStream = gulp.src(jsFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());

	return streamqueue({
		objectMode: true
	}, jsStream);
});

gulp.task('clean', () => {
	return gulp.src('server')
		.pipe(clean({
			force: true
		}));
});

gulp.task('watch', () => {
	if(isProd) {
		return;
	}

	gulp.watch('office/**/*.js', ['officeJs']);
	gulp.watch('office/**/*.scss', ['officeScss']);
	gulp.watch('office/**/*.html', ['officeHtml', 'officeIndex']);
	gulp.watch('office/**/*.png', ['images']);

	gulp.watch('login/**/*.js', ['loginJs']);
	gulp.watch('login/**/*.scss', ['loginScss']);
	gulp.watch('login/**/*.html', ['loginHtml', 'loginIndex']);

	gulp.watch('field/**/*.js', ['fieldJs']);
	gulp.watch('field/**/*.scss', ['fieldScss']);
	gulp.watch('field/**/*.html', ['fieldHtml', 'fieldIndex']);

	gulp.watch('admin/**/*.js', ['adminJs']);
	gulp.watch('admin/**/*.scss', ['adminScss']);
	gulp.watch('admin/**/*.html', ['adminHtml', 'adminIndex']);

	gulp.watch('shared-utils/**/*.js', ['officeJs', 'loginJs', 'fieldJs', 'adminJs']);
	gulp.watch('shared-utils/**/*.scss', ['officeScss', 'loginScss', 'fieldScss', 'adminScss']);
	gulp.watch('shared-utils/**/*.html',
	['officeHtml', 'officeIndex', 'loginHtml', 'loginIndex', 'fieldHtml', 'fieldIndex', 'adminHtml', 'adminIndex']);
});

gulp.task('default', ['clean'], function(callback) {
	runSequence(
		'clean',
		['images', 'favicon'],
		['officeVendorJs', 'officeVendorCss', 'officeVendorFonts', 'officeJs', 'officeHtml', 'officeScss', 'officeIndex'],
		['loginVendorJs', 'loginJs', 'loginVendorCss', 'loginScss', 'loginVendorFonts', 'loginHtml', 'loginIndex'],
		['fieldVendorJs', 'fieldJs', 'fieldVendorCss', 'fieldScss', 'fieldVendorFonts', 'fieldHtml', 'fieldIndex'],
		['adminVendorJs', 'adminJs', 'adminVendorCss', 'adminScss', 'adminVendorFonts', 'adminHtml', 'adminIndex'],
		callback
	);
});

gulp.task('build', ['clean'], function(callback) {
	runSequence(
		'clean',
		['images', 'favicon'],
		['officeVendorJs', 'officeVendorCss', 'officeVendorFonts', 'officeJs', 'officeHtml', 'officeScss', 'officeIndex'],
		['loginVendorJs', 'loginJs', 'loginVendorCss', 'loginScss', 'loginVendorFonts', 'loginHtml', 'loginIndex'],
		['fieldVendorJs', 'fieldJs', 'fieldVendorCss', 'fieldScss', 'fieldVendorFonts', 'fieldHtml', 'fieldIndex'],
		['adminVendorJs', 'adminJs', 'adminVendorCss', 'adminScss', 'adminVendorFonts', 'adminHtml', 'adminIndex'],
		callback
	);
});

gulp.task('serve');
