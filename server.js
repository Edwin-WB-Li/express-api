const express = require('express');
const mongoose = require('mongoose');
// const next = require('next')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const ora = require('ora');
const chalk = require('chalk');
// const open = require('open');
const fs = require('fs');
const spinner = ora({
  text: 'Service running...',
  spinner: 'dots',
}).start();

// 引入swagger
const swaggerInstall = require('./swagger');
// 导入用户路由
const version = '/api/v1';
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

// MongoDB 连接

const url =
  'mongodb+srv://edwin-wb-li:vnEugf4Vw7tAGOxE@express-cluster.pri8t.mongodb.net/node';

const MONGODB_URI =
  process.env.MONGODB_URL || url || 'mongodb://127.0.0.1:27017/node';
mongoose
  .connect(MONGODB_URI)
  .then(() =>
    spinner.succeed(
      chalk.green(`MongoDB连接成功: Connected to MongoDB with Mongoose`)
    )
  )
  .catch((err) => spinner.fail(chalk.red('MongoDB连接失败:', err)));

const server = express();

// 在其他中间件之前启用CORS
server.use(
  cors({
    origin: [
      'https://next-express-project-lake.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 明确列出允许的方法
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
// server.use(express.static(path.resolve(__dirname, `static`)));
// 设置静态文件目录，并指定路径前缀
server.use('/static', express.static(path.resolve(__dirname, 'static')));

// app.prepare().then(() => {
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// 全局错误处理中间件
server.use((err, _req, res, next) => {
  spinner.fail(chalk.red(err?.stack));
  res.status(500).send(err?.stack ?? 'Something broke!');
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
swaggerInstall(server);
// 标志文件路径
const openFlagPath = path.resolve(__dirname, '.swagger-opened');

// 检查标志文件是否存在
const hasOpenedSwagger = () => fs.existsSync(openFlagPath);

// 写入标志文件
const markSwaggerAsOpened = () =>
  fs.writeFileSync(openFlagPath, 'swagger opened', 'utf-8');

// 优雅关闭函数
const gracefulShutdown = () => {
  server.close(() => {
    console.log(chalk.green('HTTP server closed'));
    mongoose.connection.close(false, () => {
      console.log(chalk.green('MongoDB connection closed'));
      process.exit(0); // 关闭进程
    });
  });
};

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
  spinner.fail(chalk.red('Uncaught Exception: ', err));
  gracefulShutdown();
});

// 处理未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  spinner.fail(
    chalk.red('Unhandled Rejection at: ', promise, 'reason: ', reason)
  );
  gracefulShutdown();
});

// 监听端口
server.listen(port, async (err) => {
  if (err) {
    spinner.fail(chalk.red('Error starting server:', err));
    return;
  }

  // 如果 Swagger 尚未打开过，则打开一次
  if (!hasOpenedSwagger()) {
    try {
      const { default: open } = await import('open'); // 动态导入 open 模块
      await open(`http://localhost:${port}/api/v1/swagger-doc`); // 打开 Swagger 文档
      markSwaggerAsOpened(); // 创建标志文件，记录打开状态
      // process.env.OPENED_SWAGGER = 'true'; // 设置环境变量，标记为已打开
    } catch (err) {
      spinner.fail(chalk.red('Error opening Swagger documentation:', err));
    }
  }
  spinner.succeed(chalk.green(`Ready on http://localhost:${port}`));
  spinner.succeed(
    chalk.green(`Swagger Document: http://localhost:${port}/api/v1/swagger-doc`)
  );
});
