/*
 * 向元素后加入一个或多个元素
 */
_jss.fn.append = function(result, obj){
	if(typeof obj == 'string'){
		obj = document.createTextNode(obj);
	}
	if(!this.isCollection(obj)){
        obj = [obj];
    }
    for(var i = 0; i<obj.length; i++){
    	result.appendChild(obj[i]);
    }
	return obj;
}