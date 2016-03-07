var dbModels = require('./dbModels');
var mongoose = require('mongoose');
var debug = require('debug')('Autumn_Ning_Blog:db')
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
	postArticle:function(article,cb){
		var Article = dbModels.getModel('article');
		var date = new Date();
		var time = {
			date:date,
			year:date.getFullYear(),
			month:date.getFullYear()+'-'+(date.getMonth()+1),
			day:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
			minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		};
		var articleObj = {
		}
		this.createDoc()
	}
}