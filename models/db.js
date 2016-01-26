var db = require('./connectDb')
var mongoose = require('mongoose');
var crypto = require('crypto');
function getHash(str) {
	var sha1 = crypto.createHash('sha1');
	return sha1.update(str).digest('hex');
}
db.connection.on('open', function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('数据库连接成功');
	}
});

function Mongo() {
	this.infoSchema = new mongoose.Schema({
		username: {
			type: String
		},
		password: {
			type: String
		}
	}, {
		collection: 'info'
	});
	this.infoModel = db.model('info', this.infoSchema);
}
Mongo.prototype.setInfo = function(obj, callback) {
	var that = this;
	this.infoModel.find({
		'username': obj.username
	}, function(err, doc) {
		if (doc.length != 0) {
			callback('该ID被占用');
		} else if (obj.password != obj.repassword) {
			callback('两次密码输入不同');
		} else {
			obj.password = getHash(obj.password);
			that.infoModel.create({
				'username': obj.username,
				'password': obj.password
			}, function() {
				callback();
			})
		}
	})
}
Mongo.prototype.getInfo = function(obj, callback) {
	obj.password = getHash(obj.password);
	this.infoModel.find({
		'username': obj.username,
		'password': obj.password
	}, function(err, doc) {
		if (doc.length == 0) {
			callback('账号或密码不正确');
		} else {
			callback();
		}
	})
}
Mongo.prototype.getInfoById = function(id, callback) {
	this.infoModel.find({
		'username': id
	}, function(err, doc) {
		if (err) {
			callback(err);
		} else {
			callback(null, doc);
		}
	})
}

Mongo.prototype.modifyPassword = function(obj, callback) {
	var that = this;
	obj.password = getHash(obj.password);
	this.infoModel.find({
		'username': obj.username,
		'password': obj.password,
	}, function(err, doc) {
		if( doc.length != 0 && obj.newPassword == obj.ReNewPassword){
			obj.newPassword = getHash(obj.newPassword);
			console.log(obj.password);
			console.log(obj.newPassword);
			that.infoModel.update({username:obj.username},{ $set: { password: obj.newPassword}},function(err,doc){
				callback();
			})
		}
	})
}

Mongo.prototype.getInfo = function(obj, callback) {
	var that = this;
	obj.password = getHash(obj.password);
	this.infoModel.find({
		'username': obj.username,
		'password': obj.password
	}, function(err, doc) {
		if (doc.length == 0) {
			callback('账号或密码不正确');
		} else {
			callback();
		}
	})
}

module.exports = Mongo;