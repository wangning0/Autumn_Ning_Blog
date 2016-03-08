var express = require('express');
var router = express.Router();
var db = require('../mongo/db');
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

router.get('/getBlog',function(req,res,next){
	db.getBlogs(function(err,docs){
		if( err ){
			res.send({
			status:1,
			msg:err
			})
		} else {
			res.send({
			status:0,
			body:docs
			})
		}
	})
});	
module.exports = router;
