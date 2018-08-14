/*
 * 根据标签名获取元素
 * @param tagName 标签名
 * @param entity 在entity下查找指定标签
 * *@param isneed 在entity 是否必须存在
 */
_jss.fn.getElementsByTagName = function(tagName, entity,isneed){
	var r = [], elems = null;
	if(entity){
		elems = entity.getElementsByTagName(tagName);
		r = elems
	}else{
		if(!isneed){
			r = document.getElementsByTagName(tagName);
		}
	}
	return r;	
}
