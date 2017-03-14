/*
 * 根据id获取元素
 */
_jss.fn.createElementByTagName = function(elementName){
	var r = null;
	//兼容处理SVG元素创建
	if(elementName == "svg" || 
		elementName == "rect" ||
		elementName == "circle" ||
		elementName == "ellipse" ||
		elementName == "line" ||
		elementName == "polyline" ||
		elementName == "polygon" || 
		elementName == "path"){

		r = document.createElementNS('http://www.w3.org/2000/svg',elementName);
	}else{

		r = document.createElement(elementName);
	}	
	return r;	
}