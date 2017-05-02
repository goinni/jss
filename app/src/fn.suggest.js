/**
 * 自动提示下拉框
 * @param entity 选择器dom对象
 * @param config 配制参数 
 */
_jss.fn.suggest = function(entity, config){
	var _this = this,
		coor = _this.documentPosition(entity),
		ul = document.getElementById('jss_suggest_auto_list') || document.createElement('div'),
		items = config.items || [],
		width = entity.offsetWidth,
		cwidth = entity.clientWidth,
		height = entity.offsetHeight,
		cw = (width - cwidth)/2,
		result = {};
	// 定义唯一ID,文档只允许添加一个sug组件
	ul.id = 'jss_suggest_auto_list';
	// 加载数据 
	updateItems(ul, items);
	// 构造集合数据
	function updateItems (ul, items){
		ul.innerHTML = "";
		// 遍历数据集合
		for(var i = 0; i<items.length; i++){
			var item = items[i];
			var li = document.createElement('a');
			li.innerHTML = item.value;
			li.name = item.key;
			li.title = item.value;
			_this.bind(li, 'onclick', function(e){
				_this.stopPropagation(e);
				// 回调
				config.callback && config.callback.call(_this, 
					this.name, this.innerHTML);
			});
			_this.append(ul, li);

		}
	}
	// 隐藏
	function hide (){
		var sug = document.getElementById('jss_suggest_auto_list');
		_this.hide(sug);
	}
	// 显示 
	function show (){
		var sug = document.getElementById('jss_suggest_auto_list');
		_this.show(sug);
	}
	// suggest 列表样式
	var suggestCss = {
		'position': 'absolute',
		'list-style': 'none',
		'z-index': '999999',
		'height': config.height || '200px',
		'width': config.width || (width-cw*2) + 'px',
		'left': config.left || (coor.left+cw) + 'px',
		'top': config.top || ( height + coor.top ) + 'px',
		'margin': 0,
		'padding': 0,
		'display': 'none',
		'background': '#FFF',
	    'overflow': 'auto',
	    'box-shadow': '0 1px 1px rgba(0,0,0,0.1)'
	};
	var suggestLiCss = {
		padding: '5px 10px',
		cursor: 'pointer',
		display: 'block',
		'text-overflow': 'ellipsis',
	    overflow: 'hidden',
		'border-bottom': '1px solid #f0f0f0'
	}
	var suggestLiHoverCss = {
		background: '#f1f1f1'
	}
	ul.className = 'jss-suggest-list';

	/**
	 * 向header中添加样式
	 */
	_this.addStyleSheet("jss-suggest-list", {
		key: ".jss-suggest-list",
		value: suggestCss
	});
	_this.addStyleSheet("jss-suggest-list-li", {
		key: ".jss-suggest-list a",
		value: suggestLiCss
	});
	_this.addStyleSheet("jss-suggest-list-li-hover", {
		key: ".jss-suggest-list a:hover",
		value: suggestLiHoverCss
	});

	_this.append(document.body, ul);
	/**
	 * 单击body任意地方隐藏组件
	 */
	 if(config.stopPropagation !== false){
	 	_this.bind(document, "onclick", function () {
			hide();
	    });
	 }
	
    // 对外 接口
    // 隐藏
    result.hide = hide;
    // 显示 
    result.show = show;
    // 更新数据 
    result.updateData = function(items){
    	var sug = document.getElementById('jss_suggest_auto_list');
    	updateItems(sug, items)
    }

    return result;
}