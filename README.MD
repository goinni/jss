# 一个原生的js代码库，可在此基础上灵活开发
## Author: HOUZHENYU

# 运行
## npm install 
## grunt 调式
## grunt release 发布
## 兼容IE 7+ 

# JSS开发文档
## 选择器
```
var $ = jss;//如果没有冲突，可以这样定义
$('#id'); //通过id获取 一个元素
$('.className');  //通过class获取 一个元素或一组元素；（目标值只有一个时为一个元素，否则为数组）
$('div');     //通过标签名获取 一个元素或一组元素
$('<div>');   //通过标签创建一个元素
$('dom对象'); //可以将一个dom对象传入，返回jss对象
```
## 事件

```
var obj = jss('#buttonId');
//事件绑定
obj.bind('onclick',function(){
    //this为当前dom元素
    //TODO...
});
//事件解绑
obj.unbind('onclick');

```
## 样式操作

```
var obj = jss('#divId');
obj.addClass('className');     //添加样式
obj.hasClass('className');     //是否包含样式
obj.removeClass('className');  //删除样式
obj.toggleClass('className');  //切换样式（添加或删除）
obj.css('height');     //获取样式高度
obj.css({
    height:'200px',
    background:'red',
    color:'#FFF'
});                         //设置元素样式
obj.show(); // 隐藏
obj.hide(); // 显示 
/*
 * 在head中动态添加一个样式组
 * @param cssId 在当前文档中样式表唯一的ID，相同ID只允许设置一次
 * @param cssText 样式字符串
 * 动态添加<style></style>里的样式
    //动太样式
    var cssText = "\
    h3{\
        color:red;\
        border:1px solid green;\
        padding:10px;\
    }\
    ";
    例如： jss.addStyleSheet("bodyCssId", "body{color:red;}");
    设置完后会在head style标签中添加一个样式表
    PS: 
	cssText 可以为json对象
	{
		key: '.panel a',    //样式名
		value: {     //样式对象
			width:'100px',
			'border-top': '10px solid red'
		}
	}
 */
jss.addStyleSheet(cssId, cssText);
```
## dom操作

```
var obj = jss('#divId');
obj.getDom();      //获取原生dom对象
obj.append(objects);      //追加N个元素，objects可以为原生数组和对象 或jss对象
obj.html(text);      //设置或获取innerHTML ，text不为空为设置
obj.val(text);      //设置或获取input、textarea 中的value;
obj.removeAttr(name); //删除属性
obj.attr(object);      //获取和设置元素属性, 参数为属性名则获取 ，为json对象则设置
obj.parent();      //获取元素父节点
obj.remove();      //删除一个或多个元素
obj.children();    //获取子节点，但不包含孙节点
obj.find(index);     // 从当前结果下所有子节点包括孙节点 中查找指定元素，index 选择器参数#id 或 .class 或 div标签名等
obj.clientRect();   //获取元素显示区域信息，返回对象包含：left,top,bottom,right,width,height
/*
 * 获取标签在文档中的位置
 * @return {left:xx,top:xx} 坐标
 */
obj.documentPosition(); 
```
## 工具方法

```
//获取当前窗口内唯一编号 【注】返回值为 int 类型 ，从1000开始
jss.uuid(); 

//cookie操作
jss.cookie({
	name:'名字',
	value:'值',
	time: 1*24*60*60*1000  //过期时间，[单位]毫秒 ; 1天 =1*24*60*60*1000
});
jss.cookie('houzhenyu');

//停止事件的传播，阻止它被分派到其他 Document 节点
jss.stopPropagation(e);

/**
 * 监听输入框输入的值
 * @param onFocusCallback 获得焦点时回调
 * @param onBlurCallback  失去焦点时回调
 * @param time 监听频率 缺省值100毫秒
 */
$('#inputtest').inputTimer(function(){
    //this 为当前input对象
	console.log(this.value, 'onfoucs');
},function(){
	console.log(this.value, 'onblur');
});

/**
 * 获取浏览器参数名称
 * @param name 浏览器地址参数名
 */
jss.queryUrlParam('name');

/*
 * 渲染模板，并将值传入 【注】该方法依赖 art-template 组件库
 * @param tplString html模板字符串
 * @param data 模板数据json对象
 * @return 返回生成后的html字符串
 */
jss(id).renderTpl(htmlTplText,{数据对象});

//获取第一个div，返回值为jss对象，可以getDom()获取原始对象
jss('div').eq(0);

/*
 * 判断对象是否为集合(包含html集合和普通数组对象)
 * @param entity     指定的对象
 */
jss.isCollection(entity);
/*
 * 判断是否为数组
 */
jss.isArray(entity);
/*
 * 判断是否为数组
 */
jss.isHTMLCollection(entity);
/**
 * 获取区间随机数据（ 最小数 ~ 最大数之间的一个随机数 ）
 * @param startNum 最小数
 * @param endNum   最大数
 */
jss.randomNum(startNum, endNum);

```
## 自由拖拽

```
/*
 * 使元素自由可拖拽
 * @param callback 回调
 * callback(left, top); //this为当前拖拽对象
 *【注】使用时请先将元素设置绝对定位！！！！
 */
jss('#boxid').drag(function(left, top){
    //拖拽时时回调
    //this 当前拖拽的对象
    //left 当前跟窗口左侧距离
    //top 当前跟窗口上面距离
	console.log(this,left,top);
});
```

## 弹窗

```
// 使用方法
jss(entity).dialog(config);

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
	cancelText: '取消', // 按钮文本，缺省为取消
	actionText: '确定', // 按钮文本，缺省为确定
	contentOverflow: 'auto', // 内容溢出滚动，缺省值为 hidden
	showHeader: true,  // false 隐藏, 缺省显示 
	showFooter: true,  // false 隐藏, 缺省显示 
	isFullScreen: true, // 是否全屏展示, 缺省值false
	hasBorderRadius: false,  // 是否圆角, 缺省圆角
	contentWidth: '100%',    // 内容宽度
	contentTop: '0', 		 // 内容面板距窗口上边距离
	hasborder: false,		 // 没有边框，缺省有边框
	hasShadow: false,		 // 没有阴影，缺省有阴影 
	isCustomBtn: true,   // 是否自定义按钮事件，影响取消按钮默认关闭
	action: function(){
		// 确定按钮
		//this 表示当前dialog对象
		// 【注】该方法决定按钮是否存在
		this.remove();	// 删除弹窗
	},
	cancel: function(){
		// alert('取消按钮');
		// 【注】该方法决定按钮是否存在
	}
}
*/

//示例
var dialog = jss('body').dialog({
	position: 'fixed', // 'relative', 'absolute'
	zIndex: 100, // 弹层
	headerHtml: '温馨提示',
	contentHtml: '<center style="line-height: 50px;"> Welcome Jss</center>', // 支持html代码片段
	cancelText: '取消',
	actionText: '确定',
	contentOverflow: 'auto', // 内容溢出滚动，缺省值为 hidden
	// showHeader: true,  // false 隐藏, 缺省显示 
	// showFooter: true,  // false 隐藏, 缺省显示 
	isFullScreen: true, // 是否全屏展示, 缺省值false
	// hasBorderRadius: false,  // 是否圆角, 缺省圆角
	// contentWidth: '100%',   // 内容宽度
	// contentTop: '0', 		// 内容面板距窗口上边距离
	// hasborder: false,		// 没有边框，缺省有边框
	// hasShadow: false,		// 没有阴影，缺省有阴影 
	customFooterHtml: "这里footer内容",		// 自定义footer内容
	action: function(){
		// 确定按钮
		//this 表示当前dialog对象
		this.remove(); // 关闭弹窗
	},
	cancel: function(){
		// alert('取消按钮');
	}
});
 
/*
 * 动态设置窗口内容
 * @param contentHtml 弹窗内容
 */
 dialog.setContent(contentHtml); 
/*
 * 动态设置窗口全屏
 */
 dialog.setFullScreen();  // 或者 jss('.jss-dialog-panel').getDom()['_dialog'].setFullScreen();
 /**
  * 删除弹窗
  */
 dialog.remove();
```
## 向指定元素添加loading效果

```
// 让指定模块loading 和 取消loading  (#testpanel 可以是 body, 参数为选择器)
 var loading = jss('#testpanel').loading({
 	position: 'absolute', // fixed、absolute、relative ；  缺省值 absolute 
	zIndex: '99999999', // 缺省值为 99999999
	// width: '30px',//指定loading图片宽度
	// src: '图片地址',//自定义loading图片路径
	// left: '150px', 	 // 缺省值为 loading父容器1/2 ，即中心位置
	top: '100px'	/// 缺省值为 100px
 });
 
 //3秒后取消loading 
 setTimeout(function(){
 	loading.remove();
 },3000);
 
```
## 向指定元素下创建下拉框

```
   var select = $("#hm_test_select").select({
        height: "32",
        defaultValue: 7,
        options: [{value: 1, text: "测试"}, {value: 2, text: "测试2"} ],
        calback: function (data) {
            console.log(data.text)
        }
    });

 初始化参数
 opt={
   height:32           //下拉框高度
   defaultValue:7      //下拉框默认选中值
   options： data          //下拉列表数据[]
   calback:calback      //点击下拉选项回调
 }
 //设置下拉框选中值
 select.setValue(8)
 //设置下拉框是否可用
 select.setDisabled(true)
 //获取当前选中值
 select.getValue()

```
## Tab选项卡

```
// 在body中添加一个 tag 选项卡
 var tabs = $('body').tabs({
 	width: '600px',
 	height: '500px',
 	items:[{
 	    id:"one", //选项编号
 		title: '标题一',
 		disabled: true, //当前项不可用时，content字段无效，但事件回调可用，
 		//content: '内容一',
 		callback: function(content){
 			// content.innerHTML 内容对象
 			console.log('点击回调1');
 		}
 	},{
 	    id:"two", //选项编号
 		title: '标题二',
 		content: '<div style="text-align:center; font-weight:blod; line-height:100px;">内容二</div>',
 		callback: function(content){
 			// this 是当前单击的nav  a 对象
 			// content 是显示内容的 dom 对象
 			// [注] 单击时content不为空时，会先设置内容，再走回调，如果content为空，则直接走回调

 			console.log('点击回调2');
 		}
 	},{
 	    id:"three", //选项编号
 		title: '标题三',
 		content: '<div style="text-align:center; font-weight:blod; line-height:100px;">内容三</div>',
 		callback: function(content){
 			// content.innerHTML 内容对象
 			console.log('点击回调3');
 		}
 	}]
 });
 
 //设置激活某个tab选项
 tabs.setActive("three"); //three是tab的id
 /*
  * 更新指定 tab 数据
  * @param list [{id: '编号是必需的', title: '标题', content: '内容', isActive: '是否为激活状态 true是'}]
  * @param isReset 重置item选项
  */
 tabs.updateData(list, isReset);
```
## 伸缩菜单

```

 jss('#accordion_box').accordion({
	width: '260px',
	height: '300px',
	mutex: true, //是否互斥
	// firstOpen: false, //第一个是否打开，缺省值是：打开
	// openAll: true, // 初始化时，打开所有
	items:[{
	    id: "面板编号，缺省时为当前数组索引",
 		title: '标题一',
 		content: '于陕西省西安市，中国内地男演员、导演。2006年毕业于中央戏剧学院表演系。',
 		callback: function(content){
 			// content.innerHTML 内容对象
 			console.log('点击回调1', content, this);
 		}
 	},{
 		title: '标题二',
 		content: '饰演80后城市青年小贝。[1]2009年，在电影《海洋天堂》中扮演自闭症患者王大福',
 		callback: function(content){
 			// this 是当前单击的nav  a 对象
 			// content 是显示内容的 dom 对象
 			// [注] 单击时content不为空时，会先设置内容，再走回调，如果 为空，则直接走回调

 			console.log('点击回调2', content);
 		}
 	},{
 		title: '标题三',
 		stopClick: true, //阻止点击事件
 		active: true, //设置为激活状态（即打开状态）
 		content: '饰演80后城市青年小贝。[1]2009年，在电影《海洋天堂》中扮演自闭症患者王大福',
 		callback: function(content, isActive){
 			// this 是当前单击的nav  a 对象
 			// content 是显示内容的 dom 对象
 			// isActive 当前激活状态，即面板是否为打开
 			// [注] 单击时content不为空时，会先设置内容，再走回调，如果 为空，则直接走回调

 			console.log('点击回调2');
 		}
 	}]
})
// accordion.open(id); //打开指定id元素，id为面板编号，缺省时为当前items数组索引
// accordion.openAll();// 打开所有
// accordion.closedAll();// 关闭所有
// accordion.updateData(items);// 更新面板内容 config.items对象
```

## 面板

```

//在body中添加一个面板
$('body').panel({
	width: "300px",
	height: "200px",
	title: "<b>用药审核2</b>",
	content: "<i>相互作用：A与B谨慎使用</i><br/>用药禁忌：无",
	callback: function(head, body){
		head.innerHTML = '动态修改的标题';
		body.innerHTML = '动态修改的内容';
	}
});
```
## suggest 自动提示下拉框

```
// 单击body任意位置隐藏组件
// <input id="suggest"/>
var sug = $('#suggest').suggest({
	stopPropagation: false,//单击body任意位置不隐藏组件（缺省值是隐藏）
    items:[{
      key: 1,
      value: 'jerry'
    },{
      key: 2,
      value: 'jerry2'
    },{
      key: 3,
      value: 'jerry3'
    }],
    callback: function(key, value){
      // 列表每个option点击事件
      console.log(key, value);
    }
    //, 
    //下面可以不设置，缺省值为输入框的可用宽度，高度缺省值为200px,位置为输入框的正下方
    //width: '500px',
    //height: '300px',
    //left: '100px',
    //top: '50px',
});
//输入框值改变时更新内容
$('#suggest').bind('onkeyup', function(e){
  //更新suggest提示内容
  sug.updateData([{
    key:1,
    value: this.value
  }]);
   //显示提示框
  sug.show(); 
  //隐藏提示框
  //sug.hide();
});
```



## 数据请求

```
/**
 * AJAX 请求
 * @param opt.url 请求地址
 * @param opt.success 成功回调
 * @param opt.error 失败回调
 * @param opt.type 请求方法 缺省值为GET
 * @param opt.data 请求参数
 * @param opt.header 设置请求头 {key: value}
 * @param opt.async 是否异步请求数据，缺省值为是
 */
jss.ajax({
	url: 'http://www.aaa.com/v_2_2/common_all',
	type: "POST",
	header: {
		Huimei_id: "B1234567"
	},
	success: function(d){
		console.log(d);
	}
});

/*
 * ie8跨域请求
 * @param opt.url   请求地址
 * @param opt.type  请求方法 POST 或 GET
 * @param opt.time  请求超时 毫秒
 * @param opt.data  请求参数 json对象字符串
 */
jss.xdr({
    url:'请求地址',
    type:'POST',
    time:'10000',
    data:'json对象字符串'
});
```























