const http = require('http');
const EventEmitter = require('events');
const convert = require('koa-convert');

const context = require('./context');
const request = require('./request');
const response = require('./response');

function compose(middlewares, ctx) {
  const dispatch = index => {
    if (index === middlewares.length) {
      return Promise.resolve();
    }
    const fn = middlewares[index];
    if (!fn) return Promise.resolve();
    return new Promise((resolve, reject) => {
      try {
        resolve(fn(ctx, dispatch.bind(null, index + 1)));
      } catch (e) {
        reject(e);
      }
    });
  };
  return dispatch(0);
}

class Koa extends EventEmitter {
  constructor() {
    super();
    this.middlewares = [];
    this.context = context;
    this.request = request;
    this.response = response;
  }

  use(fn) {
    let middleware = fn;
    if (typeof fn !== 'function') {
      throw new Error('middleware must be a function!');
    }
    // 如果使用generator函数，使用co库转化
    if (fn.constructor.name === 'GeneratorFunction') {
      middleware = convert(fn);
    }
    this.middlewares.push(middleware);
  }

  /* eslint-disable */
  createContext(req, res) {
    // 使用Object.create方法是为了继承this.context但在增加属性时不影响原对象
    const ctx = Object.create(this.context);
    const request = (ctx.request = Object.create(this.request));
    const response = (ctx.response = Object.create(this.response));

    ctx.req = request.req = response.req = req;
    ctx.res = request.res = response.res = res;
    request.ctx = response.ctx = ctx;
    request.response = response;
    response.request = request;
    return ctx;
  }
  /* eslint-enable */

  async handleRequest(req, res) {
    res.statusCode = 404;
    const ctx = this.createContext(req, res);
    const middlewares = this.middlewares.slice();

    // 设置路由访问
    if (this.router) {
      const action = this.router.matchPath(ctx.path, ctx.method.toLowerCase());
      middlewares.push(action);
    }

    try {
      await compose(
        middlewares,
        ctx
      );
    } catch (e) {
      const { stack } = e;
      ctx.body = stack;
      console.log(stack);
      ctx.response.status = 500;
    }

    if (typeof ctx.body === 'object') {
      // 如果是对象
      res.setHeader('Content-Type', 'application/json;charset=utf8');
      res.end(JSON.stringify(ctx.body));
    } else if (typeof ctx.body === 'string' || Buffer.isBuffer(ctx.body)) {
      res.setHeader('Content_Type', 'text/html;charset=utf8');
      res.end(ctx.body);
    } else if (ctx.status === 404) {
      res.end('Not found');
    }
  }

  listen(...args) {
    // 放入上面的回调
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
    return server;
  }
}
module.exports = Koa;
