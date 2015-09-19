var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    minifyHTML = require('gulp-minify-html'),
    spawn = require('child_process').spawn,
    gutil = require('gulp-util');



/** Major Tasks **/

// Default
gulp.task('default', ['build', 'connect'], function () {
    gulp.watch(['src/app.js','src/config.js','src/js/**/*.*js'], ['js']);
    gulp.watch(['src/html/**/*.html'], ['html']);
    gulp.watch(['src/css/**/*.*scss'], ['css']);
    gulp.watch(['bower_components', 'index.html'], ['copy']);
    gulp.watch(['index.html', 'dist/**/**.*'], function (event) {
        return gulp.src(event.path)
            .pipe($.connect.reload());
    });
});

gulp.task('parse', ['build', 'parse-no-build'], function(){

});

// can be inserted as dependency after a build task
gulp.task('parse-no-build', function(){
  gulp.src('dist/**')
  .pipe(gulp.dest('parse/public'));
});


/** Sub Tasks **/

// Build
gulp.task('build', ['js', 'html', 'css', 'copy']);

// JS
gulp.task('js', function () {
    gulp.src(['src/js/base/Class.js', 'src/js/base/*', 'src/app.js','src/config.js', 'src/js/**/*.*js'])
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.concat('app.js'))
        .pipe($.ngAnnotate())
        // .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

// HTML
gulp.task('html', function () {
    gulp.src('src/html/partials/**/*.*html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/partials'));
});

// CSS
gulp.task('css', function () {
        $.rubySass('src/css/main.scss', {quiet: true})
        .pipe($.autoprefixer("last 2 versions", "> 1%"))
        .pipe(gulp.dest('dist/css'));
});

// Copy
gulp.task('copy', function () {
    gulp.src([
        'bower_components/angular/angular.min.*',
        'bower_components/angular-cookies/angular-cookies.min.*',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-animate/angular-animate.min.*',
        'bower_components/angular-materialize/src/angular-materialize.*',
        'bower_components/angular-animate/angular-animate.min.*'
    ]).pipe(gulp.dest('dist/bower_components'));

    gulp.src(['fonts/**/**']).pipe(gulp.dest('dist/font'));
    gulp.src(['index.html']).pipe(gulp.dest('dist'));
    gulp.src(['images/**/**']).pipe(gulp.dest('dist/images'));

    // copy static address json file
    gulp.src(['src/addresses.json']).pipe(gulp.dest('dist'));
});


// Connect  - Port 8002
gulp.task('connect', function () {
    $.connect.server({
        root: [__dirname + "/dist"],
        port: 8002,
        livereload: {port: 2983}
    });
});
