/*
 * 元素是否有指定class
 * @param result 	 指定的对象
 * @param className  是否包含的类名
 */
_jss.fn.hasClass = function(result, className){

	return new RegExp('(\\s|^)'+className+'(\\s|$)').test(result.className);
}