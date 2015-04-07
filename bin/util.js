'use strict'

exports.bool = function (str) {
  if (str === void 0) return false
  return str.toLowerCase() === 'true'
}

exports.int = function (str) {
  if (!str) return 0
  return parseInt(str, 10)
}

exports.float = function (str) {
  if (!str) return 0
  return parseFloat(str, 10)
}
