'use strict'

var util = require('./util')

module.exports = {
  env: process.env.NODE_ENV || 'development',
  url: '',
  secret: process.env.SESSION_SECRET || 'myPrecious',
  verbose: util.bool(process.env.VERBOSE) || false,
  cache: util.bool(process.env.VIEW_CACHE) || true,
  server: {
    host: '0.0.0.0',
    port: util.int(process.env.PORT) || 4302
  }
}
