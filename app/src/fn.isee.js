/*
 * 基础选择器
 * @param target 字符串（#id,.class,div等）或对象（原生dom对象）
 * @param obj 为jss对象
 * @param isFind 是否在现有reslut基础上进行查找 
 */
_jss.fn.isee = function(target, obj, isFind){
		//find();参数为空时，则查找所有
		if(isFind && !target && obj.result){
			obj.result = obj.result.getElementsByTagName('*');
			return obj;
		}
    	/*
		 * 参数为dom对象
    	 */
    	if(typeof target === 'object' && !target.isJss){
    		obj.result = target;
    		return obj;
    	}

    	// 备用名，过滤掉【# . 】等前缀
    	var xname = target ? target.substring(1) : '';

		/**
		 * 通过ID获取元素
		 * @param name 为元素 #id
		 */
		if(/^#[^\s]+$/.test(target)){

			obj.result = this.getElementById(xname, isFind ? obj.result : null);
			return obj;
		}

		/**
		 * 通过CLASS获取元素
		 * @param name 为元素 .className
		 */
		if(/^\.[^\s]+$/.test(target)){
			obj.result = isOneDom(this.getElementsByClass(xname, isFind ? obj.result : null));
			return obj;
		}

		/**
		 * 通过标签名获取元素
		 * @param name 为元素的标签名称如：div
		 */
		if(/^[a-zA-z0-9]+$/.test(target)){
			obj.result = isOneDom(this.getElementsByTagName(target, isFind ? obj.result : null));
			return obj;
		}
		
		/**
		 * 根据dom标签字符串创建dom元素
		 * @param name 为html标签名如：'<div>'
		 */
		if(/^\<[^\>\<]+\>$/.test(target)){
			var tagName = target.replace(/^\<+|\>+$/g,"").toLocaleLowerCase();
			obj.result = this.createElementByTagName(tagName);
			return obj;
		}	
		
		//数组里只有一个元素时，则只取这一个对象
	    function isOneDom(o){
	    	if(o && o.length == 1){
	    		return o[0];
	    	}else{
	    		return o;
	    	}
	    }

}