var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    bourbon = require('node-bourbon').includePaths,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

gulp.task('manifest', function() {
    return gulp.src('src/manifest.json')
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
    .pipe(gulp.dest('dist/assets/css'))
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
    .pipe(gulp.dest('dist/assets/js'))
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
