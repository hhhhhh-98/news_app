"use strict";

const Controller = require("egg").Controller;
const fs = require("fs");

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

  //重置密码
  async resetpassword() {
    let query = this.ctx.request.body;
    let account = query.account;
    let password = query.password;
    const { ctx } = this;
    const Md5 = Util.Md5();
    try {
      await this.app.mysql.update(
        "user",
        {
          password: Md5.update(password).digest("hex"),
        },
        { where: { account: account } }
      );
      ctx.body = {
        status: 200,
        message: "修改密码成功",
        data: {},
      };
    } catch (error) {
      ctx.body = error;
    }
  }

  //上传图片
  async uploadImage() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = +new Date().getTime() + file.filename;
    const dist = 'app/public/upload/' + name;
    const img = fs.readFileSync(file.filepath);
    fs.writeFileSync(dist, img);
    ctx.response.body = {
      status: 200,
      fileName: name,
    };
  }

  //获取图片
  async getImg() {
    const { ctx } = this;
    const url = 'app/public/upload/' + ctx.query.img; 
    console.log(url);
    ctx.set('content-type', 'image/jpeg')
    ctx.body = fs.createReadStream(url);
  }

  //修改个人信息
  async updateUser() {
    const { ctx } = this;
    const query = ctx.request.body;
    const user = query.user;
    const account = user.account;
    this.app.mysql.update(
      'user',
      user
      ,
      { where: { account: account } }
    );
    ctx.body = {
      status: 200,
      user: user,
    }
  }

  //提交反馈
  async insertFeedBack() {
    const { ctx } = this;
    const query = ctx.request.body;
    const account = query.account;
    const title = query.title;
    const description = query.description;
    await this.app.mysql.insert("feedback", {
      account: account,
      title: title,
      description: description
    });
    ctx.body = {
      status: 200,
      message: '上传成功',
    };
  }

  //获取评论
  async getComment() {
    const { ctx } = this;
    const query = ctx.request.body;
    const newsid = query.newsid;
  
    const comment = await this.app.mysql.select(
      'comment'
      ,
      { newsid: newsid } 
    );
    ctx.body = {
      status: 200,
      data: comment,
    }
  }

  //添加评论
  async addComment() {
    const { ctx } = this;
    const query = ctx.request.body;
    const newsid = query.newsid;
    const headImg =query.headImg;
    const account = query.account;
    const content = query.content;
    const time = query.time;
    await this.app.mysql.insert(
      'comment',
      { 
        newsid: newsid,
        headImg: headImg,
        account: account,
        content: content,
        time: time
      }
    );
    ctx.body = {
      status: 200,
      data: [],
      message:'提交成功'
    }
  }


}
module.exports = index;
