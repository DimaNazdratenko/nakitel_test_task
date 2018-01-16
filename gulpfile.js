let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sort = require('gulp-sort'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

let paths = {
    blocks: 'blocks/',
    devDir: 'app/',
    root: './'
};

/**********************************
 Developer tasks
 **********************************/

//pug compile
gulp.task('pug', function () {
    return gulp.src([paths.blocks + '*.pug', '!' + paths.blocks + 'template.pug'])
        .pipe(plumber())
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(paths.devDir))
        .pipe(browserSync.stream());
});

//sass compile
gulp.task('sass', function () {
    return gulp.src([paths.blocks + '*.sass', paths.blocks + '*.scss'])
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 3 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(paths.devDir + 'css/'))
        .pipe(browserSync.stream());
});

//js compile
gulp.task('js', function () {
    return gulp.src([paths.blocks + '**/*.js'])
        .pipe(sort())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.devDir + 'js/'))
        .pipe(browserSync.stream());
});

//watch
gulp.task('watch', function () {
    gulp.watch(paths.blocks + '**/*.pug', ['pug']);
    gulp.watch([paths.blocks + '**/*.sass', paths.blocks + '**/*.scss'], ['sass']);
    gulp.watch([paths.blocks + '**/*.js'], ['js']);
});

//server
gulp.task('browser-sync', function () {
    browserSync.init({
        browser: "google chrome",
        port: 3000,
        server: {
            baseDir: paths.devDir
        }
    });
});

//img min
gulp.task('img', function () {
    return gulp.src('blocks/assets/img/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/assets/img'))
});

//default
gulp.task('default', ['browser-sync', 'watch', 'pug', 'sass', 'js']);