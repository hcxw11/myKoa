const url = require('url');

const context = {};

function defineGetter(prop, name) {
  context.__defineGetter__(name, function() {
    return this[prop][name];
  });
}
function defineSetter(prop, name) {
  context.__defineSetter__(name, function(value) {
    this[prop][name] = value;
  });
}

defineGetter('response', 'body');
defineSetter('response', 'body');
defineGetter('request', 'method');
defineGetter('request', 'path');

module.exports = context;
