module.exports = function(req, res) {
	if( !req.session.user ){
		res.redirect('/admin/login');
	}
}