(function(){
	var uploadFile = getElementsByClass('uploadFile')[0];
	var uploadImg = getElementsByClass('uploadImg')[0];
	var form = document.getElementById('myForm');
	var body = document.body;

	eventListener(uploadFile,'change',function(e){
		form.submit();
		var newWindow = document.getElementById('newWindow');
		eventListener(newWindow,'load',function(){
			var h = newWindow.contentWindow.document.getElementsByTagName('pre')[0].innerHTML;
			h = JSON.parse(h);
			if( h.status == 0 ){
				uploadImg.style.backgroundImage = "url("+ h.body+ ")";
				body.removeChild(newWindow);
				var newWindowl = document.createElement('iframe');
				newWindowl.setAttribute('name','newWindow');
				newWindowl.setAttribute('id','newWindow');
				newWindowl.style.display = 'none';
				body.appendChild(newWindowl);
			}
		})
	})
	function eventListener(obj,eName,callback){
		if( obj.addEventListener ) {
			obj.addEventListener(eName,callback);
		} else if( obj.attachEvent ){
			obj.attachEvent('on'+eName,callback);
		}
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