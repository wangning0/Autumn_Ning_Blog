var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongo = require('../models/db');
var PostMongo = require('../models/postDb');
var postDb = new PostMongo();


/* GET users listing. */
router.get('/article',function(req, res, next) {
  postDb.getArticles(req.session.username,function(err,docs){
		res.render('user',{
			username:req.session.username,
			articles:docs
		})
	})
});
router.get('/post',function(req,res,next){
	res.render('post');
})
router.post('/post',function(req,res,next){
	postDb.setArticle(req.session.username,req.body,function(){
		res.redirect('/users/article?'+req.session.username);
	})
})
function authorityCheck(req,res,next){
	if(req.session.name){
		next();
	} else {
		req.flash('error','请登录');
		res.redirect('/');
	}
}
module.exports = router;
