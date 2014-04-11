var harp = require('harp');

harp.server(__dirname, { port: process.env.PORT || 5000 });