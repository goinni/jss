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

	PS: 
	cssText 可以为json对象
	{
		key: '.panel a',    //样式名
		value: {     //样式对象
			width:'100px',
			'border-top': '10px solid red'
		}
	}
 */
_jss.fn.addStyleSheet = function(cssId, cssText){
    // 标记设置过的样式 【注】每个cssId对应的样式表只能设置一次
    if(!window['_style_sheet_stores']){
        window['_style_sheet_stores'] = {};
    }
    if(window['_style_sheet_stores'][cssId]){
        // 设置过的不再进行设置
        return ;
    }
    window['_style_sheet_stores'][cssId] = true;
	// 兼容对象设置样式
	if(typeof cssText === 'object'){
		cssText = this.toCssText(cssText['key'], cssText['value']);
	}
	var _this = this;
	var head  = document.getElementsByTagName('head').item(0);
	var	style =	head.getElementsByTagName("style");

	// 在 head 中创建 style 标签来存放样式表
	if(!style || style && !style.length){
		if(document.createStyleSheet){
            document.createStyleSheet(); // ie 在head中生成一个style标签
        }else{
            var st = document.createElement('style'); //w3c
	            st.setAttribute("type", "text/css");
	            head.appendChild(st);
        }
	};

	// 添加样式表
	var ss = head.getElementsByTagName("style").item(0);
	if(ss.styleSheet){    //ie
        ss.styleSheet.cssText += cssText;
    }else if(document.getBoxObjectFor){
        ss.innerHTML += cssText; //火狐支持直接innerHTML添加样式表字串
    }else{
        ss.appendChild(document.createTextNode(cssText));
    }
	
}
/*
 * 将css样式json对象转成样式字符串
 * @param className 类名 如： body .list
 * @param cssJson 样式json对象
 * return 样式表 如： body{width:100px;}
 */
_jss.fn.toCssText = function(className, cssJson){
	var r = className+"{";
	for(var key in cssJson){
		r += key+":"+cssJson[key]+";";
	}
	r+="}";
	return r;
}