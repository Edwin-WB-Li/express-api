const express = require('express');

// 假设有一个usersController来处理业务逻辑
const UserController = require('../controller/users/users.js')
const router = express.Router();

 /**
 * @swagger
 * /test:
 *   get:
 *     summary: 测试 swagger文档
 *     responses:
 *       200:
 *         description: 测试测试
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
router.post('/login', UserController.login);
// 用户注册
/**
 * @swagger
 * /test:
 *   get:
 *     summary: 测试 swagger文档
 *     responses:
 *       200:
 *         description: 测试测试
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
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