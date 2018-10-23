function pathRegexp(path) {
  return new RegExp(`^${path}$`);
}
class Router {
  constructor() {
    this._list = [];
    ['get', 'put', 'delete', 'post'].forEach(method => {
      this._list[method] = [];
      this[method] = function(path, action) {
        this._list[method].push([pathRegexp(path), action]);
      };
    });
  }
  matchPath(pathname, method) {
    const routers = this._list[method];
    let handler;
    routers.some(router => {
      const [reg, action] = router;
      if (reg.test(pathname)) {
        handler = action;
        return true;
      }
    });
    return handler;
  }
}

module.exports = Router;
