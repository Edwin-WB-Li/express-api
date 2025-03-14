const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const { NODE_ENV, PRODUCTION_URL, LOCAL_URL, PORT, API_VERSION } = process.env;
const apiUrl = NODE_ENV === 'production' ? PRODUCTION_URL : `${LOCAL_URL}:${PORT}`;

// 配置 swagger-jsdoc 选项
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			// 标题信息
			title: 'Express-Api 接口文档',
			version: '1.0.0',
			description: '基于 Express + Mongoose + Mongodb_Atlas  + Swagger 构建的 Api 接口 ',
		},
		servers: [
			{
				// 根据实际情况调整
				url: apiUrl,
			},
		],
		components: {
			securitySchemes: {
				// bearerAuth: {
				//   type: 'http',
				//   scheme: 'bearer',
				//   bearerFormat: 'JWT', // 可选，指定 token 的格式
				// },
				apiKey: {
					type: 'apiKey',
					name: 'Authorization',
					in: 'header',
				},
			},
		},
		security: [
			{
				apiKey: [],
			},
		],
	},
	// 去指定路由下收集 swagger 注释
	apis: [path.resolve(__dirname, './api-annotation/users.yml'), path.resolve(__dirname, './api-annotation/*.yml')], // 注意路径是否正确
};

// 使用 swaggerJsDoc 生成规范的 swaggerSpec
const swaggerSpec = swaggerJsDoc(options);

// 定义 `swaggerJson` 方法，用于返回 swagger 文档的 JSON 数据
const swaggerJson = function (_req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
};

// 定义 `swaggerInstall` 方法，用于将 swagger 安装到应用中
const swaggerInstall = function (app) {
	if (!app) {
		app = express(); // 如果没有传入 app，则创建一个新的 express 实例
	}

	// 开放 JSON 格式的文档接口
	app.get(`${API_VERSION}/swagger.json`, swaggerJson);

	// 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由 '/swagger'
	app.use(`${API_VERSION}/swagger-doc`, swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

// 导出 `swaggerInstall` 方法供其他模块使用
module.exports = swaggerInstall;
