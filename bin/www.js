'use strict'

var logger = require('logfmt')
var express = require('express')
var path = require('path')
var config = require('./config')

logger.log({
  type: 'info',
  msg: 'server started, listening on port: ' + config.server.port
})

var app = express()

var publicDir = path.resolve(__dirname, '..', 'app')

// Mount Client
app.use('/', express.static(publicDir))
app.listen(config.server.port)
