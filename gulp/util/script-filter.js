'use strict'

var path = require('path')

// Prevent accidental inclusion of hidden files
module.exports = function (name) {
  return /(\.(js|coffee)$)/i.test(path.extname(name))
}
