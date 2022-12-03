const express = require('express');
const router = express.Router();

const commentController = require('../app/controllers/CommentController');

router.post('/postcomment', commentController.postComment);
router.get('/:id', commentController.getCommentByProduct);

module.exports = router;