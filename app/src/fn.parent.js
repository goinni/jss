/*
 * 获取元素的父节点
 */
_jss.fn.parent = function(result){
	var r = null;
	if(result){
		try{
			r = result.parentNode;
			while(!r.tagName) {
				r = r.parentNode;
				if(!r)return;
			}
		}catch(e){}
	}
	
	return r;
}
