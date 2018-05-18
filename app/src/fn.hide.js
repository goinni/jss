/*
 * 隐藏元素
 * @param entity 可以为对象数组或对象
 */
_jss.fn.hide = function(entity,speed,cbk){
	var _t = this;
	var time = speed/10;
	if(speed){
		var num = 10;
		var outId = setInterval(function(){
			num--;
			_t.css(entity, {opacity:num/10,filter: 'alpha(opacity='+(num*10)+')'});
			if(num<=0){
				clearInterval(outId);
				cbk && cbk();
			}
		},time)
	}else{
		this.css(entity, {display: 'none'});
	}
};