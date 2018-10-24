const context = {
  throw(errorMsg, errorCode) {
    this.body = errorMsg;
    this.status = errorCode;
  },
};

function defineGetter(prop, name) {
  Object.defineProperty(context, name, {
    get() {
      return this[prop][name];
    },
    configurable: true,
  });
}
function defineSetter(prop, name) {
  Object.defineProperty(context, name, {
    set(value) {
      this[prop][name] = value;
    },
    configurable: true,
  });
}

defineGetter('request', 'method');
defineGetter('request', 'path');
defineGetter('response', 'status');
defineGetter('response', 'body');

defineSetter('response', 'body');
defineSetter('response', 'status');

module.exports = context;
