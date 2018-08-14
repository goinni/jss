/*
 * 判断对象是否为集合(包含html集合和普通数组对象)
 * @param entity 	 指定的对象
 */
_jss.fn.isCollection = function(entity){

	return this.isArray(entity) || this.isHTMLCollection(entity);
}
/*
 * 判断是否为数组
 */
_jss.fn.isArray = function(entity){
    return Object.prototype.toString.call(entity) === "[object Array]";
},
/*
 * 判断是否为数组
 */
_jss.fn.isHTMLCollection = function(entity){
    return (entity.length != null &&  typeof entity !== "string")|| Object.prototype.toString.call(entity) === "[object HTMLCollection]" ||
           Object.prototype.toString.call(entity) === "[object NodeList]";
}