const express = require('express');
const axios = require('axios');
const router = express.Router();
const Joi = require('joi');
const { verifyToken, handleError, handleServerError } = require('../utils/');

// IP API
const IP_API_URL = 'https://openapi.lddgo.net/base/gtool/api/v1/GetIp';
const LOCATIONS_API_URL =
  'https://openapi.lddgo.net/base/gservice/api/v1/GetIpAddress';

router.get('/locations', async (req, res) => {
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
    const ipResponse = await axios.get(IP_API_URL);
    const ip = ipResponse?.data?.data?.ip;
    console.log('ip--->', ip);
    if (!ip) {
      return res.status(400).json({
        code: 400,
        message: `无法获取当前ip信息`,
        data: null,
      });
    }
    const locationsResponse = await axios.post(LOCATIONS_API_URL, {
      ip: ip,
    });
    const locationsData = locationsResponse?.data?.data;
    if (!locationsData) {
      return res.status(400).json({
        code: 400,
        message: `无法获取当前所在位置信息`,
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

module.exports = router;
