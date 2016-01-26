var db = require('./connectDb')
var mongoose = require('mongoose');
function postMongo() {
	this.articlesInfoSchema = new mongoose.Schema({
		name: {
			type: String
		},
		title: {
			type: String
		},
		time: {
			type: Date,
			default: Date.now
		},
		author: {
			type: String
		},
		article: {
			type: String
		}
	}, {
		collection: 'articles'
	});
	this.articlesInfoModel = db.model('articles', this.articlesInfoSchema);

}

postMongo.prototype.setArticle = function(name, obj, callback) {
	this.articlesInfoModel.create({
		'name': name,
		'title': obj.title,
		'author': obj.author,
		'article': obj.article
	}, function() {
		callback()
	})
}
postMongo.prototype.getArticles = function(name, callback) {
	this.articlesInfoModel.find({
		'name': name
	}, function(err, docs) {
		callback(err, docs);
	})
}


module.exports = postMongo;