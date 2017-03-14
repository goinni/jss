/*
 * 根据class获取元素
 */
_jss.fn.getElementsByClass = function(clazzName, entity){
	var cNames,
		cName,
		r = [],
		elems = entity ? entity.getElementsByTagName("*") : (document.all || document.getElementsByTagName("*"));
	for(var i = 0; i<elems.length; i++){
		cName = elems[i].className;//获取当前对象的类名
		if(cName){
			cNames = cName.split(" ");//类名存在，则进行拆分
			for(var j = 0; j<cNames.length; j++){
				if(cNames[j] && cNames[j] == clazzName){
					r.push(elems[i]);//类名存在且与指定的名相同，则存储对象
				}
			}
		}
	}
	elems=cNames=cName=null;
	return r;	
}