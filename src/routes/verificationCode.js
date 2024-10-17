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

// 生成随机验证码
function generateVerificationCode() {
  // 生成一个 6 位的随机数
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 发送验证码的接口
/**
 * @swagger
 * /api/v1/send-verification-code:
 *   post:
 *     summary: 发送验证码接口
 *     description: 发送验证码
 *     tags: [VerificationCode]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 邮箱
 *                 example: edwin.wb.li@qq.com
 *     responses:
 *       200:
 *         description:  验证码发送成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: string
 *                   example: "验证码已发送至：example@example.com ,请注意查收，切勿随意泄露"
 *       400:
 *         description: 客户端错误(入参有误)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "入参有误"
 *                 data:
 *                   type: null
 *                   example: null
 *                 status:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: 服务器内部错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 *                   example: null
 */
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

    // 生成验证码
    const verificationCode = generateVerificationCode();

    // 存储验证码
    verificationCodes.set(email, verificationCode);

    // 邮件详情
    const mailOptions = {
      // 发件人
      from: 'Edwin WB Li<edwin.wb.li@qq.com>',
      // 收件人
      to: email,
      // 主题
      subject: '验证码',
      // 文本内容
      text: `您的验证码是：${verificationCode}`,
      // HTML 内容
      html: `<p>您的验证码是：<b>${verificationCode}</b></p>`,
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
      console.log(`Verification code sent: ${info.messageId}`);
      res.json({
        code: 200,
        message: 'Verification code sent successfully',
        data: `验证码已发送至：${email},请注意查收，切勿随意泄露`,
      });
    });
  } catch (error) {
    const errorMessage = handleServerError(error);
    res.status(500).json({
      code: 500,
      message: errorMessage || 'Internal Server Error',
      data: null,
    });
  }
});

// 验证验证码的接口
/**
 * @swagger
 * /api/v1/verify-verification-code:
 *   post:
 *     summary: 验证码校验接口
 *     description: 验证码校验
 *     tags: [VerificationCode]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 邮箱
 *                 example: example@example.com
 *               code:
 *                 type: string
 *                 description: 验证码
 *                 example: 123456
 *     responses:
 *       200:
 *         description:  验证码校验成功
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: string
 *                   example: "验证码已发送至：example@example.com ,请注意查收，切勿随意泄露"
 *       400:
 *         description: 客户端错误(入参有误)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "入参有误"
 *                 data:
 *                   type: null
 *                   example: null
 *                 status:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: 服务器内部错误
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 *                   example: null
 */
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

    const storedCode = verificationCodes.get(email);

    if (!storedCode) {
      return res.status(400).json({
        code: 400,
        message: 'Verification code not found',
        data: null,
      });
    }

    if (storedCode === code) {
      // 清除已验证的验证码
      verificationCodes.delete(email);
      res.json({
        code: 200,
        message: 'Verification code verified successfully',
        data: storedCode,
      });
    } else {
      res.status(400).json({
        code: 400,
        message: 'Invalid verification code',
        data: null,
      });
    }
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
