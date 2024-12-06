module.exports = {
	env: {
		node: true, // Node.js 环境
		es6: true,
	},
	// plugins: ['node'],
	extends: [
		'eslint:recommended', // 使用推荐的规则
		'plugin:prettier/recommended', // 启用 Prettier
		'plugin:import/errors', // 引入错误检测
		'plugin:import/warnings', // 引入警告检测
		// 'plugin:node/recommended',
	],
	plugins: [
		'prettier', // 确保 Prettier 插件已安装
		'eslint-plugin-import', // 添加 import 插件
	],
	rules: {
		// 在这里可以添加自定义规则
		'prettier/prettier': 'error', // 将 Prettier 的问题作为 ESLint 错误
		'no-unused-vars': 'warn',
		'no-var': 'error', // 要求使用 let 或 const，而不是 var
		'no-irregular-whitespace': 'error', // 关闭禁止不规则空白字符
		'import/no-unresolved': 'error', // 确保导入的模块路径有效
		'no-unexpected-multiline': ['error'], // 禁止出现意外的多行表达式
		// 'comma-dangle': ['error', 'never'],
		'comma-dangle': ['error', 'always-multiline'],
		indent: ['error', 'tab'], // 使用制表符进行缩进
		parser: 0,
	},
	parserOptions: {
		ecmaVersion: 'latest', // 允许使用最新的 ECMAScript 特性
		// sourceType: 'module', // 指定源代码为模块
		sourceType: 'script', // 指定源代码为模块
	},
	// ...其他配置
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'], // 你想应用这些规则的文件类型
			rules: {
				'prettier/prettier': ['error'], // Prettier 的问题作为 ESLint 错误
			},
		},
	],
};
