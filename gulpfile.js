var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    bourbon = require('node-bourbon').includePaths,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace');

gulp.task('css', function () {
    return gulp.src('src/styles/main.scss')
    .pipe(sass({
        includePaths: bourbon
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(replace(';', ' !important;'))
    .pipe(minifyCSS())
    .pipe(rename({
        basename: 'readmore-flat',
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist/assets/css'))
});

gulp.task('js', function() {
    return gulp.src([
        'src/scripts/vendor/*js',
        'src/scripts/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({
        basename: 'readmore-flat',
        suffix: '.min'
    }))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('default', ['css', 'js'], function () {
    gulp.watch("src/styles/**/*.scss", ['css']);
    gulp.watch("src/scripts/**/*.js", ['js']);
});
