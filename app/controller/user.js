'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async queryUser() {
    const {ctx, service} = this;
    const req = ctx.request.body;
    const createRule = {
      jobcard: {type: 'string'}
    };
    ctx.validate(createRule);
    const result = await service.user.queryUser(req);
    if (result.user) {
      ctx.body = {
        result: result.user,
        code: '1',
        msg: 'OK',
        status: true
      };
    } else {
      ctx.body = {
        result: null,
        code: '0',
        msg: 'can\'t find this one',
        status: false
      };
    }
    ctx.status = 201;
  }

  async addUser() {
    const {ctx, service} = this;
    const req = ctx.request.body;
    const createRule = {
      jobcard: {type: 'string', required: true},
      username: {type: 'string', required: true},
      password: {type: 'string', required: true},
      role: {type: 'string'},
      sex: {type: 'enum', values:["0", "1"]}
    };
    ctx.validate(createRule);
    const result = await service.user.addUser(req);
    if (result.affectedRows === 1) {
      ctx.body = {
        code: '1',
        msg: 'OK',
        status: true
      }
    } else {
      ctx.body = {
        code: '1',
        msg: result,
        status: false
      }
    }
    ctx.status = 201;
  }
}

module.exports = UserController;