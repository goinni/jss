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
	isFullScreen: true, // 是否全屏展示, 缺省值false
	hasBorderRadius: false,  // 是否圆角, 缺省圆角
	contentWidth: '100%',    // 内容宽度
	contentTop: '0', 		 // 内容面板距窗口上边距离
	hasborder: false,		 // 没有边框，缺省有边框
	hasShadow: false,		 // 没有阴影，缺省有阴影 
	customFooterHtml: "",    // 自定义footer内容 
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

	var tempPanelHeight = (config.showHeader?45:0 + 65);
	var tempPanelBottomHeight = 100;
	var tempPanelTop = '50px'; //缺省弹窗距顶部高度
	var tempPanelWidth = '50%'; // 缺省宽度50%
	// 是否全屏
	if(config.isFullScreen){
		setFullScreen(true);
	}

	var h = "",
		con_h = "";
	if (!config.contentHeight) {
		h = document.documentElement.clientHeight || document.body.clientHeight;
		con_h = h - tempPanelBottomHeight;
	};



	// 创建需要的元素
	var bg = document.createElement('div');
	var dialogBg = document.createElement('div');
	var panel = document.createElement('div');
	var panelWrp = document.createElement('div');
	var header = document.createElement('div');
	var headClose = document.createElement('div');
	var content = document.createElement('div');
	var footer = document.createElement('div');
	var btncancel = document.createElement('button');
	var btnprimary = document.createElement('button');
	var footerContent = document.createElement('div');

	// 设置样式名
	bg.className = 'jss-dialog-bg';
	dialogBg.className='jss-dialog-trueBg';
	panelWrp.className = 'jss-dialog-panelWrp';
	panel.className = 'jss-dialog-panel';
	header.className = 'jss-dialog-header';
	headClose.className = 'jss-dialog-headClose';
	content.className = 'jss-dialog-content';
	footer.className = 'jss-dialog-footer';
	btncancel.className = 'jss-dialog-btncancel';
	btnprimary.className = 'jss-dialog-btnprimary';
	footerContent.className = 'jss-dialog-footer-content';

	// 按钮经过样式
	_this.addStyleSheet("jss-dialog-btncancel", {
		key: ".jss-dialog-btncancel:hover",
		value: {
			opacity: '0.9'
		}
	});
	_this.addStyleSheet("jss-dialog-btnprimary", {
		key: ".jss-dialog-btnprimary:hover",
		value: {
			opacity: '0.9'
		}
	});

	// 设置背景样式
	//var ifIe6Style=/MSIE\s6.0/g.test(navigator.userAgent)?'absolute':(config.position || 'fixed');
	var bgcss =null;
	if(/MSIE\s6.0/g.test(navigator.userAgent)){
		bgcss = {
			position:'absolute' ,
			zIndex: config.zIndex || '99999',
			top: 'expression(document.documentElement.scrollTop)+"px"',
			left: "0",
			right:0,
			bottom:0,
			zoom:1,
			height:'100%',
			width:'100%'
		};
	}else{
		bgcss = {
			position:(config.position || 'fixed') ,
			zIndex: config.zIndex || '99999',
			top: "0px",
			left: "0",
			right:0,
			bottom:0,
			zoom:1,
			height:'100%',
			width:'100%'
		};
	}
	// 设置背景样式
	var dialogBgcss = {
		position: 'absolute',
		top: "0",
		left: "0",
		bottom:'0',
		right:'0',
		background: '#000',
		opacity:'0.5',
		filter:'alpha(opacity=50)',
		zoom:1,
		height:'100%',
		width:'100%'
	};
	// 设置面板样式
	var panelcss = {
		width: config.contentWidth || tempPanelWidth,
		height: config.contentHeight || con_h + 'px',
		minHeight: "50px",
		overflow: 'hidden',
		margin: ' auto',
		position: 'relative',
		backgroundColor: '#fff',
		backgroundClip: 'padding-box',
		// border: config.hasborder != false ? '1px solid #999' : '0px',
		border: config.hasborder != false ? '1px solid #ccc' : '0px',
		borderRadius: (config.hasBorderRadius != false) ? '6px' : '0px',
		outline: 0
	};
	//面板wrp样式
	var panelWrpcss={
		paddingTop:(config.contentTop || tempPanelTop)
	};
	var headClosecss = {
		position: 'absolute',
		right: '10px',
		height: '45px',
		width: '30px',
		top: '0',
		//background: "url('" + _this.constant.pngClose64 + "') no-repeat",
		'fontSize':'30px',
		color:'#fff',
		lineHeight:'normal',
		cursor: 'pointer',
		'-webkit-transition': '-webkit-transform 0.2s ease-out',
		'-moz-transition': '-moz-transform 0.2s ease-out',
		'-o-transition': '-o-transform 0.2s ease-out',
		'-ms-transition': '-ms-transform 0.2s ease-out'

	};
	// 设置弹窗头部样式
	var headercss = {
		padding: '11px',
		fontSize: '16px',
		color: "#fff",
		textAlign: "center",
		// lineHeight: 1.42857143,
		fontWeight: 500,
		display: (config.showHeader != false) ? 'block' : 'none',
		borderBottom: '1px solid #e5e5e5',
		backgroundColor: '#4079b7',
		position: 'relative'
	};
	// 设置弹窗底部样式
	var footercss = {
		position:'relative',
		padding: '15px',
		textAlign: 'right',
		display: (config.showFooter != false) ? 'block' : 'none',
		borderTop: '1px solid #e5e5e5',
		zoom:1
	};
	// 设置弹窗底部取消按钮样式
	var btncancelcss = {
		color: '#fff',
		backgroundColor: '#f0ad4e',
		borderColor: '#eea236',
		display: ((config.cancel && !config.noCancel) ? 'inline-block' : 'none'),
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
	btnprimarycss['backgroundColor'] = '#4079b7';
	btnprimarycss['borderColor'] = '#4079b7';
	btnprimarycss['display'] = (config.action ? 'inline-block' : 'none');
	//关闭按钮
	headClosecss['display'] = (config.hasClose ? 'block' : 'none');

	// 设置弹窗内容样式
	var contentcss = {
		position: 'relative',
		margin: 0,
		padding: 0,
		height: config.contentHeight || con_h - tempPanelHeight + 'px',
		overflow: config.contentOverflow || 'hidden'
	};

	this.css(bg, bgcss);
	this.css(dialogBg, dialogBgcss);
	this.css(panelWrp, panelWrpcss);
	this.css(panel, panelcss);
	this.css(header, headercss);
	this.css(headClose, headClosecss);
	this.css(content, contentcss);
	this.css(footer, footercss);
	this.css(footerContent, {
		left:'15px',
		top:'15px',
		position:'absolute',
		textAlign:'left'
	});
	this.css(btncancel, btncancelcss);
	this.css(btnprimary, btnprimarycss);


	// 设置内容
	header.innerHTML = config.headerHtml || '\u6e29\u99a8\u63d0\u793a'; // 温馨提示
	btncancel.innerHTML = config.cancelText || '\u53d6\u6d88'; // 取消 
	btnprimary.innerHTML = config.actionText || '\u786e\u5b9a'; // 确定
	content.innerHTML = config.contentHtml || '<center> Hello world !</center>';
	footerContent.innerHTML = config.customFooterHtml || "";
	headClose.innerHTML='×';

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

	// 关闭按钮 事件处理
	this.bind(headClose, 'onclick', function() {
		config.cancel && config.cancel.call(di);
		// 删除当前弹窗
		!config.isCustomBtn && di.remove();
	});
	var _ele = this;
	this.bind(headClose, 'onmouseover', function() {
		_ele.css(headClose, {
			'-webkit-transform': 'rotateZ(180deg)',
			'-moz-transform': 'rotateZ(180deg)',
			'-o-transform': 'rotateZ(180deg)',
			'-ms-transform': 'rotateZ(180deg)',
			'transform': 'rotateZ(180deg)'
		});
	});
	this.bind(headClose, 'onmouseout', function() {
		_ele.css(headClose, {
			'-webkit-transform': 'rotateZ(0deg)',
			'-moz-transform': 'rotateZ(0deg)',
			'-o-transform': 'rotateZ(0deg)',
			'-ms-transform': 'rotateZ(0deg)',
			'transform': 'rotateZ(0deg)'
		});
	});
	// 将元素添加到文档中
	this.append(header, headClose);
	this.append(panel, header);
	this.append(panel, content);
	this.append(panel, footer);
	this.append(footer, footerContent);
	this.append(footer, btnprimary);
	this.append(footer, btncancel);
	this.append(bg, dialogBg);
	this.append(bg, panelWrp);
	this.append(panelWrp, panel);
	this.append(entity, bg);

	// 监听窗口大小改变事件
	this.bind(window, 'onresize', function() {
		if (!config.contentHeight) {
			h = document.documentElement.clientHeight || document.body.clientHeight;
			con_h = h - tempPanelBottomHeight;
			_ele.css(panel, {
				height: con_h + 'px'
			});
			_ele.css(content, {
				height: con_h - tempPanelHeight + 'px'
			});
		}
	});
	//ie6下弹层随着页面滚动而滚动
    if(/MSIE\s6.0/g.test(navigator.userAgent)){
    	if(jss('.jss-dialog-bg')){
            this.bind(window,'onscroll',function(e){
                jss('.jss-dialog-bg').css({
                    top:document.documentElement.scrollTop+'px'
                });
	    	});
    	}
    }

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
	/**
	 * 设置全屏展示对话框
	 */
	di.setFullScreen = setFullScreen;

	function setFullScreen(isfirst){
		// tempPanelHeight = (45 + 65);
		tempPanelBottomHeight = 0;
		tempPanelTop = '0px'; // 缺省弹窗距顶部高度
		tempPanelWidth = '100%'; // 宽度100%
		// 是否为内部初始化设置全屏
		if(!isfirst){
			_this.css(panel, {
				width: '100%',
				margin: '0px auto',
				height: (document.documentElement.clientHeight || document.body.clientHeight) + 'px'
			});
			_this.css(content, {
				height: (document.documentElement.clientHeight || document.body.clientHeight) - tempPanelHeight + 'px'
			});
		}
	}

	// 缓存对话窗对象
	panel._dialog = di;


	return di;
}