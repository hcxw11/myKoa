const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs');

const App = require(`${path.join(process.cwd())}/client/App`);
const staticPath = path.join(process.cwd(), 'public', 'assets');

module.exports = {
  count: function(ctx) {
    try {
      const staticPage = fs.readFileSync(staticPath + '/index.html');
      $ = cheerio.load(staticPage.toString());
      var componentHtml = ReactDOMServer.renderToString(<App initialCount={0} />);
      $('#root').html(componentHtml);
      ctx.body = $.html();
    } catch (e) {
      ctx.status = 500;
      ctx.body = e.stack;
    }
  },
};