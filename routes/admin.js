var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var db = require('../mongo/db');
var encrypt = require('../cryptoHash/encrypt');
var checkAuthor = require('./checkAuthor');
var router = express.Router();


router.get('/login',function(req,res,next){
	res.render('admin/login');
});
router.post('/login',function(req,res,next){
	var password = req.body.password;
	password = encrypt.encrypt(password);
	var infoObj = {
		name : req.body.name,
		password : password
	}
	db.checkUserInfo(infoObj,function(err,doc){
		if( err || !(doc.length)){
			console.log(doc);
			res.redirect('/admin/login');
		} else if(doc.length){
			req.session.user = req.body.name;
			res.redirect('/admin/blog');
		}
	})
});
router.get('/logout',function(req,res,next){
	checkAuthor(req,res);
	req.session.user == null;
	res.redirect('/');
})
router.get('/postImg',function(req,res,next){
	checkAuthor(req,res);
	res.render('admin/postImg');
});
router.get('/postArticle',function(req,res,next){
	checkAuthor(req,res);
	res.render('admin/postArticle');
});
router.get('/blog',function(req,res,next){
	checkAuthor(req,res);
	res.render('admin/blogs');
});
router.get('/getOneArticle',function(req,res,next){
	checkAuthor(req,res);
	db.getOneArticle({'_id':req.query.id},function(err,doc){
		if( err ){
			res.send({
				status:1,
				msg:err
			})
		} else {
			res.send({
				status:0,
				body:doc
			})
		}
	})
});
router.get('/getAllImgs', function(req, res, next) {
	checkAuthor(req,res);
	db.getImgs(function(err, docs) {
		if (err) {
			res.send({
				status: 1,
				msg: err
			});
		} else {
			res.send({
				status:0,
				msg:'',
				body:docs
			})
		}
	})
});
router.get('/modify',function(req,res,next){
	checkAuthor(req,res,next);
	res.render('admin/modifyArticle');
});

router.get('/register',function(req,res,next){	
	db.register({name:'Autumn_Ning',password:'5a0c78c6611d08aee5e449e56de847653803b176'},function(){	
	})
});

router.post('/postArticle',function(req,res,next){
	db.postArticle(req.body,function(err,doc){
		if( err ){
			res.send({
				status: 1,
				msg: err
			});
		} else {
			res.send({
				status:0,
				msg:'',
				body:doc
			})
		}
	})
})
/*router.post('/blog/modify',function(req,res,next){
	checkAuthor(req,res,next);
});*/
router.post('/uploadImg',function(req,res,next){
	var form = new formidable.IncomingForm();
	form.uploadDir = 'public/avator/';
	form.keepExtensions = true;
	form.maxFieldsSize = 10 *1024 * 1024;

	form.parse(req,function(err,fields,files){
		if( err ){
			res.render('error',{error:err});
			return false;
		} 

		var extName = '';	//后缀名
		
		switch (files.file.type) {
			case 'image/pjpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
			case 'image/gif':
				extName = 'gif';
		}
		if( extName.length == 0 ){
			res.render('error',{error:'不支持该图片格式'});
			return;
		} 
		var avatarName = files.file.name;
		var newPath = form.uploadDir + avatarName;
		var imgSrc = '../avator/'+avatarName;
		var imgInfo = {
			"imgSrc":imgSrc
		};
		fs.renameSync(files.file.path,newPath);
		db.saveImgUrl(imgInfo,function(err,msg){
			if(err){
				res.send({
					status:1,
					msg:err
				});
			} else {
				res.send({
					status:0,
					msg:msg,
					body:'../avator/' + avatarName
				});
			}
		});
	})
});

module.exports = router;






