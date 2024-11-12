const express = require('express');
const router = express.Router();
const GoodController = require('../controller/goods/');

// 获取商品列表
router.get('/list', GoodController.getGoodList);

module.exports = router;
