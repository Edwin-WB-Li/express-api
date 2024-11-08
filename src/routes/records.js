const express = require('express');
const router = express.Router();
const RecordsController = require('../controller/records/records');

// 获取聊天记录
/**
 * @swagger
 * /api/v1/records/getChattingRecords:
 *   get:
 *     summary: 获取聊天记录
 *     description: 根据当前请求的参数获取聊天记录
 *     tags: [ChattingRecords]
 *     responses:
 *       200:
 *         description: 成功返回聊天记录
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
 *                   example: "Chatting records fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sender:
 *                         type: string
 *                         example: "Boss"
 *                       recipient:
 *                         type: string
 *                         example: "All"
 *                       message:
 *                         type: string
 *                         example: "Hello, how are you?"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T12:00:00Z"
 *       400:
 *         description: 获取聊天记录失败
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
 *                   example: "获取聊天记录失败: 未知错误"
 *                 data:
 *                   type: null
 *                   example: null
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
router.get('/getChattingRecords', RecordsController.getChattingRecords);

module.exports = router;
