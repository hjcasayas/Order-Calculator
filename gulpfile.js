// Variable Initilization
var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');

// Tasks
gulp.task('default', function(){
  console.log('Horray!');
});

gulp.task('watch', function(){
  
  watch('./app/assets/styles/**/*.css', styles);
  watch('./app/temp/styles/styles.css', css_inject);

  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function(){
    browserSync.reload();
  });

});

// Functions
function styles() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, hexrgba, nested, autoprefixer]))
		.on('error', function(errorInfo){
			console.log(errorInfo.toString());
			this.emit('end');
    })    
    .pipe(gulp.dest('./app/temp/styles'));
}

function css_inject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}