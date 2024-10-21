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
router.get('/getIp', async (req, res) => {
  try {
    // 调用 API
    const ip = await fetchIp();
    console.log('ip--->', ip);
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
        data: ip,
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
router.get('/getLocationsByOpenapi', async (req, res) => {
  // 城市编码
  try {
    // token 校验
    // await verifyToken(req, res);
    // const schema = Joi.object({
    //   // 城市编码
    //   city: Joi.string().required(),
    //   // key: Joi.string().required(),
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
    // 获取用户的 IP 地址
    // const ip =
    //   req.headers['x-forwarded-for'] ||
    //   req.socket.remoteAddress ||
    //   '10.210.160.27' ||
    //   req.ip;
    // const ip = '113.105.84.50';
    // https://openapi.lddgo.net/base/gservice/api/v1/GetIpAddress
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
    console.log('位置信息--->', locationsData);
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

router.get('/getLocationsByIp', async (req, res) => {
  try {
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
  } catch (error) {}
});

// 根据城市获取城市编码信息
router.get('/getGeocodedInformationByCity', async (req, res) => {
  try {
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
