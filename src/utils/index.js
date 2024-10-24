const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Joi = require('joi');
// const ora = require('ora');
// const spinner = ora('').start();
// const logSymbols = require('log-symbols');
const AMAP_API_KEY = 'ebb2af0469abefe92ebfdbde548aca07';
const AMAP_GEOCODED_INFORMATION_API_KEY = '26a731b3dde6459027bfc12c56590bb0';
const IP_API_URL = 'https://openapi.lddgo.net/base/gtool/api/v1/GetIp';
const AMAP_GEOCODED_INFORMATION_API_URL =
  'https://restapi.amap.com/v3/geocode/geo';
const LOCATIONS_API_URL =
  'https://openapi.lddgo.net/base/gservice/api/v1/GetIpAddress';
const AMAP_LOCATIONS_API_URL = 'https://restapi.amap.com/v3/ip';
const AMAP_WEATHER_URL = 'https://restapi.amap.com/v3/weather/weatherInfo';

// 获取 ip
async function fetchIp() {
  try {
    const response = await axios.get(IP_API_URL);
    return response?.data?.data?.ip;
  } catch (error) {
    throw new Error(`Failed to fetch IP data: ${error.message}`);
  }
}
// 获取 位置信息
async function fetchLocations(ip) {
  try {
    const schema = Joi.string().ip().required();
    const { error } = schema.validate(ip);
    if (error) {
      const errorMessage = handleError(error);
      throw new Error(errorMessage);
    }
    const response = await axios.post(LOCATIONS_API_URL, {
      ip,
    });
    return response?.data?.data;
  } catch (error) {
    const errorMessage = handleServerError(error);
    throw new Error(`Failed to fetch Locations data: ${errorMessage}`);
  }
}

// 根据 城市编码获取天气信息
async function fetchWeathersByCityCode(params) {
  try {
    const schema = Joi.object({
      key: Joi.string().required(),
      city: Joi.string().required(),
    });
    const { error } = schema.validate(params);
    if (error) {
      const errorMessage = handleError(error);
      throw new Error(errorMessage);
    }
    const { key, city } = params;
    const response = await axios.get(AMAP_WEATHER_URL, {
      params: {
        city,
        key,
        extensions: 'base',
      },
    });
    return response?.data;
  } catch (error) {
    throw new Error(`Failed to fetch Weathers data: ${error.message}`);
  }
}
// 根据 ip 获取 城市信息
async function fetchLocationsByIp(params) {
  try {
    const schema = Joi.object({
      key: Joi.string().required(),
      ip: Joi.string().ip().required(),
    });
    const { error } = schema.validate(params);
    if (error) {
      const errorMessage = handleError(error);
      throw new Error(errorMessage);
    }
    const { key, ip } = params;
    const response = await axios.get(AMAP_LOCATIONS_API_URL, {
      params: {
        key,
        ip,
      },
    });
    return response?.data;
  } catch (error) {
    const errorMessage = handleServerError(error);
    throw new Error(`Failed to fetch Locations data: ${errorMessage}`);
  }
}

// 获取 城市编码信息
async function fetchGeocodedInformation(params) {
  try {
    const schema = Joi.object({
      key: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
    });
    const { error } = schema.validate(params);
    if (error) {
      const errorMessage = handleError(error);
      throw new Error(errorMessage);
    }
    const { key, address, city } = params;
    const response = await axios.get(
      `${AMAP_GEOCODED_INFORMATION_API_URL}?key=${key}&address=${address}&city=${city}`
    );
    return response?.data;
  } catch (error) {
    throw new Error(`Failed to fetch Locations data: ${error.message}`);
  }
}

// 生成 token
function createToken(data, expiresInHours = 24) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return jwt.sign(
    {
      data, // 将被加密的用户信息
      // iat: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 单位是秒
      // 签发时间
      iat: nowInSeconds,
      // 设置过期时间为当前时间加上有效时长
      exp: nowInSeconds + expiresInHours * 60 * 60,
    },
    'token'
  );
}

// 校验 token
function verifyToken(req, res) {
  return new Promise((resolve, reject) => {
    // 接收 token
    const token = req.headers.authorization;
    if (!token) {
      console.error(chalk.red('No token provided'));
      return res.status(401).json({
        code: 401,
        message: 'No token provided',
        data: null,
      });
    }
    try {
      // 验证 token
      var decoded = jwt.verify(token, 'token');
      // 检查是否过期
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        console.error(chalk.red('Token has expired'));
        res.status(401).json({
          code: 401,
          message: 'Token has expired',
          data: null,
        });
        return;
      }
      resolve(decoded.data);
    } catch (err) {
      console.error(chalk.red(err));
      res.status(401).json({
        code: 401,
        message: err || 'token invaild',
        data: null,
      });
    }
  });
}

function handleError(error = []) {
  console.error(chalk.red('Check error, Input error ---------> ', error));
  if (error.details) {
    const errorDetails = error?.details?.map((detail) => detail.message);
    return errorDetails.toString();
  }
  return error.message;
}

function handleServerError(error) {
  console.error(chalk.red('server error ---------> ', error));
  let errorMessage = '服务器错误';
  if (error?.message) {
    errorMessage = error?.message;
  }
  return errorMessage;
}

// 提取设备类型判断逻辑
function getDeviceType(userAgent) {
  if (/mobile/i.test(userAgent)) return 'Mobile';
  if (/tablet/i.test(userAgent)) return 'Tablet';
  return 'PC';
}

// 提取操作系统判断逻辑
function getOS(userAgent) {
  if (/windows/i.test(userAgent)) return 'Windows';
  if (/macintosh|mac os x/i.test(userAgent)) return 'Mac';
  if (/linux/i.test(userAgent)) return 'Linux';
  if (/android/i.test(userAgent)) return 'Android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'iOS';
  return 'Unknown OS';
}

module.exports = {
  createToken,
  verifyToken,
  handleServerError,
  handleError,
  fetchIp,
  fetchLocations,
  fetchGeocodedInformation,
  fetchWeathersByCityCode,
  fetchLocationsByIp,
  getDeviceType,
  getOS,
  AMAP_API_KEY,
  AMAP_GEOCODED_INFORMATION_API_KEY,
  LOCATIONS_API_URL,
  IP_API_URL,
  AMAP_GEOCODED_INFORMATION_API_URL,
  AMAP_WEATHER_URL,
};
