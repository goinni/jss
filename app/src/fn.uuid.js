/*
 * 获取唯一的编号
 */
_jss.fn.uuid = function(){
	window._____uuid = (window._____uuid || 1000) + 1;
    return window._____uuid;
}