//SETUP
var gulp = require('gulp'),
    pug = require('gulp-pug');
    data = require('gulp-data');
    swig = require('gulp-swig');
    jsonfile = require('jsonfile')
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    browserSync = require('browser-sync').create();

var myjson = 'src/includes/data.json';
function getJsonData (file) {
    return jsonfile.readFileSync(file);
};

//TASKS
gulp.task('sass', function () {
    return gulp.src('src/flexgh.sass')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('pug', ['sass'] , function buildHTML() {
    return gulp.src('src/*.pug')
        .pipe(data(getJsonData(myjson)))
        .pipe(swig())
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['pug'], function () {
    browserSync.init({
        server: {
            baseDir: "dist",
            serveStaticOptions: {
                extensions: ["html"]
            }
        }
    });
    gulp.watch("src/**/*.*", ['pug']);
    gulp.watch("dist/*.*")
        .on('change', browserSync.reload);
});

gulp.task('default', ['serve']);