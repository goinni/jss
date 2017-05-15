/*
 * 伸缩菜单
 */
_jss.fn.accordion = function(entity, config) {
	var _this = this, result = {};
	// css
	// 存放面板盒子
	var groupcss = {
		width: "auto",
		height: "auto"
	};
	_this.addStyleSheet("accordion-group", {
		key: ".jss-accordion-group",
		value: groupcss
	});


	// 面板
	var panelcss = {
		'margin-bottom': '5px',
		'position': 'relative',
		'border-radius': '5px',
		'background': '#ffffff',
		'display': 'block',
		 'overflow': 'hidden',
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
		'color': '#444',
		'display': 'block',
		'background': '#EFF5F3',
		'height': '40px',
		'line-height': '40px',
		'position': 'relative'

	};
	_this.addStyleSheet("accordion-panel-header", {
		key: ".jss-accordion-panel-header",
		value: headercss
	});

	var acss = {
		'font-size': '18px',
		'display': 'block',
		'margin': 0,
		'color': '#666666',
		'text-decoration': 'none',
		'display': 'block',
		'padding-left': '15px',
		'cursor': 'pointer',
		'background-color': 'transparent'
	};
	var ahovercss = {
		'color': '#666666'
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
		'display': 'none',
		'border-top': '1px solid #dde6e6'
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

	// 缓存panel数据 
	var itemlist = {};
	// 构造panel
	var group = document.createElement('div');
	var items = config.items || [];

	// 创建伸缩列表
	function createAccordion(items){
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			bulidAccordion(item, i);
		};
	}
	createAccordion(items);
	// 动态设置样式
	_this.css(group, {
		'width': config.width || 'auto',
	    'height': config.height || 'auto'
	});
	
	function bulidAccordion(item, i) {
		var panel = document.createElement('div'),
			header = document.createElement('div'),
			// h4 = document.createElement('h4'),
			a = document.createElement('a'),
			collapse = document.createElement('div'),
			body = document.createElement('div');

		// 样式
		if((!i && config.firstOpen) || (!i && typeof config.firstOpen == "undefined") || config.openAll){
			panel.className = "jss-accordion-panel " + (item.stopClick ? '' : 'active');
		}else{
			// 如果设置加载打开
			panel.className = "jss-accordion-panel " + (item.active? 'active':'');
		}

		group.className = "jss-accordion-group";
		// panel.className = "jss-accordion-panel" + (i ? '' : ' active');
		header.className = "jss-accordion-panel-header";
		// h4.className = "jss-accordion-panel-header-h4";
		a.className = "jss-accordion-panel-header-h4-a";
		collapse.className = "jss-accordion-panel-collapse";
		body.className = "jss-accordion-panel-collapse-body";

		a.innerHTML = item.title || '';
		body.innerHTML = item.content || '';

		// 缓存内容对象和事件
		header['_content'] = body;
		header['_callback'] = item.callback;

		// 阻止点击事件
		if(!item.stopClick){
			// 添加事件
			_this.bind(header, 'onclick', function() {
				//是否互斥（只有一个是打开状态）
				if (config.mutex) {
					distoryActive(group);
				}
				var heard = _this.parent(this);
				// var pl = _this.parent(heard);
				_this.toggleClass(heard, 'active');
				// 回调
				this['_callback'] && this['_callback'].call(this, this['_content'], _this.hasClass(heard, 'active'));
			});
		}
		
		// 组装节点
		_this.append(panel, header);
		_this.append(header, a);

		_this.append(panel, collapse);
		_this.append(collapse, body);

		_this.append(group, panel);

		// 以ID为索引关联系dom
		var tempId = item.id || i;
		itemlist[tempId] = header;
	}
	// 销毁所有子节点激活状态
	function distoryActive(dom) {
		var chlids = _this.children(dom);
		for (var i = 0; i < chlids.length; i++) {
			var child = chlids[i];
			if (_this.hasClass(child, 'active')) {
				_this.removeClass(child, 'active');
			}

		}
	}
	// 添加所有子节点激活状态
	function addActive(dom) {
		var chlids = _this.children(dom);
		for (var i = 0; i < chlids.length; i++) {
			var child = chlids[i];
			if (!_this.hasClass(child, 'active')) {
				_this.addClass(child, 'active');
			}

		}
	}

	// 将伸缩面板添加到指定窗口中
	_this.append(entity, group);

	/*
	 * 打开所有面板
	 */
	result.openAll = function(){
		addActive(group);
	}
	/*
	 * 关闭所有面板
	 */
	result.closedAll = function(){
		distoryActive(group);
	}
	/*
	 * 打开指定面板
	 */
	result.open = function(id){
		itemlist[id].click();
	}
	/*
	 * 更新面板面容
	 */
	result.updateData = function(items){
		group.innerHTML = "";
		createAccordion(items);
	}

	return result;

}