/*
 * 根据标签名获取元素
 * @param tagName 标签名
 * @param entity 在entity下查找指定标签
 */
_jss.fn.getElementsByTagName = function(tagName, entity){
	var r = [], elems = null;
	if(entity){
		elems = entity.getElementsByTagName('*');
		for(var i = 0; i < elems.length; i++){
			var item = elems[i];
			if(item.tagName == tagName.toLocaleUpperCase()){
				r.push(item);
			}
		}
	}else{
		r = document.getElementsByTagName(tagName);	
	}	
	return r;	
}
