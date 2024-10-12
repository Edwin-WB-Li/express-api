module.exports = {
  env: {
    node: true, // Node.js 环境
    es6: true,
  },
  extends: [
    'eslint:recommended', // 使用推荐的规则
    'plugin:prettier/recommended', // 启用 Prettier
  ],
  rules: {
    // 在这里可以添加自定义规则
    'prettier/prettier': 'error', // 将 Prettier 的问题作为 ESLint 错误
    'no-unused-vars': 'off', // 或者使用 0
  },
  parserOptions: {
    ecmaVersion: 2020, // 允许使用最新的 ECMAScript 特性
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
