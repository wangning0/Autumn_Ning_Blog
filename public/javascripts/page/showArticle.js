(function() {
	var xhr;
	createXhr();
	var id = GetQueryString('id');
	console.log(id);
	xhr.open('get', '/blog/searchArticle?id='+id,true);
	xhr.onreadystatechange = function(){
		if( xhr.readyState == 4 ){
			if( (xhr.status>=200 && xhr.status<300) || xhr.status == 304 ){
				var res = eval('('+xhr.responseText+')');
				var mod_archive_item = document.getElementById('mod_archive_item');
				mod_archive_item.innerHTML = res.body[0].article;
			}
		}
	}
	xhr.send(null);


	function createXhr() {
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
	function getElementsByClass(className,tagName){
		if( document.getElementsByClassName ){
			return document.getElementsByClassName(className);
		} else {
			tagName = tagName || '*';
			var tag = document.getElementsByTagName(tagName);
			var result = [];
			for( var i = 0;i<tag.length;i++ ){
				var n = tag[i].className.split(' ');
				for( var j=0;j<n.length;j++ ){
					if( n[j] == className ){
						result.push(tag[i]);
					}
				} 
			}
			return result;
		}
	}

})()