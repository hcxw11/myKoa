const path = require('path');
const send = require('send');

const staticPath = path.join(process.cwd(), 'public');

module.exports = async (ctx, next) => {
  if (ctx.path.includes('assets')) {
    // 先取到客户端想要的是文件或文件夹路径
    const filePath = path.join(staticPath, ctx.path); // 服务器上的对应服务器物理路径
    try {
      ctx.status = 200;
      await send(ctx.req, filePath).pipe(ctx.res);
    } catch (e) {
      ctx.throw('文件解析失败', 500);
    }
  } else {
    next();
  }
};
