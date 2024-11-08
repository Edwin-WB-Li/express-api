const express = require('express');
const router = express.Router();
const { verifyToken, getDependencies, handleServerError } = require('../utils');

/**
 * @swagger
 * /api/v1/dependencies/getDependenciesList:
 *   get:
 *     summary: 获取依赖列表
 *     description: 根据当前请求的 token 校验后，获取当前Express项目依赖列表（包括 dependencies 和 devDependencies）
 *     tags: [Dependencies]
 *     responses:
 *       200:
 *         description: 成功返回依赖列表
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
 *                   example: "get dependencies list successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     dependencies:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                       example: {
 *                         "express": "^4.18.2",
 *                         "typescript": "^4.9.4"
 *                       }
 *                     devDependencies:
 *                       type: object
 *                       additionalProperties:
 *                         type: string
 *                       example: {
 *                         "@types/express": "^4.17.17",
 *                         "@types/node": "^18.11.9",
 *                         "nodemon": "^2.0.20",
 *                         "ts-node": "^10.9.1",
 *                         "typescript": "^4.9.4"
 *                       }
 *       401:
 *         description: 未授权
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
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
router.get('/getDependenciesList', async (req, res) => {
  // 城市编码
  try {
    // token 校验
    await verifyToken(req, res);

    const { dependencies, devDependencies } = await getDependencies();

    return res.status(200).json({
      code: 200,
      message: 'get dependencies list successfully',
      data: {
        dependencies,
        devDependencies,
      },
    });
  } catch (error) {
    const errorMessage = handleServerError(error);
    return res.status(500).json({
      code: 500,
      message: errorMessage,
      data: null,
    });
  }
});

module.exports = router;
