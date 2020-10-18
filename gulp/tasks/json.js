const gulp = require('gulp');
const jsonminify = require('gulp-jsonminify');

module.exports = function json() {
  return gulp.src('src/json/**/*.json')
    .pipe(jsonminify())
    .pipe(gulp.dest('build/json'));
}

