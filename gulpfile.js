// Include Gulp
var gulp = require('gulp');

// Include Plugins
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');

// Init BrowserSync
gulp.task('browserSync', function() {
    browserSync.init({ server: { baseDir: '' } });
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src('css/scss/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('custom.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({ stream: true }));
});

// Lint JS
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Watch Files For Changes
gulp.task('watch', ['browserSync', 'sass', 'lint'], function() {
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('css/scss/**/*.scss', ['sass', browserSync.reload]);
    gulp.watch('js/*.js', ['lint', browserSync.reload]);
});

// Default Task
gulp.task('default', ['watch']);
