/**
 * 获取浏览器参数名称
 * @param name 浏览器地址参数名
 */
 _jss.fn.queryUrlParam = function(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURIComponent(r[2]); 
    return null;
}
