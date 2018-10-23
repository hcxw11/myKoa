const context = {
  throw(errorMsg, errorCode) {
    this.body = errorMsg;
    this.status = errorCode;
  },
};

function defineGetter(prop, name) {
  // eslint-disable-next-line
  context.__defineGetter__(name, function() {
    return this[prop][name];
  });
}
function defineSetter(prop, name) {
  // eslint-disable-next-line
  context.__defineSetter__(name, function(value) {
    this[prop][name] = value;
  });
}

defineGetter('request', 'method');
defineGetter('request', 'path');
defineGetter('response', 'status');
defineGetter('response', 'body');

defineSetter('response', 'body');
defineSetter('response', 'status');

module.exports = context;
