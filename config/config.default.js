'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {
    keys: 'jt2018',
    middleware: ['errorHandle', 'saveSession'],
    errorHandle: {
      match: '/api'
    },
  };
  return config;
};

