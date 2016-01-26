var db = require('./connectDb')
var mongoose = require('mongoose');
var crypto = require('crypto');
function getHash(str) {
	var sha1 = crypto.createHash('sha1');
	return sha1.update(str).digest('hex');
}
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
Mongo.prototype.modifyPassword = function(obj, callback) {
	var that = this;
	obj.password = getHash(obj.password);
	this.infoModel.find({
		'username': obj.username,
		'password': obj.password,
	}, function(err, doc) {
		if( doc.length != 0 && obj.newPassword == obj.ReNewPassword){
			obj.newPassword = getHash(obj.newPassword);
			that.infoModel.update({name:obj.username},{$set:{password:obj.newPassword}},function(){
				callback();
			})
		}
	})
}

module.exports = Mongo;