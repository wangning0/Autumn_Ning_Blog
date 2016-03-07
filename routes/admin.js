var express = require('express');
var router = express.Router();

router.get('/login',function(req,res,next){
	res.render('admin/login');
})
router.get('/postImg',function(req,res,next){
	res.render('admin/postImg');
})
router.get('/postArticle',function(req,res,next){
	res.render('admin/postArticle');
})
router.get('/blogs',function(req,res,next){
	res.render('admin/blogs');
})
module.exports = router;