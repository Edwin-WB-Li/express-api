const express = require('express');
const router = express.Router();
const RecordsController = require('../controller/records/');

// 获取聊天记录
router.get('/getChattingRecords', RecordsController.getChattingRecords);

module.exports = router;
