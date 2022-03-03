var express = require('express');
var router = express.Router();
const { createComment, getAllComments, deleteComment, updateComment } = require('./controller/commentsController');
const { checkIsEmpty, jwtMiddleware } = require('../lib/authMiddleware/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello from comments router');
});

// must bring in post ID
router.post('/create-comment', jwtMiddleware, checkIsEmpty, createComment)
router.get('/get-all-comment', getAllComments)
router.put('/update-comment', jwtMiddleware, checkIsEmpty, updateComment)
router.delete('/delete-comment/:id', jwtMiddleware, deleteComment)

module.exports = router;