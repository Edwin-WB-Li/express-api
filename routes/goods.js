const express = require('express');
const router = express.Router();

// 假设有一个usersController来处理业务逻辑
const GoodController = require('../controller/goods/goods');

// 获取商品列表
router.get('/list', GoodController.getGoodList);

module.exports = router;
