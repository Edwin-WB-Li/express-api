const express = require('express');
const router = express.Router();

// 假设有一个 DictionariesController来处理业务逻辑
const DictionariesController = require('../controller/dictionaries/dictionaries');

// 根据 参数 获取 下拉框数据
/**
 * @swagger
 * /api/v1/dictionaries/getDropDownListByType:
 *   get:
 *     summary: 根据类型获取下拉框列表接口
 *     description: 根据类型获取不同下拉框列表
 *     tags: [Dictionaries]
 *     parameters:
 *       - in: query
 *         name: type
 *         description: 类型
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功返回下拉框列表
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
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                             example: "系统管理员"
 *                           value:
 *                             type: string
 *                             example: "admin"
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
router.get(
  '/getDropDownListByType',
  DictionariesController.getDropDownListByType
);

module.exports = router;
