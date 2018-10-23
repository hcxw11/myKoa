const context = {};

function defineGetter(prop, name) {
  // eslint-disable-next-line
  context.__defineGetter__(name, () => {
    return this[prop][name];
  });
}
function defineSetter(prop, name) {
  // eslint-disable-next-line
  context.__defineSetter__(name, value => {
    this[prop][name] = value;
  });
}

defineGetter('response', 'body');
defineSetter('response', 'body');
defineGetter('request', 'method');
defineGetter('request', 'path');

module.exports = context;
