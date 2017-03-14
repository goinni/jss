/*
 * 设置元素属性
 * @param result dom对象
 * @param params json对象
 */
_jss.fn.setAttr = function(result, params){
	//设置
	if(params && !this.isCollection(result)){
        result = [result];
    }
    for(var i = 0; i<result.length; i++){
        var o = result[i];
        add(o);
    }
    function add(o){
        for(var key in params){
            if(key == "style"){
                o.style.cssText = params[key];
            }else if(key == "class"){
                o.className = params[key];
            }else{
                o.setAttribute(key, params[key]);
            }
        }
    }
}
/*
 * 获取元素属性
 * @param result dom对象
 * @param attrName 属性名
 */
_jss.fn.getAttr = function(result, attrName){
	//获取
	if(attrName == "class"){
        return result.className;
    }else if(attrName == "style"){
        return result.style.cssText;
    }else{
        return result.getAttribute(attrName);
    }
}