/*
 * 向指定元素添加loading效果
 */
_jss.fn.loading = function(entity, config) {
	var _this = this;
	var imgs = _this.getElementsByClass("jss-loading-img",entity);
	if(imgs && imgs.length){   //只允许一个loading
		_this.remove(imgs);
	}
	var img = document.createElement('img'),
		di = {},
		likeImg=document.createElement('div');


	img.className = 'jss-loading-img';

	// 计算中心位置，方便设置loading在指定容器距中显示 
	var width = entity.clientWidth || entity.offsetWidth; //loading 父容器宽度
	var loadingCenter = (parseFloat(width) - 35) / 2 + 'px'; //设置loading距中位置
	// loading图标样式
	var imgcss = {
			position: config.position || 'absolute',
			zIndex: config.zIndex || '99999999',
			margin: '0 auto',
			display: 'block',
			width: config.width || 'auto',
			height:config.height || 'auto',
			left: config.left || loadingCenter,
			top: config.top || '100px',
			fontSize:'12px',
			color:'#666'
		};
	var likeImgcss = {
			position: config.position || 'absolute',
			zIndex: config.zIndex || '99999999',
			margin: '0 auto',
			width: config.width || 'auto',
			left: config.left || loadingCenter,
			top: config.top || '100px',
			fontSize:'10px',
			color:'#666'
		};
		// 设置
	likeImg.innerHTML='加载中...';
	this.css(img, imgcss);
	this.css(likeImg, likeImgcss);
	img.src = config.src || "data:image/gif;base64,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";
	if((!config.src)&&(/MSIE\s6.0/g.test(navigator.userAgent)||/MSIE\s7.0/g.test(navigator.userAgent))){
		this.append(entity, likeImg);
	}else{
		this.append(entity, img);
	}
	// 删除loading
	di.remove = function() {
		try {
			_this.remove(img);
		} catch (e) {}
        try {
            _this.remove(likeImg);
        } catch (e) {}

	}

	return di;
}