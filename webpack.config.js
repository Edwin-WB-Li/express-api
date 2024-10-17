const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clear: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 JavaScript 文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // 使用默认的缓存目录读取构建结果，避免每次执行时重新编译可能产生的高性能消耗
            // cacheDirectory: true,
            // configFile: paths.babelFile,
          },
        },
      },
      // 处理图片文件
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 输出文件名格式
              name: '[name].[hash].[ext]',
              // 输出路径
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  // 开发模式
  mode: 'development',
  devtool: 'inline-source-map',
};
