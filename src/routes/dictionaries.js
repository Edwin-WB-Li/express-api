const express = require('express');
const router = express.Router();
const DictionariesController = require('../controller/dictionaries/');

// 根据 参数 获取 下拉框数据
router.get('/getDropDownListByType', DictionariesController.getDropDownListByType);

module.exports = router;
