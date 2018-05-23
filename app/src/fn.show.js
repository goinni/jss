/*
 * 显示元素
 * @param entity 可以为对象数组或对象
 */
_jss.fn.show = function(entity,speed,cbk){
	var _t = this;
	var time = speed/10;
	if(speed){
		var num = 0;
		if(entity.showIntervalId){
			clearInterval(entity.showIntervalId);
		}
		entity.showIntervalId = setInterval(function(){
			num++;
			_t.css(entity, {display: 'block',opacity:num/10,filter: 'alpha(opacity='+(num*10)+')'});
			if(num>=10){
				clearInterval(entity.showIntervalId);
				entity.showIntervalId = null;
				cbk && cbk();
			}
		},time)
	}else if(speed==0){
		this.css(entity, {display: 'block',opacity:10,filter: 'alpha(opacity=100)'});
	}else{
		this.css(entity, {display: 'block'});
	}
}