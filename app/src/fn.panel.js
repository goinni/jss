/*
 * 获取元素的父节点
 * 例如：
	 $('body').panel({
		width: "300px",
		height: "200px",
		title: "<b>用药审核2</b>",
		content: "<i>相互作用：A与B谨慎使用</i><br/>用药禁忌：无"
	});
 */
_jss.fn.panel = function(entity, config){
	var _this = this,
		box = document.createElement('div'),
		head = document.createElement('div'),
		body = document.createElement('div');

	//样式类
	box.className = "jss-panel-box";
	head.className = "jss-panel-head";
	body.className = "jss-panel-body";

	// 样式
	var boxcss = {
		'position': 'relative',
	    'border-radius': '3px',
	    'background': '#ffffff',
	    'border': '1px solid #dde6d6',
		'border-radius':'5px',
	    'margin-bottom': '10px',
	    'height': 'auto'
	};

	var headcss = {
		'border-bottom': '1px solid #dde6d6',
		'color': '#444',
	    'display': 'block',
	    'padding-left': '15px',
	    'height': '45px',
	    'line-height': '45px',
	    'position': 'relative',
	    'font-size': '16px',
	    'font-weight': 'bold',
	    'margin': '0',
		'background':'#F5F9F8',
		'border-radius':'5px 5px 0 0'
	};

	var bodycss = {
	    'border-top-left-radius': '0',
	    'border-top-right-radius': '0',
	    'border-bottom-right-radius': '3px',
	    'border-bottom-left-radius': '3px',
	    'padding': '10px'
	}

	_this.addStyleSheet("panel-box", {
		key: ".jss-panel-box",
		value: boxcss
	});
	_this.addStyleSheet("panel-head", {
		key: ".jss-panel-head",
		value: headcss
	});
	_this.addStyleSheet("panel-body", {
		key: ".jss-panel-body",
		value: bodycss
	});

// 动态设置样式
	_this.css(box, {
		'width': config.width || 'auto',
	    'height': config.height || 'auto'
	});

	// 内容
	head.innerHTML = config.title || '';
	body.innerHTML = config.content || '';

	// 添加
	_this.append(box, head);
	_this.append(box, body);
	_this.append(entity, box);

	// 动态设置内容和标题
	config.callback && config.callback.call(entity, head, body)

}
