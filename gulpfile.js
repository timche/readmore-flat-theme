var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var bourbon = require('node-bourbon').includePaths;
var bump = require('gulp-bump');
var concat = require('gulp-concat');
var del = require('del');
var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
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
    src.pathBackground = './src/background';
    src.pathTheme = './src/theme';
    src.pathPopup = './src/popup';

    src.backgroundJavascripts = src.pathBackground + '/javascripts/*.js';

    src.manifest = src.path + '/manifest.json';

    src.popupViews = src.pathPopup + '/views/*';
    src.popupJavascripts = src.pathPopup + '/javascripts/*';

    src.themeFonts = src.pathTheme + '/fonts/**/*';
    src.themeImages = src.pathTheme + '/images/**/*';
    src.themeJavascripts = [src.pathTheme + '/javascripts/jquery/*.js', src.pathTheme + '/javascripts/vendor/**/*.js', src.pathTheme + '/javascripts/*.js'];
    src.themeStylesheets = src.pathTheme + '/stylesheets/**/*';
    src.themeStylesheetsFonts = src.pathTheme + '/stylesheets/base/fonts.scss';
    src.themeStylesheetsMain = src.pathTheme + '/stylesheets/*.scss';

var dist = {}
    dist.path = './dist';
    dist.pathAssets = './dist/assets';

    dist.fonts = dist.pathAssets + '/fonts';
    dist.images = dist.pathAssets + '/img';
    dist.javascripts = dist.pathAssets + '/js';
    dist.stylesheets = dist.pathAssets + '/css';
    dist.views = dist.pathAssets + '/views';

gulp.task('views:popup', function () {
    return gulp.src(src.popupViews)
    .pipe(gulp.dest(dist.views))
});

gulp.task('stylesheets:main', function () {
    return gulp.src(src.themeStylesheetsMain)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass.sync({includePaths: bourbon}))
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({prefix: package.name + '-'}))
    .pipe(replace('@charset "UTF-8";', ''))
    .pipe(replace(';', ' !important;'))
    .pipe(replace('.css") !important;', '.css");'))
    .pipe(gulp.dest(dist.stylesheets))
    .pipe(replace('.css', '.min.css'))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist.stylesheets))
});

gulp.task('stylesheets:fonts', function () {
    return gulp.src(src.themeStylesheetsFonts)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass.sync({includePaths: bourbon}))
    .pipe(rename({basename: package.name + '-fonts'}))
    .pipe(gulp.dest(dist.stylesheets))
    .pipe(csso())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist.stylesheets))
});

gulp.task('javascripts', function() {
    return gulp.src(src.themeJavascripts)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat(package.name + '.js'))
    .pipe(gulp.dest(dist.javascripts))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist.javascripts))
});

gulp.task('javascripts:popup', function() {
    return gulp.src(src.popupJavascripts)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(concat('popup.js'))
    .pipe(gulp.dest(dist.javascripts))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist.javascripts))
});

gulp.task('javascripts:background', function() {
    return gulp.src(src.backgroundJavascripts)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulp.dest(dist.javascripts))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dist.javascripts))
});

gulp.task('images', function() {
    return gulp.src(src.themeImages)
    .pipe(imagemin())
    .pipe(gulp.dest(dist.images));
});

gulp.task('fonts', function() {
    return gulp.src(src.themeFonts)
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

gulp.task('manifest:build', function() {
    return gulp.src(src.manifest)
    .pipe(replace('{{package.title}}', package.title))
    .pipe(replace('{{package.description}}', package.description))
    .pipe(replace('{{package.version}}', package.version))
    .pipe(replace('{{package.author}}', package.author))
    .pipe(replace(package.name + '.css', package.name + '.min.css'))
    .pipe(replace('.js', '.min.js'))
    .pipe(gulp.dest(dist.path))
});

gulp.task('popup:production', function() {
    return gulp.src(dist.views + '/popup.html')
    .pipe(replace('.js', '.min.js'))
    .pipe(gulp.dest(dist.views))
});

gulp.task('bump', function(){
    gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('zip', function () {
    return gulp.src(dist.path + '**/**/*')
    .pipe(zip(package.name + '-' + package.version + '-dist.zip'))
    .pipe(gulp.dest(dist.path));
});

gulp.task('clean', function (cb) {
    del([dist.path], cb);
});

gulp.task('clean:build', function (cb) {
    del([
        dist.stylesheets + '/' + package.name + '-light.css',
        dist.stylesheets + '/' + package.name + '-dark.css',
        dist.javascripts + '/' + package.name + '.js',
        dist.javascripts + '/' + 'popup.js',
        dist.javascripts + '/' + 'event.js'
    ], cb);
});

gulp.task('default', function (cb) {
    sequence(
        'clean',
        [
            'views:popup',
            'stylesheets:main',
            'stylesheets:fonts',
            'javascripts',
            'javascripts:popup',
            'javascripts:background',
            'images',
            'fonts',
            'manifest'
        ],
        cb
    );
    gulp.watch(src.manifest, ['manifest']);
    gulp.watch(src.backgroundJavascripts, ['javascripts:background']);
    gulp.watch(src.popupJavascripts, ['javascripts:popup']);
    gulp.watch(src.popupViews, ['views:popup']);
    gulp.watch(src.themeFonts, ['fonts']);
    gulp.watch(src.themeImages, ['images']);
    gulp.watch(src.themeJavascripts, ['javascripts']);
    gulp.watch(src.themeStylesheets, ['stylesheets:main', 'stylesheets:fonts']);
});

gulp.task('build', function(cb) {
    sequence(
        'clean',
        [
            'views:popup',
            'stylesheets:main',
            'stylesheets:fonts',
            'javascripts',
            'javascripts:popup',
            'javascripts:background',
            'images',
            'fonts',
            'manifest:build'
        ],
        'popup:production',
        'clean:build',
        'zip',
        cb
    );
});
