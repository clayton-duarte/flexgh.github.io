//SETUP
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
postcss = require('postcss-scss');
pug = require('gulp-pug');
browserSync = require('browser-sync').create();

//TASKS

gulp.task('sass', function () {
    return gulp.src('src/flexgh.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('pug', function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'pug'], function () {
    browserSync.init({
        server: {
            baseDir: "dist",
            serveStaticOptions: {
                extensions: ["html"]
            }
        }
    });
    gulp.watch("src/*.scss", ['sass']);
    gulp.watch("src/*.pug", ['pug']);
    gulp.watch("dist/*.html")
        .on('change', browserSync.reload);
});

gulp.task('default', ['serve']);