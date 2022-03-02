var express = require('express');
var router = express.Router();
const { createPost, getAllPosts, deletePost, updatePost } = require('./controller/postsController');
const { checkIsEmpty, jwtMiddleware, validateCreateData, validateEmail, validateUpdateData } = require('../lib/authMiddleware/index')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello from posts router');
});

// validate user, valid post data is not empty
// should add validation stuff after too
router.post('/create-post', jwtMiddleware, checkIsEmpty, createPost)
router.get('/get-all-post', getAllPosts)
router.delete('/delete-post', deletePost)
router.put('/update-post', updatePost)

module.exports = router;