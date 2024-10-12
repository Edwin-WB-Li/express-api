const express = require('express')
const mongoose = require('mongoose');
// const next = require('next')
const bodyParser = require('body-parser');
const path = require('path')
const cors = require('cors');
const ora = require('ora');
const chalk = require('chalk')

const spinner = ora({
  text: 'Service running...',
  spinner: 'dots'
}).start();

// 引入swagger
const swaggerInstall = require('./swagger')
// 导入用户路由
const version = '/api/v1'
const goodsRouter = require('./routes/goods');
const usersRouter = require('./routes/users');
// const uploadRouter = require('./routes/upload1');
const filesdRouter = require('./routes/files');
const menusRouter = require('./routes/menus');
const dictionariesRouter = require('./routes/dictionaries');
const districtsRouter = require('./routes/districts');
const verificationCodeRouter = require('./routes/verificationCode');
const commentsRouter = require('./routes/comments');

const port = process.env.PORT || 3000;
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({
//   dev
// })
// const handle = app.getRequestHandler()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/node'; // 替换为你的MongoDB连接字符串
mongoose.connect(MONGODB_URI)
  .then(() => spinner.succeed(chalk.green(`MongoDB连接成功: Connected to MongoDB with Mongoose`)))
  .catch(err => spinner.fail(chalk.red('MongoDB连接失败:', err)))

const server = express()

// 在其他中间件之前启用CORS
server.use(cors({
  origin: ['https://next-express-project-lake.vercel.app','http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 明确列出允许的方法
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// server.use(express.static(path.resolve(__dirname, `static`)));
// 设置静态文件目录，并指定路径前缀
server.use('/static', express.static(path.resolve(__dirname, 'static')));

// app.prepare().then(() => {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({
    extended: true
  }));

  // 全局错误处理中间件
  server.use((err, _req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack ?? 'Something broke!');
  });

  server.use(`${version}/good`, goodsRouter);
  server.use(`${version}/user`, usersRouter);
  server.use(`${version}/file`, filesdRouter);
  server.use(`${version}/sysPermission`, menusRouter);
  server.use(`${version}/dictionaries`, dictionariesRouter);
  server.use(`${version}/comments`, commentsRouter);
  server.use(`${version}`, districtsRouter);
  server.use(`${version}`, verificationCodeRouter);

  // 注册swagger
  swaggerInstall(server)

  // // 处理 next.js 页面请求
  // server.all('*', (req, res) => {
  //   return handle(req, res)
  // })

  server.listen(port, (err) => {
    if (err) {
      spinner.fail(chalk.red('Error starting server:', err));
      return;
    }
    spinner.succeed(chalk.green(`Ready on http://localhost:${port}`));
  })
// }).catch(err => console.log(err))