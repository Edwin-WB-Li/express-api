const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  verifyToken,
  fetchIp,
  fetchLocationsByIp,
  fetchWeathersByCityCode,
  handleError,
  handleServerError,
  AMAP_API_KEY,
} = require('../utils/');
/**
 * @swagger
 * /api/v1/weathers/getWeathersByIp:
 *   get:
 *     summary: 根据 IP 地址获取天气信息
 *     description: 根据当前请求的 IP 地址获取城市信息，并进一步获取该城市的天气信息
 *     tags: [Weathers]
 *     responses:
 *       200:
 *         description: 成功返回天气信息
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
 *                   example: "Weather data fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                         example: "北京市"
 *                       adcode:
 *                         type: string
 *                         example: "110000"
 *                       weather:
 *                         type: string
 *                         example: "晴"
 *                       temperature:
 *                         type: string
 *                         example: "15"
 *                       winddirection:
 *                         type: string
 *                         example: "北风"
 *                       windpower:
 *                         type: string
 *                         example: "≤3级"
 *                       humidity:
 *                         type: string
 *                         example: "20%"
 *                       reporttime:
 *                         type: string
 *                         example: "2023-10-01 12:00:00"
 *       400:
 *         description: 获取天气数据失败
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
 *                   example: "获取天气数据失败: 未知错误"
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
router.get('/getWeathersByIp', async (req, res) => {
  // 城市编码
  try {
    // token 校验
    await verifyToken(req, res);
    // const schema = Joi.object({
    //   // 城市编码
    //   city: Joi.string().required(),
    //   key: Joi.string().required(),
    // });
    // // 对请求参数进行验证
    // const { error, value } = schema.validate(req.query);
    // if (error) {
    //   const errorMessage = handleError(error);
    //   return res.status(400).json({
    //     code: 400,
    //     message: errorMessage,
    //     data: null,
    //   });
    // }
    // const { city } = value;
    const ip = await fetchIp();
    const locationsData = await fetchLocationsByIp({ key: AMAP_API_KEY, ip });
    const weathersData = await fetchWeathersByCityCode({
      key: AMAP_API_KEY,
      city: locationsData.adcode,
    });

    if (weathersData.status !== '1') {
      return res.status(400).json({
        code: 400,
        message: `获取天气数据失败: ${weathersData.info}`,
        data: null,
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: 'Weather data fetched successfully',
        data: weathersData?.lives ?? [],
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
