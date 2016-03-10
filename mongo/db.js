var dbModels = require('./dbModels');
var mongoose = require('mongoose');
var debug = require('debug')('Autumn_Ning_Blog:db');
var async = require('async')
//连接数据库
module.exports = {
	openDb:function(){
		mongoose.connect('mongodb://localhost:27017/blog');
		mongoose.connection.on('open',function(){
			debug('数据库连接成功');
		});
		mongoose.connection.on('error',function(err){
			debug('数据库连接失败:%s',err);
		})
	},
	checkRepeat:function(model,infoObj,cb){
		model.findOne(infoObj,function(err,doc){
			cb(err,doc);
		})
	},
	createDoc:function(model,infoObj,cb){
		model.create(infoObj,function(err,doc){
			cb(err,doc);
		})
	},
	findDoc:function(model,infoObj,cb){
		model.find(infoObj,function(err,docs){
			cb(err,docs);
		})
	},
	deleteDoc:function(model,infoObj,cb){
		model.remove(infoObj,function(err,docs){
			cb(err,docs);
		})
	},
	checkUserInfo:function(infoObj,cb){
		var User = dbModels.getModel('user');
		this.findDoc(User,infoObj,function(err,doc){
			if( err ){
				cb('登陆验证失败'+err);
			} else if (doc){
				cb(null,doc);
			} else {
				cb('用户名／密码不存在');
			}
		})
	},
	/*register:function(infoObj,cb){
		var User = dbModels.getModel('user');
		this.createDoc(User,infoObj,function(err,doc){
			console.log(doc);
		})
	},*/
	saveImgUrl:function(info,cb){
		var that = this;
		var Img = dbModels.getModel('img');
		that.checkRepeat(Img,info,function(err,doc){
			if( err ){
				cb('查重失败'+err);
			} else if( !doc ){
				that.createDoc(Img,info,function(err,doc){
					if( err ){
						cb('保存图片失败'+err);
					} else {
						cb(null);
					}
				})
			} else {
				cb(null,'图片已存在');
			}
		})

	},
	getImgs:function(cb){
		var Img = dbModels.getModel('img');
		this.findDoc(Img,{},function(err,docs){
			if( err ){
				cb('获取图片地址实效'+err);
			} else {
				cb(null,docs);
			}
		})
	},
	getYear:function(cb){
		var Year = dbModels.getModel('years');
		var yearArr = [];
		this.findDoc(Year,{},function(err,docs){
			if( err ){
				cb('获取年份列表失败'+err);
			} else {
				for (var i = 0; i < docs.length; i++) {
					yearArr.push(docs[i].year);
				}
				cb(null,yearArr);
			}
		}) 
	},
	getOneArticle:function(infoObj,cb){
		var Article = dbModels.getModel('article');
		this.findDoc(Article,infoObj,function(err,doc){
			if( err ){
				cb('获取文章错误'+err);
			} else {
				cb(null,doc);
			}
		})
	},
	deleteOneArticle:function(infoObj,cb){
		var Article = dbModels.getModel('article');
		this.deleteDoc(Article,infoObj,function(err,doc){
			if( err ){
				cb('删除文章出错'+err);
			} else {
				cb(null,doc);
			}
		})
	},
	getBlogs:function(cb){
		var Article = dbModels.getModel('article');
		var that = this;
		var blogsInfo = [];
		this.getYear(function(err,docs){
			if( err ){
				cb(err);
				return;
			} else{
				docs.sort(function (a,b){
					return b-a;
				});
				async.eachOfSeries(docs, function(item,index,next) {
					that.findDoc(Article, {
						year: item
					}, function(err, doc) {
						if (err) {
							cb(err);
							return;
						} else {
							blogsInfo[index] = doc;
							next(err);
						}
					})
				}, function(err) {
					process.nextTick(function(){
						cb(err,blogsInfo)
					})
				})
			}
		}) 
	},
	getSectionArticle:function(type,cb){
		var Article = dbModels.getModel('article');
		this.findDoc(Article,{tag:type},function(err,docs){
			if( err ){
				cb('读取类型'+type+'的文章出错'+err);
			} else {
				cb(null,docs);
			}
		})
	},
	postArticle:function(articleInfo,cb){
		var Article = dbModels.getModel('article');
		var Year = dbModels.getModel('years');
		var date = new Date();
		var that = this;
		var addZero = function (num){
			if( num < 10 ){
				return '0'+''+num;
			} else{
				return num;
			}
		}
		var time = {
			date:date,
			year:date.getFullYear(),
			month:date.getFullYear()+'-'+addZero((date.getMonth()+1)),
			day:date.getFullYear()+'-'+addZero((date.getMonth()+1))+'-'+addZero(date.getDate()),
			minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		};
		var articleObj = {
			'tag':articleInfo.tag,
			'year':''+time.year,
			'title':articleInfo.title,
			'article':articleInfo.article,
			'time':time.day
		};

		this.checkRepeat(Year, {
			year: '' + time.year
		}, function(err, doc) {
			if (err) {
				console.log('年份保存失败');
			} else if (!doc) {
				that.createDoc(Year, {
					year: '' + time.year
				}, function(err, doc) {
					if (err) {
						console.log('年份保存失败');
					}
				})
			} else {
				console.log('年份已存在');
			}
		});
		
		this.createDoc(Article,articleObj,function(err,doc){
			if( err ){
				cb('保存文章失败:'+err);
			} else {
				cb(null,doc);
			}
		})
	}
}