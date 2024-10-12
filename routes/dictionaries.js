const express = require('express');
const router = express.Router();

// 假设有一个 DictionariesController来处理业务逻辑
const DictionariesController = require('../controller/dictionaries/dictionaries');

// 根据 role 获取菜单列表
router.get(
  '/getDropDownListByType',
  DictionariesController.getDropDownListByType
);

module.exports = router;
