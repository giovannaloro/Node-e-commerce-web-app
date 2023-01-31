var express = require('express');
var router = express.Router();

/* GET index */
router.get('/', function(req, res, next) {
    res.render('index',{title:'Express',link:'/test',array: [
      "key1",
      "key2",
      "key3"
    ]});
  });

  /* GET test */
router.get('/test', function(req, res, next) {
    res.render('test',{title:'Test'});
  });

module.exports = router;
