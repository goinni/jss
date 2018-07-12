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
	text =text+'';
	if(text.indexOf('<style>')!=-1 || text.indexOf('<STYLE>')!=-1){
		// 设置
		for(var i = 0; i<arr.length; i++){
			var temp = this.createElementByTagName('div');
			temp.innerHTML = "x<div>"+text+"</div>";
			var entity = arr[i];
			entity.appendChild(temp.lastChild);
		}
	}else{
		// 设置
		for(var i = 0; i<arr.length; i++){
			var entity = arr[i];
			entity.innerHTML = text || "";
		}
	}

}