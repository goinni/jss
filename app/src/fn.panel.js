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
	    'border-top': '0',
	    'margin-bottom': '10px',
	    'width': '100%',
	    'height': 'auto',
	    'box-shadow': '0 1px 1px rgba(0,0,0,0.1)'
	};

	var headcss = {
		'border-bottom': '1px solid #f4f4f4',
		'color': '#444',
	    'display': 'block',
	    'padding': '10px',
	    'position': 'relative',
	    'font-size': '18px',
	    'margin': '0',
	    'line-height': '1'
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
		'width': config.width || '100%',
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
