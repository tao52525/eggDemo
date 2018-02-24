'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {
    keys: 'jt2018',
    middleware: ['errorHandle', 'saveSession'],
    errorHandle: {
      match: '/api'
    },
    redis: {
      clients: {
        foo: {                 // instanceName. See below
          port: 6379,          // Redis port
          host: '127.0.0.1',   // Redis host
          password: 'auth',
          db: 0,
        },
        bar: {
          port: 6379,
          host: '127.0.0.1',
          password: 'auth',
          db: 1,
        },
      }
    }
  };
  return config;
};

