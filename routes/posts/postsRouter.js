var express = require('express');
var router = express.Router();
const { createPost } = require('./controller/postsController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello from posts router');
});

module.exports = router;
