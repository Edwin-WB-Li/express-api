const express = require('express');
const router = express.Router();
const CommentsController = require('../controller/comments/');

// 获取评论列表
router.get('/getCommentsList', CommentsController.getCommentsList);
// 新增评论回复
router.post('/replayToComments', CommentsController.replayToComments);

module.exports = router;
