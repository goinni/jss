/*
 * 隐藏元素
 * @param entity 可以为对象数组或对象
 */
_jss.fn.hide = function(entity){
	this.css(entity, {display: 'none'});
}