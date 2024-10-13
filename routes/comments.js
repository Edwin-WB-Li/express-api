const express = require('express');
const router = express.Router();

const CommentsController = require('../controller/comments/comments');
/**
 * 根据类型获取 commentslist
 * @swagger
 * /api/v1/comments/getCommentsList:
 *   get:
 *     summary: "根据类型获取评论列表"
 *     tags: ["Comments"]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: "评论类型"
 *         required: true
 *     responses:
 *       200:
 *         description: "成功返回评论列表"
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       content:
 *                         type: string
 *                         example: "这是一个评论"
 *       400:
 *         description: "客户端错误"
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
 *       500:
 *         description: "服务器错误"
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
router.get('/getCommentsList', CommentsController.getCommentsList);
router.post('/replayToComments', CommentsController.replayToComments);

module.exports = router;
