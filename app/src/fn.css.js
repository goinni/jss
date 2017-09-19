/*
 * 样式的设置和获取 
 * @param element 一个或多个元素
 * @param cssProperty  样式名 或 样式json对象（属性和值） 
 */
_jss.fn.css = function(arr, cssProperty){
	if(!this.isCollection(arr)){
	    arr = [arr];
	}
	for(var i = 0; i<arr.length; i++){
		var element = arr[i];
		if(typeof cssProperty === 'string'){
			//获取样式
			var  xr = "",elm_style = element.currentStyle || window.getComputedStyle(element, null);
			if (elm_style.getPropertyValue) {
				// 处理非IE
				xr = elm_style.getPropertyValue(cssProperty);
			} else {
				// 处理IE
				if(cssProperty=="float")cssProperty = "styleFloat";
				// 将带有'-'样式属性转成驼峰写法 border-color <--> borderColor
				cssProperty = cssProperty.replace(/(\-+)\w/g, function(s) {
					// 将'-'字符后的字母大写
					return s.toUpperCase();
				}).replace("-", "");
				xr = elm_style.getAttribute(cssProperty);
			}
			// 将可用的值返回
			return xr ? xr : elm_style[cssProperty] ? elm_style[cssProperty]	: element.style[cssProperty];
		}else if(typeof cssProperty === 'object'){
			//设置样式
			try{
				for(var key in cssProperty) {
					try{
						element.style[key] = cssProperty[key];	
					}catch(e){
						continue;
					}
				}
			}catch(e){
				// 样式设置异常
				continue;
			}
		}
	}

}