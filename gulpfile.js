/**
 * Created by untung on 1/19/15.
 */
var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    mochaTest = require('gulp-mocha'),
    runSequence = require('run-sequence');

gulp.task('minify', function(){
    return gulp.src(['src/*.js'])
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function(callback){
   del(['build'], callback);
});

gulp.task('test', function(){
    return gulp.src('test/*Test.js')
        .pipe(mochaTest());
});

gulp.task('build', function(callback){
    runSequence('clean', 'minify', 'test', callback);
})

gulp.task('default', function(){
    gulp.start('build');
});