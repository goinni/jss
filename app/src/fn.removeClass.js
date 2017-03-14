/*
 * 删除对象中添加class
 * @param arr 可以为对象数组或对象
 */
_jss.fn.removeClass = function(arr, className){
	if(!this.isCollection(arr)){
	    arr = [arr];
	}
    for(var i = 0; i<arr.length; i++){
        var entity = arr[i];
        var entityClass = entity.className || "";
        if(entityClass && this.hasClass(entity, className)){
            entityClass = entityClass.replace(new RegExp('(\\s|^)'+className+'(\\s|$)')," ");
            entity.className = entityClass.trim();
        }
    }

}