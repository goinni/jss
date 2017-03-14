/*
 * 向指定对象中添加class
 * @param arr 可以为对象数组或对象
 */
_jss.fn.addClass = function(arr, newclass){
	if(!this.isCollection(arr)){
	    arr = [arr];
	}
	for(var i = 0; i<arr.length; i++){
	    var entity = arr[i];
	    var boo = this.hasClass(entity, newclass);
	    if(!boo){
	        entity.className +=" "+newclass;
	    }
	}

}