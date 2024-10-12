const express = require('express');
const router = express.Router();
const address = require('address');
const axios = require('axios');
const ora = require('ora');
const chalk = require('chalk');
// const device = require('device');
// const UAParser = require('ua-parser-js');

router.get('/districts', (req, res) => {

  // 创建一个 ora 旋转加载指示器
  const spinner = ora({
    text: '获取本地 IP 地址...',
    color: 'cyan',
    interval: 80,
    isSilent: false,
    spinner: 'dots'
  }).start();
  // 获取本地 IP 地址
  const ipAddress = address.ip();

  if (!ipAddress) {
    spinner.fail(chalk.red('无法获取本地 IP 地址'));
    return;
  }
  // 获取 User-Agent 头部信息
  // const userAgent = req.headers['user-agent'];
  // 分析 User-Agent 并获取设备信息
  // const info = device(userAgent);

  // 创建 UAParser 实例并解析 User-Agent
  // const parser = new UAParser(userAgent);
  // const parser = new UAParser();
  // const result = parser.getResult();

  // console.log('userAgent:', userAgent);
  // console.log('----------------------');
  // console.log('info:', info);
  // console.log('----------------------');
  // console.log('result:', result);

  spinner.text = `本地 IP 地址: ${ipAddress}`;
  console.log(`本地 IP 地址: ${ipAddress}`);

  // 使用地理定位 API 将 IP 地址转换为地理位置
  const geoApiUrl = `https://ipapi.co/${ipAddress}/json/`;
  // const geoApiUrl = `http://ip-api.com/json/${ipAddress}`;

  axios.get(geoApiUrl)
    .then(response => {
      const locationData = response.data;
      if (!locationData || Object.keys(locationData).length === 0) {
        spinner.fail(chalk.red('无法获取地理位置信息: API 返回空数据'));
        return res.status(500).json({
          code: 500,
          message: '无法获取地理位置信息: API 返回空数据'
        });
      }
      spinner.succeed(chalk.green(`地理位置信息:`));
      console.log(`ip: ${locationData.ip}`);
      res.status(200).json({
        code: 200,
        message: 'success',
        data: locationData
      })
    })
    .catch(error => {
      spinner.fail(chalk.red('无法获取地理位置信息:', error.message));
      return res.status(500).json({
        code: 500,
        message: '无法获取地理位置信息:',
        error: error.message
      });
    });
});

module.exports = router;