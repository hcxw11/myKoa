const response = {
  set body(value) {
    if (this.res.statusCode === 404) {
      this.res.statusCode = 200;
    }
    this.body = value; // eslint-disable-line
  },
  set status(value) {
    this.res.statusCode = value;
  },
  get status() {
    return this.res.statusCode;
  },
};

module.exports = response;
