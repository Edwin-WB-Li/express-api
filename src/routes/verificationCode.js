const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Joi = require('joi'); // 引入 Joi
const { handleError, handleServerError } = require('../utils/');
// const { verifyToken } = require('../utils/');
// const chalk = require('chalk')

// 配置 SMTP 运输对象
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  // host: 'smtp.163.com',
  // service: "qq",
  // secureConnection: true, // 使用 SSL
  port: 465,
  // port: 587,
  secure: true, // 对于端口 465 必须启用安全连接
  // secure: false,
  auth: {
    user: 'edwin.wb.li@qq.com', // 你的邮箱地址
    pass: 'frskvnbojzmadfie', // 密码或应用密码
    // user: '15277019572@163.com', // 你的邮箱地址
    // pass: 'BWcLAqDrtqQE7raV' // 密码或应用密码
  },
});

// 存储验证码的 Map
const verificationCodes = new Map();

// 记录请求次数的 Map
const requestCounts = new Map();
// 生成随机验证码
function generateVerificationCode() {
  // 生成一个 6 位的随机数
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 发送验证码的接口
router.post('/send-verification-code', async (req, res) => {
  try {
    // 验证token
    // await verifyToken(req, res)
    // 入参校验
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      const errorMessage = handleError(error);
      return res.status(400).json({
        code: 400,
        message: errorMessage,
        data: null,
      });
    }

    const { email } = value;

    // 获取当前时间
    const now = Date.now();

    // 获取用户请求记录
    let requestRecord = requestCounts.get(email);

    if (!requestRecord) {
      requestRecord = { count: 0, lastRequestTime: now };
    }

    // 检查请求次数和时间
    if (
      requestRecord.count >= 3 &&
      now - requestRecord.lastRequestTime < 5 * 60 * 1000
    ) {
      return res.status(429).json({
        code: 429,
        message: 'Too many requests. Please try again in five minutes',
        data: null,
      });
    }

    // 更新请求记录
    requestRecord.count += 1;
    requestRecord.lastRequestTime = now;
    requestCounts.set(email, requestRecord);

    // 设置验证码有效期（例如：5分钟）
    const expirationTime = now + 5 * 60 * 1000;

    // 生成验证码
    const verificationCode = generateVerificationCode();

    // 存储验证码
    verificationCodes.set(email, { verificationCode, expirationTime });

    // 邮件详情
    const mailOptions = {
      // 发件人
      from: 'Edwin WB Li<edwin.wb.li@qq.com>',
      // 收件人
      to: email,
      // 主题
      subject: '验证码',
      // 文本内容
      text: `您的验证码是：${verificationCode},有效期为5分钟`,
      // HTML 内容
      html: `<p>您的验证码是：<b>${verificationCode}</b></p><p>有效期为5分钟,切勿随意泄露</p>`,
    };

    // 发送验证码邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        const errorMessage = handleServerError(error);
        console.error('Error sending email:', error);
        return res.status(400).json({
          code: 400,
          message: errorMessage || 'Failed to send verification code',
          data: null,
        });
      }
      return res.json({
        code: 200,
        message: 'Verification code sent successfully',
        data: `验证码已发送至：${email},有效期为5分钟,请注意查收,切勿随意泄露`,
      });
    });
  } catch (error) {
    const errorMessage = handleServerError(error);
    return res.status(500).json({
      code: 500,
      message: errorMessage || 'Internal Server Error',
      data: null,
    });
  }
});

// 验证验证码的接口
router.post('/verify-verification-code', async (req, res) => {
  try {
    // token校验
    // await verifyToken(req, res)
    // 入参校验
    const schema = Joi.object({
      email: Joi.string().email().required(),
      code: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      const errorMessage = handleError(error);
      return res.status(400).json({
        code: 400,
        message: errorMessage,
        data: null,
      });
    }

    const { email, code } = value;

    const now = Date.now();

    // 获取用户请求记录
    let requestRecord = requestCounts.get(email);

    if (!requestRecord) {
      requestRecord = { count: 0, lastRequestTime: now };
    }
    // 检查请求次数和时间
    if (
      requestRecord.count >= 10 &&
      now - requestRecord.lastRequestTime < 5 * 60 * 1000
    ) {
      return res.status(429).json({
        code: 429,
        message: 'Too many requests. Please try again in five minutes',
        data: null,
      });
    }

    // 更新请求记录
    requestRecord.count += 1;
    requestRecord.lastRequestTime = now;
    requestCounts.set(email, requestRecord);

    const storedData = verificationCodes.get(email);

    if (!storedData) {
      return res.status(400).json({
        code: 400,
        message: 'Verification code not found',
        data: null,
      });
    }

    const { verificationCode, expirationTime } = storedData;

    if (code !== verificationCode) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid verification code',
        data: null,
      });
    }

    if (Date.now() > expirationTime) {
      return res.status(400).json({
        code: 400,
        message: 'Verification code has expired',
        data: null,
      });
    }

    // 清除已验证的验证码;
    verificationCodes.delete(email);

    return res.json({
      code: 200,
      message: 'Verification code verified successfully',
      data: verificationCode,
    });
  } catch (error) {
    const errorMessage = handleServerError(error);
    res.status(500).json({
      code: 500,
      errorMessage: errorMessage || 'Internal Server Error',
      data: null,
    });
  }
});

module.exports = router;
