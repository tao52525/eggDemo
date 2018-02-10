'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async queryUser(req) {
    const user = await this.app.mysql.get('wx_user_bak', req);
    return { user }
  }

  async addUser(req) {
    const result = await this.app.mysql.insert('wx_user_bak', req);
    return result;
  }
}

module.exports = UserService;