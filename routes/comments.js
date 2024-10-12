const express = require('express');
const router = express.Router();

const CommentsController = require('../controller/comments/comments');

router.get('/getCommentsList', CommentsController.getCommentsList);
router.post('/replayToComments', CommentsController.replayToComments);

module.exports = router;
