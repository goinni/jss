/*
 * 自定义选项卡
 */
_jss.fn.tabs = function(entity, config) {
	var xtab = document.createElement('div'),
		nav = document.createElement('ul'),
		content = document.createElement('div'),
		items = config.items || [],
		_this = this,
		tabs = {};
	
	//清楚浮动
	var clearCssText = '.jss_clearfix:before,.jss_clearfix:after{content:"";display:table;}.jss_clearfix:after{clear:both;zoom:1}';
	_this.addStyleSheet("clearTabs", clearCssText);

	// 设置类名
	xtab.className = "jss-tab-custom";
	nav.className = "jss-tab-nav jss_clearfix";
	content.className = "jss-tab-content";

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
		'border-bottom-color': '#f4f4f4',
		'border-top-right-radius': '3px',
		'border-top-left-radius': '3px',
		'border-bottom': '1px solid #ddd'
	};
	_this.addStyleSheet("navTabs", {
		key: ".jss-tab-nav",
		value: navcss
	});

	// nav li css . 
	var licss = {
		'box-sizing': 'border-box',
		'border-top': '3px solid transparent',
		'margin-bottom': '-1px',
		'margin-right': '5px',
		float: 'left',
		position: 'relative',
		display: 'inline-block'
	};
	_this.addStyleSheet("liTabs", {
		key: ".jss-tab-nav li", 
		value: licss
	});

	// nav li a css
	var liacss = {
		'box-sizing': 'border-box',
		background: 'transparent',
		margin: 0,
		color: '#444',
		'border-radius': 0,
		'line-height': '1.42857143',
		border: '1px solid transparent',
		position: 'relative',
		'text-decoration': 'none',
		display: 'block',
		padding: '10px 15px',
		cursor: 'pointer'
	};
	_this.addStyleSheet("liaTabs", {
		key: ".jss-tab-nav li a", 
		value: liacss
	});

	// li active css
	var licssActive = {
		'border-top': '3px solid transparent',
		'border-top-color': '#3c8dbc',
		'margin-bottom': '-2px',
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
		color: '#444',
		background: '#fff',
		'border-radius': 0,
		border: '1px solid #ddd',
		'border-bottom-color': 'transparent',
		'border-top-color': 'transparent',
		'line-height': 1.42857143,
		position: 'relative',
		display: 'block',
		padding: '10px 15px',
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
		clear: 'both'
	}
	_this.addStyleSheet("contentcssTabs", {
		key: ".jss-tab-content", 
		value: contentcss
	});

	var tabList = {};//存放tab,方便自由取出
	// 渲染tabs
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var li = document.createElement('li');
		var lia = document.createElement('a');

		lia.innerHTML = item.title;
		lia['_content'] = item.content;
		lia['_callback'] = item.callback;

		lia['_li'] = li; // 缓存父节点li
		lia['_i'] = i; // 缓存当前索引 
		// set css .
		if (i === 0) {
			// 缺省第一个打开
			setActive(lia);
		}
		tabList[item.id] = lia;//添加缓存
		// tab nav onclick
		_this.bind(lia, 'onclick', function() {
			// 设置当前激活样式
			setActive(this);
			// 内容存在时设置内容
			if (this['_content']) {
				content.innerHTML = this['_content'];
			}
			// this 指向 a , 参数一为content dom 对象
			this['_callback'] && this['_callback'].call(this, content);
		});

		// append element.
		_this.append(li, lia);
		_this.append(nav, li);

	}

	// 将tab添加到指定元素上
	_this.append(xtab, nav);
	_this.append(xtab, content);
	_this.append(entity, xtab);

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
		var old = content['_curAcNav'];
		if (old && old !== a) {
			//清除上一个激活对象
			old['_li'].className = '';
		}
		content['_curAcNav'] = a; // 缓存当前激活对象
		content.innerHTML = item.content; // 设置激活内容
	}

	/*
 	 * 设置tabs激活选项
 	 * @param tabId 选项编号
	 */
	tabs.setActive = function(tabId){
		var tab = tabList[tabId];
		tab.click();
	}
	
	return tabs;
}