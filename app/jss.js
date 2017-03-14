/*
 * jss前端框架
 */
(function(){
	_jss = window.jss =function(name){
		if(typeof name === 'object' && name.isJss){
			//jss对象传入时直接返回
			return name;
		}else{
			return _jss.fn.selector(name);
		}
	}
	_jss.fn = jss.prototype;
})();