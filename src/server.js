require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
// WebSocket
const WebSocket = require('ws');
const recordsModel = require('./models/records/recordsModel');
const ora = require('ora');
const chalk = require('chalk');
// const fs = require('fs');
const spinner = ora({
	text: 'Service running...',
	spinner: 'dots',
}).start();
const moment = require('moment');

// 引入swagger
const swaggerInstall = require('./swagger');
// const version = '/api/v1';
// 导入路由
const goodsRouter = require('./routes/goods');
const usersRouter = require('./routes/users');
const filesdRouter = require('./routes/files');
const menusRouter = require('./routes/menus');
const menuItemsRouter = require('./routes/menuItems');
const commentsRouter = require('./routes/comments');
const weathersRouter = require('./routes/weathers');
const locationsRouter = require('./routes/locations');
const devicesRouter = require('./routes/devices');
const recordsRouter = require('./routes/records');
const dictionariesRouter = require('./routes/dictionaries');
const dependenciesRouter = require('./routes/dependencies');
const verificationCodeRouter = require('./routes/verificationCode');

const { PORT, MONGODB_ATLAS_URL, MONGODB_LOCAL_URL, NODE_ENV, PRODUCTION_URL, LOCAL_URL, API_VERSION } = process.env;

// 端口
const port = PORT || 3001;

// MongoDB 连接
// 连接 MongoDB Atlas 集群
const MONGODB_URI = MONGODB_ATLAS_URL || MONGODB_LOCAL_URL;
mongoose
	.connect(MONGODB_URI)
	.then(() => spinner.succeed(chalk.green(`MongoDB连接成功: Successful Connected to MongoDB Atlas with Mongoose`)))
	.catch(err => spinner.fail(chalk.red('MongoDB连接失败 -----> ', err)));

const app = express();

// 在其他中间件之前启用CORS
app.use(
	cors({
		// 允许所有跨域
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // 明确列出允许的方法
		allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
	}),
);

// 设置静态文件目录，并指定路径前缀
app.use('/static', express.static(path.resolve(__dirname, '../static')));

// 处理根路径请求，发送 index.html 文件
app.get('/', (_req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 添加中间件，记录请求的路径和方法
app.use((req, res, next) => {
	const startTime = Date.now();
	const method = req.method;
	const url = req.url;

	// 记录请求方式和路径
	spinner.info(chalk.blue(`Request:  ${method} ${url}`));

	// 记录响应结束
	const originalSend = res.send;
	res.send = function (body) {
		const endTime = Date.now();
		const responseTime = endTime - startTime;
		const status = res.statusCode;
		// 记录响应结果
		spinner.info(
			chalk.blue(
				// `Response: ${method} ${url} - Status: ${status} - Time: ${responseTime}ms`
				`Response: Status: ${status} - Time: ${responseTime}ms`,
			),
		);
		// 调用原始的 send 方法
		originalSend.call(res, body);
	};
	next();
});

app.use(`${API_VERSION}/good`, goodsRouter);
app.use(`${API_VERSION}/user`, usersRouter);
app.use(`${API_VERSION}/file`, filesdRouter);
app.use(`${API_VERSION}/sysPermission`, menusRouter);
app.use(`${API_VERSION}/menuItems`, menuItemsRouter);
app.use(`${API_VERSION}/dictionaries`, dictionariesRouter);
app.use(`${API_VERSION}/comments`, commentsRouter);
app.use(`${API_VERSION}/devices`, devicesRouter);
app.use(`${API_VERSION}/locations`, locationsRouter);
app.use(`${API_VERSION}/weathers`, weathersRouter);
app.use(`${API_VERSION}/records`, recordsRouter);
app.use(`${API_VERSION}/dependencies`, dependenciesRouter);
app.use(`${API_VERSION}`, verificationCodeRouter);

// 注册swagger
swaggerInstall(app);

// 处理未找到的路由
app.use((req, res, next) => {
	// 如果是 API 请求且未找到对应的路由，则返回 404 页面
	if (req.url.startsWith(API_VERSION)) {
		res.sendFile(path.join(__dirname, '../public/404.html'));
	} else {
		next();
	}
});

// 处理不是以 `/api/v1` 开头但实际也不存在的 API
app.use((_req, res) => {
	// 如果不是以 `/api/v1` 开头且未找到对应的路由，则返回 404 页面
	res.sendFile(path.join(__dirname, '../public/404.html'));
});

// 全局错误处理中间件
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, next) => {
	spinner.fail(chalk.red(err?.stack));
	res.status(500).send(err?.stack ?? 'Something broke!');
	return;
});

// 优雅关闭函数
const gracefulShutdown = async httpServer => {
	try {
		await new Promise(resolve => httpServer.close(resolve));
		spinner.fail(chalk.red('HTTP server closed'));
		await mongoose.connection.close();
		spinner.fail(chalk.red('MongoDB connection closed'));
		// process.exit(0); // 关闭进程
	} catch (err) {
		console.error(chalk.red('Error during graceful shutdown:', err));
		// process.exit(1); // 强制关闭进程
	}
};

// 处理未捕获的异常
process.on('uncaughtException', err => {
	spinner.fail(chalk.red('Uncaught Exception: ', err));
	gracefulShutdown(httpServer);
});

// 处理未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
	spinner.fail(chalk.red('Unhandled Rejection at: ', promise, 'reason: ', reason));
	gracefulShutdown(httpServer);
});

// 创建 WebSocket 服务器 ，手动处理 HTTP 升级请求
const wss = new WebSocket.Server({ noServer: true });
// 使用了一个 Map 来存储连接的客户端
const clients = new Map();

// 客户端连接处理
wss.on('connection', (ws, req) => {
	// 从请求 URL 中提取用户标识
	const user = req.url.slice(1);
	// 将用户标识和 WebSocket 连接关联起来
	clients.set(user, ws);
	spinner.succeed(chalk.green(decodeURIComponent(` ${user} client connected ( ${user} 客户端连接成功)`)));

	// 处理消息
	ws.on('message', async information => {
		console.log(`Received: ${information}`);
		const parsedMessage = JSON.parse(information);
		const { sender, recipient, message, timestamp } = parsedMessage;

		// 保存聊天记录到数据库
		const chatMessage = new recordsModel({
			sender,
			recipient,
			message,
			timestamp,
		});

		await chatMessage.save();

		// 广播消息给所有连接的客户端
		wss.clients.forEach(client => {
			if (client.readyState === WebSocket.OPEN) {
				// client.send(message);
				client.send(JSON.stringify({ sender, recipient, message, timestamp }));
			}
		});
	});
	// 客户端断开处理
	ws.on('close', () => {
		spinner.succeed(
			chalk.green(decodeURIComponent(`${user} client disconnected (${user} 客户端断开连接)`)),
			// 从 Map 中移除断开连接的客户端
			clients.delete(user),
		);
	});
	// 处理错误
	ws.on('error', err => {
		spinner.fail(chalk.red('WebSocket error:', err));
	});
});

// 监听端口
const httpServer = app.listen(port, async err => {
	if (err) {
		spinner.fail(chalk.red('Error starting server:', err));
		return;
	}

	const swagger_url = NODE_ENV === 'production' ? PRODUCTION_URL : `${LOCAL_URL}:${port}${API_VERSION}`;

	const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

	spinner.info(chalk.blue(`------- ${currentTime} ----------`));
	spinner.succeed(chalk.green(`Environment: ${NODE_ENV}`));
	spinner.succeed(chalk.green(`Swagger Document: ${swagger_url}/swagger-doc`));
});

// 将 WebSocket 服务器与 HTTP 服务器结合
httpServer.on('upgrade', (request, socket, head) => {
	// 处理 WebSocket 升级请求，方法会解析 HTTP 升级请求，并在成功升级后触发 connection 事件
	wss.handleUpgrade(request, socket, head, ws => {
		wss.emit('connection', ws, request);
	});
});
