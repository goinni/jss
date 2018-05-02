/*
 * 设置元素innerHtml 
 * @param arr 可以为对象数组或对象
 */
_jss.fn.html = function(arr, text){
	if(!this.isCollection(arr)){
	    arr = [arr];
	}
	// 获取
	if(typeof text == 'undefined'){
		var entity = arr[0];
		return entity.innerHTML;
	}
	if(text.indexOf('<style>')!=-1 || text.indexOf('</style>')!=-1){
		var temp = this.createElementByTagName();
		temp.innerHTML = "x<div>"+innerhtml+"</div>";
		// 设置
		for(var i = 0; i<arr.length; i++){
			var cloneNode = temp.lastChild.cloneNode(true);
			var entity = arr[i];
			entity.appendChild(cloneNode);
		}
	}else{
		// 设置
		for(var i = 0; i<arr.length; i++){
			var entity = arr[i];
			entity.innerHTML = text || "";
		}
	}

}