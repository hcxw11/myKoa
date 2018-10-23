## 说明

模仿 koa 制作一个简易后端框架，功能如下：

- [ ] 模仿koa框架
- [ ] 路由控制
- [ ]  react后端渲染


## 目录结构

```
├── client	// 放置react组件
│   ├── App.js
│   └── entry.js
├── index.html	// HtmlWebpackPlugin使用的模板
├── koa	// 模仿的koa框架
│   ├── application.js
│   ├── context.js
│   ├── request.js
│   └── response.js
├── package.json
├── public	// react组件编译输出后的路径
│   └── assets
│       ├── index.html
│       ├── main.js
│       ├── runtime.js
│       └── vendors.js
├── server	// 服务端相关
│   ├── controller	// 路由执行
│   │   ├── home.js
│   │   └── react.js
│   ├── index.js	// 服务器启动主入口
│   ├── middleware	// 中间件
│   │   └── staticFile.js
│   └── router.js
├── webpack.config.js
├── yarn-error.log
└── yarn.lock
```

## 关于koa

