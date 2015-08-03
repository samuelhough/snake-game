process.on('uncaughtException', console.log)

var _src = __dirname + "/src/"
var _public = __dirname + "/public"


var browserify    = require('gulp-browserify'),
    gulp          = require('gulp'),
    stylus        = require('gulp-stylus'),
    clean         = require('gulp-clean'),
    runSequence   = require('run-sequence'),
    uglify        = require('gulp-uglify'),
    watch         = require('gulp-watch'),
    batch         = require('gulp-batch'),
    cssmin        = require('gulp-cssmin'),
    nib           = require('nib');




// Clean up public folder
gulp.task('clean', function () {
    return gulp.src(_public, {read: false})
      .pipe(clean());
});

// Build javascript
gulp.task('scripts', function() {
    // Single entry point to browserify 
    return gulp.src(_src + '/application.js')
    .pipe(browserify({
      debug : !gulp.env.production,
      transform: ['reactify']
    }))
    // .pipe(uglify())
    .pipe(gulp.dest(_public + '/js/'))
});

// Build Styles
gulp.task('styles', function(){
  return gulp.src(_src + '/styles/app.styl')
  .pipe(stylus({
    'include css': true,
    use: nib(),
    compress: true
  }))
  .pipe(cssmin())
  .pipe(gulp.dest(_public + '/css'));
});

// Copy index file to public folder
gulp.task('copyIndex', function(){
  return gulp.src(_src + '/index.html')
    .pipe(gulp.dest(_public));
});

// Copy assets folder from source location to public folder
gulp.task('copyAssets', function(){
  return gulp.src(_src + '/assets/**/*')
    .pipe(gulp.dest(_public));
});

// Build files
gulp.task('build', function(){
  runSequence('scripts', 'styles', 'copyIndex', 'copyAssets');
});

gulp.task('cleanbuild', function(){
  runSequence('clean', 'build');
});

// Main task.  Perform initial build and then watch 
gulp.task('watch', function(){
  gulp.start('cleanbuild');
  watch(_src + '/**/*.*', batch(function (events, done) {
      gulp.start('build', done);
  }));
})