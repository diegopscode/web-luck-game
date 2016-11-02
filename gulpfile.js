var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var del = require('del');
var browserSync = require('browser-sync').create();

var paths = {

  scripts: [
      'src/scripts/**/*.js'
      ],

  sass: 'src/sass/**/*.sass'

};

/**
 * Limpar todos os arquivos build
 */
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['public/build']);
});

/**
 * Concatena todos os scripts JS
 */
gulp.task('scripts', function() {

  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/build/js'));

});

/**
 * Compila os styles Sass
 */
gulp.task('sass', function() {

  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public/build/css'));

});

/**
 * Task default
 */
gulp.task('default', ['scripts', 'sass']);

/**
 * Event de Watch
 */
gulp.task('watch', ['sass', 'scripts'],function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.sass, ['sass']);
});

/**
 * Start server com task watch
 */
gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.sass, ['sass']).on('change', browserSync.reload);
    gulp.watch("index.html").on('change', browserSync.reload);
});