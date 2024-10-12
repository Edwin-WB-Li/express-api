const express = require('express');
const router = express.Router();

const CommentsController = require('../controller/comments/comments')

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 用户登录接口
 *     description: 用户通过用户名和密码登录系统。
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
 */
router.get('/getCommentsList', CommentsController.getCommentsList);
router.post('/replayToComments', CommentsController.replayToComments);

module.exports = router;