/*
 * 选择器
 * @author Jerry
 * @time 2017-01-13
 */
_jss.fn.selector = function (name){
	var _this = {}, fn=this;

	/*
	 * jss对象标记
	 */
	_this.isJss = true;

	/**
	 * 获取原始dom元素
	 */
	_this.getDom = function(){
		return _this.result;
	}

	/**
	 * 向元素后加入元素
	 * @param obj 一个dom元素或一组元素
	 */
	_this.append = function(obj){
		if(obj.isJss){
			obj = obj.result;
		}
		if(obj && obj.length){
			for(var i = 0; i<obj.length; i++){
				fn.append(_this.result, obj[i]);
			}
		}else{
			fn.append(_this.result, obj);
		}
		return _this;
	}

	/**
	 * 获取元素的innerHTML
	 * @param text 参数存在时，则设置html
	 */
	_this.html = function(text){
		if(text){
			_this.result.innerHTML = text;
			return _this;
		}
		return _this.result.innerHTML;
	}

    /*
     * 是否包含指定的类名
     * @param className 类名
     */
    _this.hasClass = function(className){
         return fn.hasClass(
            filterArrFirst(_this.result), 
            className
         );
    }
    
	/*
     * 是否包含指定的类名
     * @param className 类名
     */
    _this.css = function(cssProperty){
        var r = fn.css(
            _this.result, 
            cssProperty
        );
        if(typeof cssProperty === 'string'){
            return r;
        }else{
            return _this;
        }
    }

	/*
     * 向元素中添加class样式
     * @param className 类名
     */
    _this.addClass = function(className){
    	fn.addClass(_this.result, className);
        return _this;
    }

    /*
     * 获取所有子节点，不包括孙节点
     */
    _this.children = function(){
    	_this.result = fn.children(_this.result);
    	return _this;
    }

	/*
     * 删除元素中class样式
     * @param className 类名
     */
    _this.removeClass = function(className){
    	fn.removeClass(_this.result, className);
        return _this;
    }

	/*
     * 获取和设置元素属性
     * @param value 属性名 或 属性json对象
     */
    _this.attr = function(value){
    	if(typeof value === 'string'){
    		return fn.getAttr(
    			filterArrFirst(_this.result), 
    			value
    		);
    	}else{
    		fn.setAttr(_this.result, value);
    		return _this;
    	}
    }
    
    /*
     * 获取父节点
     */
    _this.parent = function(){
        _this.result = fn.parent(
            filterArrFirst(_this.result)
        );
        return _this;
    }
    
    /*
	 * 从当前结果下所有子节点包括孙节点 中查找指定元素
     * @param index 选择器参数#id 或 .class 或 div标签名等, 参数为空时获取所有子节点及孙节点
     */
    _this.find = function( index ){
    	return fn.isee(index , _this, true);
    }

    /*
     * 获取当前元素的显示区信息，返回对象包含top,left,right,bottom,width,height
     */
    _this.clientRect = function(){
        return fn.clientRect(
            filterArrFirst(_this.result)
        );
    }
    
    /*
	 * 删除节点
     */
    _this.remove = function(){
    	fn.remove(_this.result);
    	return _this;
    }
    
    /*
	 * 切换样式
     */
    _this.toggleClass = function(className){
    	fn.toggleClass(_this.result, className);
    	return _this;
    }
    
    /*
	 * 事件绑定
	 * @param type   	事件类型，如：onclick, onkeyup,onkeydown ...
	 * @param callback  事件回调
     */
    _this.bind = function(type, callback){
    	fn.bind(_this.result, type, callback);
    	return _this;
    }
    
    /*
	 * 事件解绑定
	 * @param type   	事件类型，如：onclick, onkeyup,onkeydown ...
     */
    _this.unbind = function(type){
    	fn.unbind(_this.result, type);
    	return _this;
    }

    /*
     * 停止事件的传播，阻止它被分派到其他 Document 节点
     * @param e 事件源
     */
    _this.stopPropagation = function(e){
        fn.stopPropagation(e);
        return _this;
    }

    /**
     * 获取唯一编号
     */
    _this.uuid = function(){
        return fn.uuid();
    }
    
    /**
     * cookie设置和获取
     * @param opt cookie名字或设置cookie信息；如：{name:'', value:'', time:'过期时间'}
     */
    _this.cookie = function(opt){
        
        if(typeof opt === 'string'){
            //获取
            return fn.getCookie(opt);
        }else{
            //设置
            fn.setCookie(opt.name, opt.value, opt.time);
            return _this;
        }
    }

    /**
     * AJAX 请求
     * @param opt.url 请求地址
     * @param opt.success 成功回调
     * @param opt.error 失败回调
     * @param opt.type 请求方法 缺省值为GET
     * @param opt.data 请求参数
     * @param opt.header 设置请求头 {key: value}
     * @param opt.async 是否异步请求数据，缺省值为是
     */
    _this.ajax = function(opt){
        fn.ajax(opt);
        return _this;
    }

    /*
     * ie8跨域请求
     * @param opt.url   请求地址
     * @param opt.type  请求方法  POST 或 GET
     * @param opt.time  请求超时
     * @param opt.data  请求参数  json对象字符串
     */
    _this.xdr = function(opt){
        fn.xdr(opt);
        return _this;
    }

    /**
     * 监听输入框输入的值
     * @param input 输入框dom对象
     * @param onFocusCallback 获得焦点时回调
     * @param onBlurCallback  失去焦点时回调
     * @param time 监听频率 缺省值100毫秒
     */
    _this.inputTimer = function(onFocusCallback, onBlurCallback, time){
        fn.inputTimer(
            filterArrFirst(_this.result), 
            onFocusCallback, 
            onBlurCallback, 
            time
        );
        return _this;
    }

    /*
     * 使元素自由可拖拽
     * @param callback 回调
     * callback(left, top); //this为当前拖拽对象
     *【注】使用时请先将元素设置绝对定位！！！！
     */
    _this.drag = function(callback){
        fn.dragElement(
            filterArrFirst(_this.result),
            callback
        );
        return _this;
    }

    /**
     * 获取浏览器参数名称
     * @param name 浏览器地址参数名
     */
    _this.queryUrlParam = function(name){
        return fn.queryUrlParam(name);
    }

    /**
     * 打开弹窗
     * @param config 弹窗配制
     */
    _this.dialog = function(config){
       return fn.dialog(config, filterArrFirst(_this.result));
    }

    /*
     * 在指定区域添加loading效果
     */
    _this.loading = function(config){
       return fn.loading(filterArrFirst(_this.result), config);
    }
    
    /**
     * 克隆json对象
     * @param jsonobject json对象
     * @return 新的json对象
     */
    _this.clone = function(jsonobject){
        return fn.clone(jsonobject);
    }

    /*
     * 动态创建选项卡
     */
    _this.tabs = function(config){
        return fn.tabs(filterArrFirst(_this.result), config);
    }

    /*
     * 动态添加一个样式组
     * @param cssId 在当前文档中样式表唯一的ID，相同ID只允许设置一次
     * @param cssText 样式字符串
     * 动态添加<style></style>里的样式
        //动太样式
        var cssText = "\
        h3{\
            color:red;\
            border:1px solid green;\
            padding:10px;\
        }\
        ";
        例如： fn.addStyleSheet("bodyCssId", "body{color:red;}");
        设置完后会在head style标签中添加一个样式表
     */
    _this.addStyleSheet = function(cssId, cssText){
        return fn.addStyleSheet(cssId, cssText);
    }

    /**
     * 校验结果
     * 当结果为数组时返回第一个元素
     * [注]在必要的方法里使用 比如：hasClass,多个结果，只取第一个
     */
    function filterArrFirst(o){
    	if(o && o.length){
    		o = o[0];
    	}
    	return o;
    }
    

    return fn.isee(name , _this);
}
