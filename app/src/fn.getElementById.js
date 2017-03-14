/*
 * 根据id获取元素
 * @param id 根据id获取元素
 * @param entity 在entity下查找指定id
 */
_jss.fn.getElementById = function(id, entity){
	var r = null, elems = null;
	if(entity){
		elems = entity.getElementsByTagName('*');
		for(var i = 0; i < elems.length; i++){
			var item = elems[i];
			if(item.id == id){
				return item;
			}
		}
	}else{
		r = document.getElementById(id);
	}	
	return r;	
}