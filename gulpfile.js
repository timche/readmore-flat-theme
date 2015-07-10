var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var bourbon = require('node-bourbon').includePaths;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var package = require('./package.json');

gulp.task('manifest', function() {
    return gulp.src('src/manifest.json')
    .pipe(replace('{{package.title}}', package.title))
    .pipe(replace('{{package.description}}', package.description))
    .pipe(replace('{{package.version}}', package.version))
    .pipe(replace('{{package.author}}', package.author))
    .pipe(gulp.dest('dist'))
});

gulp.task('css', function () {
    return gulp.src('src/scss/main.scss')
    .pipe(sass({
        includePaths: bourbon
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(replace(';', ' !important;'))
    .pipe(rename({
        basename: 'readmore-flat-theme'
    }))
    .pipe(minifyCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('js', function() {
    return gulp.src([
        'src/js/vendor/*js',
        'src/js/*.js'
    ])
    .pipe(concat('readmore-flat-theme.js'))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('default', ['manifest', 'css', 'js'], function () {
    gulp.watch("src/manifest.json", ['manifest']);
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/**/*.js", ['js']);
});
