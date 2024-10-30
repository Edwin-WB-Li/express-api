const express = require('express');
const router = express.Router();
const RecordsController = require('../controller/records/records');
router.get('/getChattingRecords', RecordsController.getChattingRecords);
module.exports = router;
