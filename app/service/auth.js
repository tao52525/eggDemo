'use strict'
const Service = require('egg').Service;

class AuthService extends Service {
  async register(req) {
    const result = await this.app.mysql.insert('wx_user_bak', req);
    return result;
  }

  async login(req) {
    const result = await this.app.mysql.get('wx_user_bak', req);
    return result;
  }

}

module.exports = AuthService