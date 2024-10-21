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

router.get('/getWeathersByIp', async (req, res) => {
  // 城市编码
  try {
    // token 校验
    // await verifyToken(req, res);
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
    console.log('locationsData--->', locationsData);
    console.log('weathersData--->', weathersData);
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
