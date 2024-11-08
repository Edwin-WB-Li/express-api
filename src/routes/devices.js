const express = require('express');
const router = express.Router();
const {
  verifyToken,
  getDeviceType,
  getOS,
  handleServerError,
} = require('../utils');

/**
 * @swagger
 * /api/v1/devices/getDevicesInformation:
 *   get:
 *     summary: 获取设备信息
 *     description: 根据当前请求的 User-Agent 头获取设备类型和操作系统信息
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: 成功返回设备信息
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
 *                   example: "DevicesInformation data fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deviceType:
 *                       type: string
 *                       example: "Mobile"
 *                     os:
 *                       type: string
 *                       example: "iOS 14.5"
 *       400:
 *         description: 无效的 User-Agent
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
 *                   example: "Invalid user agent"
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
router.get('/getDevicesInformation', async (req, res) => {
  // 城市编码
  try {
    // token 校验
    await verifyToken(req, res);
    const userAgent = req.headers['user-agent'];
    const deviceType = getDeviceType(userAgent);
    const os = getOS(userAgent);

    if (deviceType && os) {
      return res.status(200).json({
        code: 200,
        message: 'DevicesInformation data fetched successfully',
        data: {
          deviceType,
          os,
        },
      });
    } else {
      return res.status(400).json({
        code: 400,
        message: 'Invalid user agent',
        data: null,
      });
    }
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
