/*
 * 设置元素innerHtml 
 * @param arr 可以为对象数组或对象
 */
_jss.fn.html = function(arr, text){
	if(!this.isCollection(arr)){
	    arr = [arr];
	}
	for(var i = 0; i<arr.length; i++){
	    var entity = arr[i];
	    entity.innerHTML = text || "";
	}
}