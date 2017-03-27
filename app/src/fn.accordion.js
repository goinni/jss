/*
 * 伸缩菜单
 */
_jss.fn.accordion = function(entity, config){
	var _this = this;
	// css
	// 存放面板盒子
	var groupcss = {
		width: config.width || "auto",
		height: config.height || "auto",
		overflow: 'scroll'
	};
	_this.addStyleSheet("accordion-group", {
		key: ".jss-accordion-group",
		value: groupcss
	});

	// 面板
	var panelcss = {
	    'margin-bottom': '5px',
        'border': '1px solid transparent',
        'position': 'relative',
	    'border-radius': '3px',
	    'background': '#ffffff',
	    'border-top': '3px solid #3c8dbc',
	    // 'width': '100%',
	    'box-shadow': '0 1px 1px rgba(0,0,0,0.1)'
	};
	_this.addStyleSheet("accordion-panel", {
		key: ".jss-accordion-panel",
		value: panelcss
	});

	// 激活面板
	var panelactivecss = {
		display: 'block'
	}
	_this.addStyleSheet("accordion-panel-active", {
		key: ".jss-accordion-panel.active .jss-accordion-panel-collapse",
		value: panelactivecss
	});

	// 头部
	var headercss = {
	    'border-bottom': '1px solid #f4f4f4',
	    'color': '#444',
	    'display': 'block',
	    'padding': '10px',
	    'position': 'relative'
	};
	_this.addStyleSheet("accordion-panel-header", {
		key: ".jss-accordion-panel-header",
		value: headercss
	});

	var h4css = {
	    'display': 'inline-block',
	    'font-size': '18px',
	    'margin': 0,
	    'line-height': 1
	};
	_this.addStyleSheet("accordion-panel-header-h4", {
		key: ".jss-accordion-panel-header-h4",
		value: h4css
	});

	var acss = { 
		'color': '#3c8dbc',
		'text-decoration': 'none',
		'cursor': 'pointer',
		'background-color': 'transparent'
	};
	var ahovercss = {
		'color': '#59adde'
	}
	_this.addStyleSheet("accordion-panel-header-h4-a", {
		key: ".jss-accordion-panel-header-h4-a",
		value: acss
	});
	_this.addStyleSheet("accordion-panel-header-h4-ahover", {
		key: ".jss-accordion-panel-header-h4-a:hover",
		value: ahovercss
	});

	// 内容
	var collapsecss = {
		'display': 'none'
	};
	_this.addStyleSheet("accordion-panel-collapse", {
		key: ".jss-accordion-panel-collapse",
		value: collapsecss
	});

	var bodycss = {
		'border-top-left-radius': '0',
	    'border-top-right-radius': '0',
	    'border-bottom-right-radius': '3px',
	    'border-bottom-left-radius': '3px',
	    'padding': '10px'
	};
	_this.addStyleSheet("accordion-panel-collapse-body", {
		key: ".jss-accordion-panel-collapse-body",
		value: bodycss
	});

	// 构造panel
	var group = document.createElement('div');
	var items = config.items || [];
	for(var i = 0; i<items.length; i++){
		var item = items[i];
		bulidAccordion (item, i);
	};

	function bulidAccordion (item, i){
		var panel = document.createElement('div'),
			header = document.createElement('div'),
			h4 = document.createElement('h4'),
			a = document.createElement('a'),
			collapse = document.createElement('div'),
			body = document.createElement('div');

		// 样式
		group.className = "jss-accordion-group";
		panel.className = "jss-accordion-panel" + (i?'':' active');
		header.className = "jss-accordion-panel-header";
		h4.className = "jss-accordion-panel-header-h4";
		a.className = "jss-accordion-panel-header-h4-a";
		collapse.className = "jss-accordion-panel-collapse";
		body.className = "jss-accordion-panel-collapse-body";

		a.innerHTML = item.title || '';
		body.innerHTML = item.content || '';

		// 缓存内容对象和事件
		h4['_content'] = body;
		h4['_callback'] = item.callback;

		// 添加事件
		_this.bind(h4, 'onclick', function(){
			//是否互斥（只有一个是打开状态）
			if(config.mutex){
				distoryActive(group); 
			}
			var heard = _this.parent(this);
			var pl = _this.parent(heard);
			_this.toggleClass(pl, 'active');
			// 回调
			this['_callback'] && this['_callback'].call(this, this['_content']);
		});

		// 组装节点
		_this.append(panel, header);
		_this.append(header, h4);
		_this.append(h4, a);

		_this.append(panel, collapse);
		_this.append(collapse, body);

		_this.append(group, panel);
		
	}
	// 销毁所有子节点激活状态
	function distoryActive(dom){
		var chlids = _this.children(dom);
		for(var i = 0; i< chlids.length ; i++){
			var child = chlids[i];
			if(_this.hasClass(child, 'active')){
				_this.removeClass(child, 'active');
			}

		}
	}

	// 将伸缩面板添加到指定窗口中
	_this.append(entity, group);

}