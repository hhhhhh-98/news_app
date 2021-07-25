'use strict';

const Controller = require('egg').Controller;

class index extends Controller {
  async index() {
    // eslint-disable-next-line no-undef
    const { ctx } = this;
    const user = await this.app.mysql.get('crud_test', { name: 'huang' });
    ctx.body = user;
  }
}
module.exports = index;
