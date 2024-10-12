const chalk = require('chalk');
const jwt = require('jsonwebtoken')

// const ora = require('ora');
// const spinner = ora('').start();
// const logSymbols = require('log-symbols');

exports.handleError = function (error = []) {
  console.error(chalk.red('Check error, Input error ---------> ', error));
  if (error.details) {
    const errorDetails = error?.details?.map(detail => detail.message)
    return errorDetails.toString()
  }
  return error.message
}
exports.handleServerError = function (error) {
  console.error(chalk.red('server error ---------> ', error));
  let errorMessage = '服务器错误';
  if (error?.message) {
    errorMessage = error?.message;
  }
  return errorMessage
}

// 生成token
exports.createToken = function (data, expiresInHours = 0.1) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return jwt.sign({
    data, // 将被加密的用户信息
    // iat: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 单位是秒
    // 签发时间
    iat: nowInSeconds,
    // 设置过期时间为当前时间加上有效时长
    exp: nowInSeconds + (expiresInHours * 60 * 60)
  }, 'token');
}

exports.verifyToken = function (req, res) {
  return new Promise((resolve, reject) => {
    // 接收 token
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({
        code: 401,
        message: 'No token provided',
        data: null
      })
    }
    try {
      // 验证 token
      var decoded = jwt.verify(token, 'token')
      // 检查是否过期
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        res.status(401).json({
          code: 401,
          message: 'Token has expired',
          data: null
        });
        return;
      }
      resolve(decoded.data)
    } catch (err) {
      res.status(401).json({
        code: 401,
        message: 'token invaild',
        data: null
      })
    }
  })
}