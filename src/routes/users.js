const express = require('express');
const router = express.Router();
const UserController = require('../controller/users/users.js');

// 用户登录
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
 *                           type: string
 *                           example: "1"
 *                         nick_name:
 *                           type: string
 *                           example: "John Doe"
 *                         role:
 *                           type: string
 *                           example: "admin"
 *                         role_name:
 *                           type: string
 *                           example: "系统管理员"
 *                         username:
 *                           type: string
 *                           example: "admin"
 *                         email:
 *                           type: string
 *                           example: "example@example.com"
 *                         avatat:
 *                           type: string
 *                           example: "https://example.com/avatar.jpg"
 *                         create_time:
 *                           type: string
 *                           example: "Tue Jul 02 2024 08:00:00 GMT+0800 (中国标准时间)"
 *                         update_time:
 *                           type: string
 *                           example: "Tue Jul 02 2024 08:00:00 GMT+0800 (中国标准时间)"
 *                         status:
 *                           type: bollean
 *                           example: true
 *                         _id:
 *                           type: string
 *                           example: "1"
 *       400:
 *         description: 客户端错误(账号不存在 、账号已停用，请联系管理员、密码错误)
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
/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: 用户注册接口
 *     description: 用户通过填写定义信息，注册账号。
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
 *               email:
 *                 type: string
 *                 description: 邮箱
 *                 example: "example@example.com"
 *                 returen: true
 *               mobile:
 *                 type: string
 *                 description: 手机号
 *                 example: "15277029825"
 *               nice_name:
 *                 type: string
 *                 description: 别名
 *                 example: "Edwin"
 *               role:
 *                 type: string
 *                 description: 角色
 *                 example: "admin"
 *               role_name:
 *                 type: string
 *                 description: 角色名称
 *                 example: "系统管理员"
 *               confirmPassword:
 *                 type: string
 *                 description: 确认密码
 *                 example: "secure_password"
 *               captcha:
 *                 type: string
 *                 description: 验证码
 *                 example: "581475"
 *               agreement:
 *                 type: boolean
 *                 description: 同意协议
 *                 example: true
 *     responses:
 *       200:
 *         description: 注册成功
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
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     username:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: 客户端错误(入参有误 、账号已存在)
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
 *                   example: "账号已存在"
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
router.post('/register', UserController.register);

// 忘记密码
/**
 * @swagger
 * /api/v1/user/forgotPassword:
 *   post:
 *     summary: 用户修改密码接口
 *     description: 用户修改密码
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
 *               oldPassword:
 *                 type: string
 *                 description: 旧密码
 *                 example: "secure_password"
 *               newPassword:
 *                 type: string
 *                 description: 新密码
 *                 example: "password"
 *                 returen: true
 *               confirmNewPassword:
 *                 type: string
 *                 description: 确认新密码密码
 *                 example: "password"
 *     responses:
 *       200:
 *         description: 修改成功
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
 *                     username:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: 客户端错误(入参字段有误 、账号不存在 、旧密码错误)
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
 *                   example: "账号不存在"
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
router.post('/forgotPassword', UserController.forgotPassword);

// 获取用户列表
/**
 * @swagger
 * /api/v1/user/getUserList:
 *   post:
 *     summary: 获取用户列表接口
 *     description: 获取用户列表。
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
 *               nice_name:
 *                 type: string
 *                 description: 别名
 *                 example: "Edwin"
 *               mobile:
 *                 type: string
 *                 description: 手机号
 *                 example: "15277029571"
 *               role:
 *                 type: string
 *                 description: 角色
 *                 example: "admin"
 *               role_name:
 *                 type: string
 *                 description: 角色名称
 *                 example: "系统管理员"
 *               status:
 *                 type: boolean
 *                 description: 状态
 *                 example: true
 *               page:
 *                 type: number
 *                 description: 页码
 *                 example: 1
 *               size:
 *                 type: number
 *                 description: 条数
 *                 example: 10
 *               create_time:
 *                 type: string
 *                 description: 创建时间
 *                 example: "Tue Jul 02 2024 08:00:00 GMT+0800 (中国标准时间)"
 *     responses:
 *       200:
 *         description: 获取成功
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
 *                     list:
 *                       type: array
 *                       items:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                              example: "1"
 *                            nick_name:
 *                              type: string
 *                              example: "John Doe"
 *                            role:
 *                              type: string
 *                              example: "admin"
 *                            role_name:
 *                              type: string
 *                              example: "系统管理员"
 *                            username:
 *                              type: string
 *                              example: "admin"
 *                            email:
 *                              type: string
 *                              example: "example@example.com"
 *                            avatat:
 *                              type: string
 *                              example: "https://example.com/avatar.jpg"
 *                            create_time:
 *                              type: string
 *                              example: "Tue Jul 02 2024 08:00:00 GMT+0800 (中国标准时间)"
 *                            update_time:
 *                              type: string
 *                              example: "Tue Jul 02 2024 08:00:00 GMT+0800 (中国标准时间)"
 *                            status:
 *                              type: bollean
 *                              example: true
 *                            _id:
 *                              type: string
 *                              example: "1"
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
router.post('/getUserList', UserController.getUserList);

// 修改用户信息
/**
 * @swagger
 * /api/v1/user/addOrEditUserInfo:
 *   post:
 *     summary: 新增或修改用户信息接口
 *     description: 新增或修改用户信息，新增需要传 password，修改需要传id。
 *     tags: [User]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: 用户名
 *                 example: "john_doe"
 *               nice_name:
 *                 type: string
 *                 description: 别名
 *                 example: "Edwin"
 *               mobile:
 *                 type: string
 *                 description: 手机号
 *                 example: "15277029571"
 *               role:
 *                 type: string
 *                 description: 角色
 *                 example: "admin"
 *               role_name:
 *                 type: string
 *                 description: 角色名称
 *                 example: "系统管理员"
 *               status:
 *                 type: boolean
 *                 description: 状态
 *                 example: true
 *               email:
 *                 type: string
 *                 description: 邮箱
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: 密码(新增需要，修改不需要)
 *                 example: "123456"
 *               _id:
 *                 type: string
 *                 description: id(修改需要)
 *                 example: "1"
 *     responses:
 *       200:
 *         description: 新增 / 修改 成功
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
 *                     username:
 *                        type: string
 *                        example: "admin"
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
router.post('/addOrEditUserInfo', UserController.addOrEditUserInfo);

// 根据 id 获取用户信息
/**
 * @swagger
 * /api/v1/user/getUserInfoById/{id}:
 *   get:
 *     summary: 根据 id 获取用户信息接口
 *     description: 根据 id 获取用户信息
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功返回用户信息
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
 *                     list:
 *                       type: object
 *                       properties:
 *                          username:
 *                            type: string
 *                            description: 用户名
 *                            example: "john_doe"
 *                          nice_name:
 *                            type: string
 *                            description: 别名
 *                            example: "Edwin"
 *                          mobile:
 *                            type: string
 *                            description: 手机号
 *                            example: "15277029571"
 *                          role:
 *                            type: string
 *                            description: 角色
 *                            example: "admin"
 *                          role_name:
 *                            type: string
 *                            description: 角色名称
 *                            example: "系统管理员"
 *                          status:
 *                            type: boolean
 *                            description: 状态
 *                            example: true
 *                          email:
 *                            type: string
 *                            description: 邮箱
 *                            example: example@example.com
 *       400:
 *         description: 请求参数错误
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
 *                   example: "请求参数错误"
 *                 data:
 *                   type: null
 *                   example: null
 *
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
 *                   example: "服务器内部错误"
 *                 data:
 *                   type: null
 *                   example: null
 */
router.get('/getUserInfoById/:id', UserController.getUserInfoById);

// 删除用户
/**
 * @swagger
 * /api/v1/user/deleteUser:
 *   post:
 *     summary: 删除用户接口
 *     description: 删除用户,传 id 可以 传多个
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *                type: string
 *                example: '1'
 *     responses:
 *       200:
 *         description: 删除 成功
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
 *                   example: "删除成功"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedCount:
 *                        type: number
 *                        example: 1
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
router.post('/deleteUser', UserController.deleteUser);

module.exports = router;
