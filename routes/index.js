var express = require('express');
var router = express.Router();
var db = require('../mongo/db');
var markdown = require('markdown').markdown;
/* 实现网页路由 */
router.get('/', function(req, res, next) {
  req.session.user = null;
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
router.get('/getCodeArticle',function(req,res,next){
	db.getSectionArticle('代码',function(err,docs){
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
router.get('/getLifeArticle',function(req,res,next){
	db.getSectionArticle('生活',function(err,docs){
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
router.get('/blog/getOneArticle',function(req,res,next){
	res.render('showArticle',{
		admin:req.session.user
	});
});
router.get('/blog/searchArticle', function(req, res, next) {
	var articleId = req.query.id;
	var infoObj = {
		"_id": articleId
	}
	db.getOneArticle(infoObj, function(err, docs) {
		if (err) {
			res.send({
				status: 1,
				msg: err
			})
		} else {
			docs.forEach(function(doc){
				doc.article = markdown.toHTML(doc.article);
			});
			res.send({
				status: 0,
				body: docs
			})
		}
	})
});
router.get('/blog/delete',function(req,res,next){
	var articleId = req.query.id;
	var infoObj = {
		'_id':articleId
	};
	db.deleteOneArticle(infoObj,function(err,doc){
		if (err || !doc) {
			res.send({
				status: 1,
				msg: err || '删除失败'
			})
		} else {
			res.redirect('/admin/blog')
		}
	})
})
module.exports = router;







