/*
 * 克隆对象
 */
_jss.fn.clone = function(json){
	var r = {};
	for(var key in json){
		r[key] = json[key];
	}
	return r;
}
