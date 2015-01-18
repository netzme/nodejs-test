/**
 * Created by untung on 1/19/15.
 */
var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('build', function(){
    return gulp.src('src/*.js')
        .pipe(rename({suffix: '-gulp.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task('clean', function(callback){
   del(['build/*-gulp.min.js'], callback);
});

gulp.task('default', ['clean'], function(){
    gulp.start('build');
})