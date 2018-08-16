/*
 * 自定义选项卡
 */
_jss.fn.tabs = function(entity, config) {
	var xtab = document.createElement('div'),
		nav = document.createElement('ul'),
		currentActiveNav = {}, //缓存当前激活的nav对象
		items = config.items || [],
		_this = this,
		tabs = {};

	//清楚浮动
	var clearCssText = '.jss_clearfix:before,.jss_clearfix:after{content:"";display:table;}.jss_clearfix:after{clear:both;zoom:1}.jss_clearfix{*height:1%;zoom:1;}';
	_this.addStyleSheet("clearTabs", clearCssText);

	// 设置类名
	xtab.className = "jss-tab-custom";
	nav.className = "jss-tab-nav jss_clearfix";

	// 样式集
	var xtabcss = {
		margin: '0 auto',
		'box-sizing': 'border-box',
		height: 'auto',
		overflow: 'hidden',
		background: '#fff',
		'box-shadow': '0 1px 1px rgba(0,0,0,0.1)',
		'border-radius': '3px'
	};
	_this.addStyleSheet("contentTabs", {
		key: ".jss-tab-custom",
		value: xtabcss
	});
	_this.css(xtab, {
		width: config.width || 'auto',
		height: config.height || 'auto'
	});

	// tab nav ul .
	var navcss = {
		width: '100%',
		height: 'auto',
		margin: 0,
		padding: 0,
		'list-style': 'none',
		display: 'block',
		'box-sizing': 'border-box',
		'border-top-right-radius': '3px',
		'border-top-left-radius': '3px'
	};
	_this.addStyleSheet("navTabs", {
		key: ".jss-tab-nav",
		value: navcss
	});

	// nav li css . 
	var licss = {
		'box-sizing': 'border-box',
		'border-top': '3px solid transparent',
		'_border-top-color':'purple',
		'_filter':'chroma(color=purple)',
		'margin-bottom': '-1px',
		'margin-right': '5px',
		float: 'left',
		position: 'relative',
		display: 'inline-block',
		zoom:1
	};
	_this.addStyleSheet("liTabs", {
		key: ".jss-tab-nav li",
		value: licss
	});

	// nav li a css
	var liacss = {
		'box-sizing': 'border-box',
		background: 'transparent',
		color: '#444',
		margin: 0,
		'border-radius': 0,
		'line-height': '1.42857143',
		position: 'relative',
		'text-decoration': 'none',
		display: 'block',
		padding: '8px 15px',
		cursor: 'pointer',
		'font-size': "16px"
	};
	_this.addStyleSheet("liaTabs", {
		key: ".jss-tab-nav li a",
		value: liacss
	});

	// li active css
	var licssActive = {
		'border-top': 'none',
		'border-bottom': ' 3px solid transparent',
		'border-bottom-color': '#4079b7',
		'margin-top': '2px',
		'margin-right': '5px',
		float: 'left',
		position: 'relative',
		'box-sizing': 'border-box',
		display: 'inline-block'
	}
	_this.addStyleSheet("licssActiveTabs", {
		key: ".jss-tab-nav .active",
		value: licssActive
	});

	// li a active css
	var liacssActive = {
		color: '#4079b7',
		'border-radius': 0,
		'line-height': 1.42857143,
		position: 'relative',
		display: 'block',
		padding: '8px 15px',
		'box-sizing': 'border-box',
		'text-decoration': 'none',
		cursor: 'pointer',
		margin: 0

	}
	_this.addStyleSheet("liacssActiveTabs", {
		key: ".jss-tab-nav .active a",
		value: liacssActive
	});

	// content css
	var contentcss = {
			width: '100%',
			height: 'auto',
			overflow: 'hidden',
			clear: 'both',
			display: 'none'
		}
		// 缺省内容不显示 
	_this.addStyleSheet("contentcssTabs", {
		key: ".jss-tab-content",
		value: contentcss
	});
	// 内容激活
	_this.addStyleSheet("contentcssTabsActive", {
		key: ".jss-tab-content.active",
		value: {
			display: 'block'
		}
	});

	var tabList //存放tab,方便自由取出
	var contentList;
	// 渲染tabs
	function createItems(items) {
		xtab.innerHTML = "";
		nav.innerHTML = "";
		tabList = {}; //存放tab,方便自由取出
		contentList = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var li = document.createElement('li');
			var lia = document.createElement('a');
			var currentContent = document.createElement('div');

			currentContent.innerHTML = item.content || ""; //设置内容
			currentContent.className = "jss-tab-content";

			lia.setAttribute('burried',item.burried||'');
			lia.innerHTML = item.title || "";
			lia['_content'] = currentContent;
			lia['_callback'] = item.callback;
			lia['_disabled'] = item.disabled;

			lia['_li'] = li; // 缓存父节点li
			lia['_i'] = i; // 缓存当前索引 
			// set css .
			if (i === 0) {
				// 缺省第一个打开
				setActive(lia);
			}
			tabList[item.id] = lia; //添加缓存
			// tab nav onclick
			_this.bind(lia, 'onclick', function() {
				// 不可用状态时，不触发默认处理逻辑
				if (!this['_disabled']) {
					// 设置当前激活样式
					setActive(this);
				}
				// this 指向 a , 参数一为content dom 对象
				this['_callback'] && this['_callback'].call(this, this['_content']);
			});

			// append element.
			_this.append(li, lia);
			_this.append(nav, li);
			//准备nav对应的内容
			contentList.push(currentContent);
		}

		// 将tab添加到指定元素上
		_this.append(xtab, nav);
		//添加内容
		for (var n = 0; n < contentList.length; n++) {
			_this.append(xtab, contentList[n]);
		}
		_this.append(entity, xtab);
	}

	createItems(items);

	/*
	 * 设置当前激活样式和内容
	 * @param a 当前 nav item a 
	 */
	function setActive(a) {
		var color = '#ddd';
		a['_li'].className = 'active';
		// 第一个nav清除左边框
		if (a['_i'] === 0) {
			color = 'transparent';
		}
		liacssActive['border-left-color'] = color;
		var old = currentActiveNav['_curAcNav'];
		if (old && old !== a) {
			//清除上一个激活对象
			old['_li'].className = '';
			_this.removeClass(old['_content'], 'active');
		}
		currentActiveNav['_curAcNav'] = a; // 缓存当前激活对象
		_this.addClass(a['_content'], 'active'); // 设置激活内容
	}

	/*
	 * 设置tabs激活选项
	 * @param tabId 选项编号
	 */
	tabs.setActive = function(tabId) {
		var tab = tabList[tabId];
		tab.click();
	}

	/*
	 * 更新指定 tab 数据
	 * @param list [{id: '编号是必需的', title: '标题', content: '内容', isActive: '是否为激活状态 true是'}]
	 * @param isReset 重置item选项
	 */
	tabs.updateData = function(list, isReset) {
		if (isReset) {
			createItems(list);
		} else {
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				var tab = tabList[item.id];
				if (item.content) {
					tab['_content']['innerHTML'] = item.content;
				}
				if (item.title) {
					tab.innerHTML = item.title;
				}
				if (item.isActive === true) {
					tabs.setActive(item.id);
				}
			}
		}
	}

	return tabs;
}