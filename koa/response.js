const response = {
  get body() {
    return this._body; // eslint-disable-line
  },
  set body(value) {
    if (this.res.statusCode === 404) {
      this.res.statusCode = 200;
    }
    this._body = value; // eslint-disable-line
  },
  set status(value) {
    this.res.statusCode = value;
  },
  get status() {
    return this.res.statusCode;
  },
};

module.exports = response;
