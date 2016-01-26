var express = require('express');
var router = express.Router();
var Mongo = require('../models/db');
var db = new Mongo();
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});
router.get('/register', function(req, res, next) {
	res.render('register');
})
router.post('/login', function(req, res, next) {
	db.getInfo(req.body, function(err) {
		if (err) {
			res.redirect('/');
		} else {
			req.session.username = req.body.username;
			res.redirect('/users/article?'+req.session.username);
		}
	})
})
router.post('/register', function(req, res, next) {
	db.setInfo(req.body, function(err) {
		if (err) {
			res.redirect('/register');
		} else {
			res.redirect('/');
		}
	})
})
router.get('/modifyPassword',function(req,res,next){
	res.render('modifyPassword',{
			username:req.session.username
		})
})
router.post('/modifyPassword',function(req,res,next){
	var obj = {username:req.session.username,password:req.body.password,newPassword:req.body.newPassword,ReNewPassword:req.body.ReNewPassword};
	db.modifyPassword(obj,function(){
		res.redirect('http://localhost:3000');
	})
})
router.get('/logout',function(req,res,next){
	req.session.username = null;
	res.redirect('/');
})
module.exports = router;