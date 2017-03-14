/*
 * 切换样式
 * @param result       被切换样式的dom对象
 * @param className	   样式名
 */
_jss.fn.toggleClass = function(result, className){
	if(!this.isCollection(result)){
        result = [result];
    }
    for(var i = 0; i<result.length; i++){
        var entity = result[i];
        var entityClass = entity.className || "";
        var newCName = "";
        if(entityClass && this.hasClass(entity, className)){
            newCName = entityClass.replace(new RegExp('(\\s|^)'+className+'(\\s|$)')," ");
        }else{
            newCName = (entityClass + " " + className);
        }
        newCName = newCName.replace(new RegExp('(\\s\\s)'), " "); //去掉连续空格
        entity.className = newCName;
    }
}