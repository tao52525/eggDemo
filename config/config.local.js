'use strict';

module.exports = {
  // 不做csrf校验
  security: {
    csrf: {
      enable: false,
    }
  },

  mysql: {
    client: {
      host: '10.202.45.31',
      port: '3306',
      user: 'fswy',
      password: 'passwd123',
      database: 'fswysit'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }
}