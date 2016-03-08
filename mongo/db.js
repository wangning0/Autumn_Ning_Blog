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
	getBlogs:function(cb){
		var Article = dbModels.getModel('article');
		var that = this;
		var blogsInfo = {};
		this.getYear(function(err,docs){
			if( err ){
				cb(err);
				return;
			} else{
				async.eachSeries(docs, function(item, next) {
					that.findDoc(Article, {
						year: item
					}, function(err, doc) {
						if (err) {
							cb(err);
							return;
						} else {
							blogsInfo[item] = doc;
							console.log(1);
							console.log(!next());
							next(err);
						}
					})
				}, function(err) {
					//console.log(2);
					cb(err,blogsInfo);
				})
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