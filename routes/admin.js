var express = require('express');
var formidable = require('formidable');
var fs = require('fs');

var router = express.Router();

router.get('/login',function(req,res,next){
	res.render('admin/login');
});
router.get('/postImg',function(req,res,next){
	res.render('admin/postImg');
});
router.get('/postArticle',function(req,res,next){
	res.render('admin/postArticle');
});
router.get('/blogs',function(req,res,next){
	res.render('admin/blogs');
});


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
		console.log('222',files.file.type);
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

		fs.renameSync(files.file.path,newPath);
		res.send({
			status:0,
			msg:'上传成功',
			body:'avator/' + avatarName
		});
	})
})
module.exports = router;






