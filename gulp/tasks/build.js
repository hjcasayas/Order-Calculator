// VARIABLE INITIALIZATION

var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

// TASKS
gulp.task('build', gulp.series('styles', 'scripts', deleteDistFolder, gulp.parallel(optimizeImages, copyIndex)));

gulp.task('previewDist', function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

// FUNCTIONS

// Optimize Images

function copyIndex() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function(){return rev()},function(){return cssnano()}],
      js: [function(){return rev()}, function(){return uglify()}],

    }))
    .pipe(gulp.dest('./docs'));
}

function deleteDistFolder() {
  return del('./docs');
}

function optimizeImages() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/**/*_size.jpg'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest('./docs/assets/images'));
}