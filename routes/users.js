const express = require('express');

// 假设有一个usersController来处理业务逻辑
const UserController = require('../controller/users/users.js');
const router = express.Router();
/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: 用户登录接口
 *     description: 用户通过用户名和密码登录系统。
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: 密码
 *                 example: "secure_password"
 *     responses:
 *       200:
 *         description: 登录成功
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
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJyb2xlIjoiYWRtaW4iLCJfaWQiOiI2M2QxNjg0OTIwMjE3NjgiLCJpZCI6MSwiaWF0IjoxNjg5NTIwODkxfQ.8h4fKd5XJ8u67VlXq4rL6HmZ9eUZDvz8X6lOYHtjX5o"
 *                     userInfo:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         role:
 *                           type: string
 *                           example: "admin"
 *       400:
 *         description: 客户端错误
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
 *                   example: "账号不存在 、账号已停用，请联系管理员、密码错误"
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
router.post('/login', UserController.login);
// 用户注册
router.post('/register', UserController.register);
// 忘记密码
router.post('/forgot-password', UserController.forgotPassword);
// 获取用户列表
router.post('/getUserList', UserController.getUserList);
// 修改用户信息
router.post('/editUserInfo', UserController.editUserInfo);
// 根据 id 获取用户信息
router.get('/getUserInfoById/:id', UserController.getUserInfoById);
// 删除用户
router.post('/deleteUser', UserController.deleteUser);

module.exports = router;
