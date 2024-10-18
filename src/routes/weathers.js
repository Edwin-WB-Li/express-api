const express = require('express');
const axios = require('axios');
const router = express.Router();
const Joi = require('joi');
const { verifyToken, handleError, handleServerError } = require('../utils/');

// 高德天气 API 的 URL 和 API Key
const MAP_WEATHER_URL = 'https://restapi.amap.com/v3/weather/weatherInfo';
const API_KEY = 'ebb2af0469abefe92ebfdbde548aca07';

router.get('/weathers', async (req, res) => {
  // 城市编码
  try {
    // token 校验
    // await verifyToken(req, res);
    const schema = Joi.object({
      // 城市编码
      city: Joi.string().required(),
      // key: Joi.string().required(),
    });
    // 对请求参数进行验证
    const { error, value } = schema.validate(req.query);
    if (error) {
      const errorMessage = handleError(error);
      return res.status(400).json({
        code: 400,
        message: errorMessage,
        data: null,
      });
    }
    const { city } = value;

    const response = await axios.get(MAP_WEATHER_URL, {
      params: {
        city,
        key: API_KEY,
        extensions: 'base',
      },
    });
    if (response.data.status !== '1') {
      return res.status(400).json({
        code: 400,
        message: `获取天气数据失败: ${response.data.info}`,
        data: null,
      });
    } else {
      return res.status(200).json({
        code: 200,
        message: 'Weather data fetched successfully',
        data: response.data,
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
