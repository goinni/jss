/*
 * 删除指定dom元素
 */
_jss.fn.remove = function(result){
    if(!result){
        return;
    }
    if(!this.isCollection(result)){
        result = [result];
    }
    for(var i = 0; i<result.length; i++){
        this.parent(result[i]).removeChild(result[i]);
    }
}