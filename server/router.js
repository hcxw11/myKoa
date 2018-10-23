function pathRegexp(path) {
  return new RegExp(`^${path}$`);
}
class Router {
  constructor() {
    this.list = [];
    ['get', 'put', 'delete', 'post'].forEach(method => {
      this.list[method] = [];
      this[method] = (path, action) => {
        this.list[method].push([pathRegexp(path), action]);
      };
    });
  }

  matchPath(pathname, method) {
    const routers = this.list[method];
    let handler;
    routers.some(router => {
      const [reg, action] = router;
      if (reg.test(pathname)) {
        handler = action;
        return true;
      }
      return false;
    });
    return handler;
  }
}

module.exports = Router;
