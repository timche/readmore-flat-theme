var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var bourbon = require('node-bourbon').includePaths;
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var notify = require("gulp-notify");
var package = require('./package.json');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var sequence = require('gulp-sequence');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var src = {}
    src.path = './src';
    src.manifest = src.path + '/manifest.json';
    src.stylesheets = src.path + '/stylesheets/**/*.scss';
    src.javascripts = [src.path + '/javascripts/vendor/*.js', src.path + '/javascripts/*.js'];
    src.images = src.path + '/images/**/*';
    src.fonts = src.path + '/fonts/**/*.ttf';

var dist = {}
    dist.path = './dist';
    dist.stylesheets = dist.path + '/assets/css';
    dist.javascripts = dist.path + '/assets/js';
    dist.images = dist.path + '/assets/img';
    dist.fonts = dist.path + '/assets/fonts';

gulp.task('stylesheets', function () {
    return gulp.src(src.stylesheets)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass.sync({includePaths: bourbon}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(replace(';', ' !important;'))
    .pipe(minifyCSS())
    .pipe(rename({basename: package.name, suffix: '.min'}))
    .pipe(gulp.dest(dist.stylesheets))
});

gulp.task('javascripts', function() {
    return gulp.src(src.javascripts)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat(package.name + '.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist.javascripts))
});

gulp.task('images', function() {
    return gulp.src(src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(dist.images));
});

gulp.task('fonts', function() {
    return gulp.src(src.fonts)
    .pipe(gulp.dest(dist.fonts));
});

gulp.task('manifest', function() {
    return gulp.src(src.manifest)
    .pipe(replace('{{package.title}}', package.title))
    .pipe(replace('{{package.description}}', package.description))
    .pipe(replace('{{package.version}}', package.version))
    .pipe(replace('{{package.author}}', package.author))
    .pipe(gulp.dest(dist.path))
});

gulp.task('clean', function (cb) {
    del([dist.path], cb);
});

gulp.task('zip', function () {
    return gulp.src(dist.path + '**/**/*')
    .pipe(zip(package.name + '-' + package.version + '-dist.zip'))
    .pipe(gulp.dest(dist.path));
});

gulp.task('bump', function(){
    gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['stylesheets', 'javascripts', 'images', 'fonts', 'manifest'], function () {
    gulp.watch(src.stylesheets, ['stylesheets']);
    gulp.watch(src.javscripts, ['javascripts']);
    gulp.watch(src.images, ['images']);
    gulp.watch(src.fonts, ['fonts']);
    gulp.watch(src.manifest, ['manifest']);
});

gulp.task('build', function(cb) {
    sequence('clean', 'stylesheets', 'javascripts', 'images', 'fonts', 'manifest', 'zip', cb);
});
