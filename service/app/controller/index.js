"use strict";

const Controller = require("egg").Controller;
const fs = require('fs');

const Util = require("../util/index");

class index extends Controller {
  //注册方法
  async register() {
    let query = this.ctx.request.body;
    let account = query.account;
    let password = query.password;
    const { ctx } = this;
    const Md5 = Util.Md5();
    try {
      const user = await this.app.mysql.get("user", { account: account });
      if (user) {
        if (user.password === Md5.update(password).digest("hex")) {
          ctx.body = {
            status: 200,
            message: "登录成功",
            data: user,
          };
          return;
        }
        ctx.body = {
          status: 401,
          message: "账号或密码错误",
          data: [],
        };
        return;
      }
      await this.app.mysql.insert("user", {
        account: account,
        password: Md5.update(password).digest("hex"),
      });
      ctx.body = {
        status: 200,
        message: "注册成功",
        data: {
          account: account,
          name: "新用户",
          city: "中国",
        },
      };
    } catch (error) {
      ctx.body = error;
    }
  }

  async uploadImage() {
    console.log(this.ctx.request);
    var file = this.ctx.request.files[0];
    var name = file.filename;
    var dist = "app/public/upload/" + name;
    let result = await new Promise((resolve, reject) => {
      fs.copyFile(file.filepath, dist, (error) => {
        if (error) {
          reject(error);
          console.log("fail");
        } else {
          resolve(true);
          console.log("success");
        }
      });
    });
    this.ctx.response.body = {
      state: result,
      filename: name,
    };
  }
}
module.exports = index;
