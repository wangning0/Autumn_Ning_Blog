var express = require('express');
var router = express.Router();

/* 实现网页路由 */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/blog',function(req,res,next){
	res.render('blog');
})
router.get('/coding',function(req,res,next){
	res.render('coding');
});
router.get('/life',function(req,res,next){
	res.render('life');
});
router.get('/links',function(req,res,next){
	res.render('links');
});
router.get('/about',function(req,res,next){
	res.render('about');
});

module.exports = router;
