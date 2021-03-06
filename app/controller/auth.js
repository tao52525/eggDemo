'use strict'
const Controller = require('egg').Controller;

class AuthController extends Controller {
  async register() {
    const { ctx, service } = this;
    let req = ctx.request.body;
    const createRule = {
      jobcard: {type: 'string', required: true},
      username: {type: 'string', required: true},
      password: {type: 'string', required: true},
      repassword: {type: 'string', required: true}
    };
    if (req.password === req.repassword) {
      ctx.validate(createRule);
      delete req.repassword;
      const result = await service.auth.register(req);
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
    } else {
      ctx.body = {
        code: '2',
        msg: '密码输入不一致',
        status: false
      }
    }
  }

  async login() {
    const { ctx, service, app } = this;
    let req = ctx.request.body;
    const createRule = {
      jobcard: {type: 'string', required: true},
      password: {type: 'string', required: true}
    };
    ctx.validate(createRule);
    const result = await service.auth.login(req);
    if (result) {
      ctx.session.userInfo = {
        id: result.id,
        jobcard: result.jobcard,
        username: result.username,
      }
      await app.redis.get('foo').set('userInfo', JSON.stringify({
        id: result.id,
        jobcard: result.jobcard,
        username: result.username,
      }))
      let userInfo = await app.redis.get('foo').get('userInfo')
      console.log('===redis--get===', userInfo)
      ctx.body = {
        code: 0,
        msg: 'OK',
        status: true,
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '用户名或者密码错误',
        status: false,
      }
    }
  }

  async logout() {
    const { ctx, app } = this;
    ctx.session.userInfo = null;
    ctx.body = {
      code: 0,
      msg: 'OK',
      status: true,
    }
    let userInfo = await app.redis.get('userInfo')
    console.log('===redis--gget===', userInfo, JSON.parse(userInfo).id)
    await app.redis.set('userInfo', null)
  }
};

module.exports = AuthController;