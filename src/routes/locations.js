const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  verifyToken,
  handleError,
  fetchIp,
  fetchLocations,
  fetchLocationsByIp,
  handleServerError,
  fetchGeocodedInformation,
  AMAP_API_KEY,
} = require('../utils/');

// 获取 IP地址
/**
 * @swagger
 * /api/v1/locations/getIp:
 *   get:
 *     summary: 获取当前 IP 地址
 *     description: 获取当前请求的 IP 地址
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: 成功返回 IP 地址
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
 *                   example: "ip fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     ip:
 *                       type: string
 *                       example: "192.168.1.1"
 *       400:
 *         description: 无法获取当前 IP 地址
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
 *                   example: "无法获取当前ip信息,请稍后重试"
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
router.get('/getIp', async (req, res) => {
  try {
    await verifyToken(req, res);
    // 调用 API
    const ip = await fetchIp();
    if (!ip) {
      return res.status(400).json({
        code: 400,
        message: `无法获取当前ip信息,请稍后重试`,
        data: null,
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: 'ip fetched successfully',
        data: {
          ip,
        },
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

// 根据 Openapi 获取城市信息
/**
 * @swagger
 * /api/v1/locations/getLocationsByOpenapi:
 *   get:
 *     summary: 根据 OpenAPI 获取城市信息
 *     description: 根据当前请求的 IP 地址获取城市信息
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: 成功返回城市信息
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
 *                   example: "locationData fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     locationsData:
 *                       type: object
 *                       example: {
 *                         city: "北京",
 *                         province: "北京市",
 *                         country: "中国"
 *                       }
 *       400:
 *         description: 无法获取当前 IP 地址或位置信息
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
 *                   example: "无法获取当前ip信息"
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
router.get('/getLocationsByOpenapi', async (req, res) => {
  // 城市编码
  try {
    // token 校验
    await verifyToken(req, res);
    // 调用地理位置 API
    const ip = await fetchIp();
    if (!ip) {
      return res.status(400).json({
        code: 400,
        message: `无法获取当前ip信息`,
        data: null,
      });
    }
    const locationsData = await fetchLocations(ip);

    if (!locationsData) {
      return res.status(400).json({
        code: 400,
        message: `无法获取当前所在位置信息: ${locationsResponse?.data?.msg}`,
        data: null,
      });
    }
    return res.status(200).json({
      code: 200,
      message: 'locationData fetched successfully',
      data: locationsData,
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

// 根据 Amap Api 获取城市信息
/**
 * @swagger
 * /api/v1/locations/getLocationsByIp:
 *   get:
 *     summary: 根据 IP 地址获取城市信息
 *     description: 根据当前请求的 IP 地址获取城市信息
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: 成功返回城市信息
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
 *                   example: "locationData fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     locationsData:
 *                       type: object
 *                       example: {
 *                         city: "北京",
 *                         province: "北京市",
 *                         country: "中国"
 *                       }
 *       400:
 *         description: 无法获取当前 IP 地址或位置信息
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
 *                   example: "无法获取当前ip信息"
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
router.get('/getLocationsByIp', async (req, res) => {
  try {
    await verifyToken(req, res);
    const ip = await fetchIp();
    if (!ip) {
      return res.status(400).json({
        code: 400,
        message: `无法获取当前ip信息`,
        data: null,
      });
    }
    const locationsData = await fetchLocationsByIp({ key: AMAP_API_KEY, ip });
    if (!locationsData) {
      return res.status(400).json({
        code: 400,
        message: `无法获取当前所在位置信息: ${locationsResponse?.data?.msg}`,
        data: null,
      });
    }
    return res.status(200).json({
      code: 200,
      message: 'locationData fetched successfully',
      data: locationsData,
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

// 根据城市获取城市编码信息
/**
 * @swagger
 * /api/v1/locations/getGeocodedInformationByCity:
 *   get:
 *     summary: 根据 IP地址 获取所在地，然后根据所在地获取城市编码信息
 *     description: 根据当前请求的 IP 地址获取城市信息，并进一步获取城市的地理编码信息
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: 成功返回地理编码信息
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
 *                   example: "data fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       formatted_address:
 *                         type: string
 *                         example: "北京市朝阳区"
 *                       geocode:
 *                         type: string
 *                         example: "116.404177,39.913818"
 *                       province:
 *                         type: string
 *                         example: "北京市"
 *                       city:
 *                         type: string
 *                         example: "北京市"
 *                       district:
 *                         type: string
 *                         example: "朝阳区"
 *       400:
 *         description: 获取数据失败
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
 *                   example: "获取数据失败: 未知错误"
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
router.get('/getGeocodedInformationByCity', async (req, res) => {
  try {
    await verifyToken(req, res);
    const ip = await fetchIp();
    const locationsData = await fetchLocations(ip);
    // 调用地理位置 API
    const { province, city } = locationsData;
    const address = `${province}${city}`;
    const data = await fetchGeocodedInformation({
      address,
      key: AMAP_API_KEY,
      city,
    });
    if (data.status !== '1') {
      return res.status(400).json({
        code: 400,
        message: `获取数据失败: ${data.info}`,
        data: null,
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: 'data fetched successfully',
        data: data.geocodes,
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
