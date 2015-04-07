'use strict'

var gutil = require('gulp-util')
var prettyHrtime = require('pretty-hrtime')

var startTime

// Provide gulp style logs to the bundle method in browserify.js
module.exports = {
  start: function () {
    startTime = process.hrtime()
    gutil.log('Running', gutil.colors.green("'bundle'") + '...')
  },

  end: function () {
    var taskTime = process.hrtime(startTime)
    var prettyTime = prettyHrtime(taskTime)
    var bundle = gutil.colors.green("'bundle'")
    var time = gutil.colors.magenta(prettyTime)

    gutil.log('Finished', bundle, 'in', time)
  }
}
