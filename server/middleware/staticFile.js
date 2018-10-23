const fs = require('fs');
const path = require('path');
var send = require('send');

const staticPath = path.join(process.cwd(), 'public');

module.exports = function(ctx, next) {
  if (ctx.path.includes('assets')) {
    //先取到客户端想要的是文件或文件夹路径
    let filePath = path.join(staticPath, ctx.path); //服务器上的对应服务器物理路径
    try {
      const stream = send(ctx.req, filePath).pipe(ctx.res);
      ctx.response.status = 200;
    } catch (e) {
      throw new Error('文件解析失败');
    }
  } else {
    next();
  }
};
