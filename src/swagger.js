const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const apiUrl = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.LOCAL_URL;

// 配置 swagger-jsdoc 选项
const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			// 标题信息
			title: 'Express 后台API文档',
			version: '1.0.0',
			description: '企业级管理后台共用接口API文档',
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
	apis: ['./src/api-annotation/*.yaml'], // 注意路径是否正确
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
	app.get('/api/v1/swagger.json', swaggerJson);

	// 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由 '/swagger'
	app.use('/api/v1/swagger-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

// 导出 `swaggerInstall` 方法供其他模块使用
module.exports = swaggerInstall;
