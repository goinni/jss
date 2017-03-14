/*
 * 获取元素子节点
 * @param result dom对象
 */
_jss.fn.children = function(result){
	var r = [],nodes = result.childNodes;
	for(var i=0; i<nodes.length; i++) {
		if(nodes[i].tagName) r.push(nodes[i]);
	}
	return r;
}