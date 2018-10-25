const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs');

const App = require('../../client/App');

const staticPath = path.join(process.cwd(), 'public', 'assets');

module.exports = {
  count(ctx) {
    try {
      // 读取生成的html文件
      const staticPage = fs.readFileSync(`${staticPath}/index.html`);
      // 解析html
      const $ = cheerio.load(staticPage.toString());
      // 获取组件的html
      const componentHtml = ReactDOMServer.renderToString(<App initialCount={0} />);
      // 插入到<div id="root"></div>
      $('#root').html(componentHtml);
      // 输出html
      ctx.body = $.html();
    } catch (e) {
      ctx.throw(e.stack, 500);
    }
  },
};
