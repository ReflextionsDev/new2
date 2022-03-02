var express = require('express');
var router = express.Router();
const { createComment } = require('./controller/commentsController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hello from comments router');
});

module.exports = router;
