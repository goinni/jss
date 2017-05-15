/*
 * 弹窗
 * 有标题，操作按钮，和内容
 * @author houzhenyu
 * @param entity 被遮罩对象
 * @param config 弹窗配制
 {
	position: 'fixed', // 'relative', 'absolute', 'fixed'  弹层定位，比如给某个div遮罩弹窗，可以设置为 absolute，给body则设置fixed
	zIndex: 100, // 弹层 第几层
	headerHtml: '温馨提示', // 头部html内容
	contentHtml: '<center style="line-height: 50px;"> Welcome Jss</center>', // 内容，支持html代码片段
	cancelText: '取消', // 按钮文本
	actionText: '确定', // 按钮文本
	showHeader: true,  // false 隐藏, 缺省显示 
	showFooter: true,  // false 隐藏, 缺省显示 
	hasBorderRadius: false,  // 是否圆角, 缺省圆角
	contentWidth: '100%',    // 内容宽度
	contentTop: '0', 		 // 内容面板距窗口上边距离
	hasborder: false,		 // 没有边框，缺省有边框
	hasShadow: false,		 // 没有阴影，缺省有阴影 
	isCustomBtn: true, 		 // 是否自定义按钮事件，影响取消按钮默认关闭
	action: function(){
		// 确定按钮
		//this 表示当前dialog对象
		this.remove();	// 删除弹窗
	},
	cancel: function(){
		// alert('取消按钮');
	}
}
 */
_jss.fn.dialog = function(config, entity) {
	var _this = this,
		di = {};
	// 被遮罩弹窗的元素
	config = config || {};
	entity = entity || document.body;

	// 创建需要的元素
	var bg = document.createElement('div');
	var panel = document.createElement('div');
	var header = document.createElement('div');
	var content = document.createElement('div');
	var footer = document.createElement('div');
	var btncancel = document.createElement('button');
	var btnprimary = document.createElement('button');

	// 设置样式名
	bg.className = 'jss-dialog-bg';
	panel.className = 'jss-dialog-panel';
	header.className = 'jss-dialog-header';
	content.className = 'jss-dialog-content';
	footer.className = 'jss-dialog-footer';
	btncancel.className = 'jss-dialog-btncancel';
	btnprimary.className = 'jss-dialog-btnprimary';

	// 设置背景样式
	var bgcss = {
		width: '100%',
		height: '100%',
		position: config.position || 'fixed',
		zIndex: config.zIndex || '99999',
		top: "0",
		left: "0",
		background: "url('" + _this.constant.pngBase64 + "') left top repeat"
	};
	// 设置面板样式
	var panelcss = {
		width: config.contentWidth || '50%',
		height: 'auto',
		minHeight: '50px',
		overflow: 'hidden',
		margin: (config.contentTop || '30px') + ' auto 0',
		position: 'relative',
		backgroundColor: '#fff',
		backgroundClip: 'padding-box',
		border: config.hasborder != false ? '1px solid #999' : '0px',
		border: config.hasborder != false ? '1px solid #ccc' : '0px',
		borderRadius: (config.hasBorderRadius != false) ? '6px' : '0px',
		outline: 0
	};
	// 设置弹窗头部样式
	var headercss = {
		padding: '11px',
		fontSize: '16px',
		lineHeight: 1.42857143,
		fontWeight: 500,
		display: (config.showHeader != false) ? 'block' : 'none',
		borderBottom: '1px solid #e5e5e5';
		backgroundColor: '#4079b7'
	};
	// 设置弹窗底部样式
	var footercss = {
		padding: '15px',
		textAlign: 'right',
		display: (config.showFooter != false) ? 'block' : 'none',
		borderTop: '1px solid #e5e5e5'
	};
	// 设置弹窗底部取消按钮样式
	var btncancelcss = {
		color: '#fff',
		backgroundColor: '#f0ad4e',
		borderColor: '#eea236',
		display: (config.cancel ? 'inline-block' : 'none'),
		outline: 'none',
		padding: '6px 12px',
		marginBottom: 0,
		marginLeft: '5px',
		fontSize: '14px',
		fontWeight: 400,
		lineHeight: 1.42857143,
		textAlign: 'center',
		whiteSpace: 'nowrap',
		verticalAlign: 'middle',
		'-msTouchAction': 'manipulation',
		touchAction: 'manipulation',
		cursor: 'pointer',
		'-webkit-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		userSelect: 'none',
		backgroundImage: 'none',
		border: '1px solid transparent',
		borderRadius: '4px'
	};
	// 设置弹窗底部确定按钮样式
	btnprimarycss = this.clone(btncancelcss);
	btnprimarycss['backgroundColor'] = '#337ab7';
	btnprimarycss['borderColor'] = '#2e6da4';
	btnprimarycss['display'] = (config.action ? 'inline-block' : 'none');
	// 设置弹窗内容样式
	var contentcss = {
		position: 'relative',
		margin: 0,
		padding: 0,
		minHeight: '50px'
	};

	this.css(bg, bgcss);
	this.css(panel, panelcss);
	this.css(header, headercss);
	this.css(content, contentcss);
	this.css(footer, footercss);
	this.css(btncancel, btncancelcss);
	this.css(btnprimary, btnprimarycss);

	// 设置内容
	header.innerHTML = config.headerHtml || '\u6e29\u99a8\u63d0\u793a'; // 温馨提示
	btncancel.innerHTML = config.cancelText || '\u53d6\u6d88'; // 取消 
	btnprimary.innerHTML = config.actionText || '\u786e\u5b9a'; // 确定
	content.innerHTML = config.contentHtml || '<center> Hello world !</center>'

	// 确定按钮 事件处理
	this.bind(btnprimary, 'onclick', function() {
		// alert('is ok ?');
		config.action && config.action.call(di);
	});
	// 取消按钮 事件处理
	this.bind(btncancel, 'onclick', function() {
		config.cancel && config.cancel.call(di);
		// 删除当前弹窗
		!config.isCustomBtn && di.remove();
	});

	// 将元素添加到文档中
	this.append(panel, header);
	this.append(panel, content);
	this.append(panel, footer);
	this.append(footer, btnprimary);
	this.append(footer, btncancel);
	this.append(bg, panel);
	this.append(entity, bg);

	/*
	 * 删除弹窗
	 */
	di.remove = function() {
		_this.remove(bg);
	};
	/*
	 * 动态设置窗口内容
	 * @param text 弹窗内容
	 */
	di.setContent = function(text) {
		content.innerHTML = text;
	}

	return di;
}