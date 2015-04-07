'use strict'

/**
 * @fileOverview
 * Watch Task
 * Run setWatch & browser-sync tasks, compiles less when less files change
 */

var gulp = require('gulp')

gulp.task('watch', ['setWatch', 'browserSync'], function () {
  // Note: The browserify task handles js recompiling with watchify
  gulp.watch('./app/**.scss', ['sass'])
})
