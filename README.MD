# 一个原生的js代码库，可在此基础上灵活开发
## Author: 侯振宇

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
    例如： jss().addStyleSheet("bodyCssId", "body{color:red;}");
    设置完后会在head style标签中添加一个样式表
 */
jss().addStyleSheet(cssId, cssText);
```
## dom操作

```
var obj = jss('#divId');
obj.getDom();      //获取原生dom对象
obj.append(objects);      //追加N个元素，objects可以为原生数组和对象 或jss对象
obj.html(text);      //设置或获取innerHTML ，text不为空为设置
obj.attr(object);      //获取和设置元素属性, 参数为属性名则获取 ，为json对象则设置
obj.parent();      //获取元素父节点
obj.remove();      //删除一个或多个元素
obj.children();    //获取子节点，但不包含孙节点
obj.find(index);     // 从当前结果下所有子节点包括孙节点 中查找指定元素，index 选择器参数#id 或 .class 或 div标签名等
obj.clientRect();   //获取元素显示区域信息，返回对象包含：left,top,bottom,right,width,height
```
## 工具方法

```
//获取当前窗口内唯一编号 【注】返回值为 int 类型 ，从1000开始
jss().uuid(); 

//cookie操作
jss().cookie({
	name:'名字',
	value:'值',
	time: 1*24*60*60*1000  //过期时间，[单位]毫秒 ; 1天 =1*24*60*60*1000
});
jss().cookie('houzhenyu');

//停止事件的传播，阻止它被分派到其他 Document 节点
jss().stopPropagation(e);

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
jss().queryUrlParam('name');
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
	showHeader: true,  // false 隐藏, 缺省显示 
	showFooter: true,  // false 隐藏, 缺省显示 
	hasBorderRadius: false,  // 是否圆角, 缺省圆角
	contentWidth: '100%',    // 内容宽度
	contentTop: '0', 		 // 内容面板距窗口上边距离
	hasborder: false,		 // 没有边框，缺省有边框
	hasShadow: false,		 // 没有阴影，缺省有阴影 
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

//示例
var dialog = jss('body').dialog({
	position: 'fixed', // 'relative', 'absolute'
	zIndex: 100, // 弹层
	headerHtml: '温馨提示',
	contentHtml: '<center style="line-height: 50px;"> Welcome Jss</center>', // 支持html代码片段
	cancelText: '取消',
	actionText: '确定',
	// showHeader: true,  // false 隐藏, 缺省显示 
	// showFooter: true,  // false 隐藏, 缺省显示 
	// hasBorderRadius: false,  // 是否圆角, 缺省圆角
	// contentWidth: '100%',   // 内容宽度
	// contentTop: '0', 		// 内容面板距窗口上边距离
	// hasborder: false,		// 没有边框，缺省有边框
	// hasShadow: false,		// 没有阴影，缺省有阴影 
	action: function(){
		// 确定按钮
		//this 表示当前dialog对象
		this.remove(); // 关闭弹窗
	},
	cancel: function(){
		// alert('取消按钮');
	}
});
 
 
```
## 向指定元素添加loading效果

```
// 让指定模块loading 和 取消loading  (#testpanel 可以是 body, 参数为选择器)
 var loading = jss('#testpanel').loading({
 	position: 'absolute', // fixed、absolute、relative ；  缺省值 absolute 
	zIndex: '99999999', // 缺省值为 99999999
	// left: '150px', 	 // 缺省值为 loading父容器1/2 ，即中心位置
	top: '100px'	/// 缺省值为 100px
 });
 
 //3秒后取消loading 
 setTimeout(function(){
 	loading.remove();
 },3000);
 
```
## Tab选项卡

```
// 在body中添加一个 tag 选项卡
 jss('body').tabs({
 	width: '600px',
 	height: '500px',
 	items:[{
 		title: '标题一',
 		content: '<div style="text-align:center; font-weight:blod; line-height:100px;">内容一</div>',
 		callback: function(content){
 			// content.innerHTML 内容对象
 			console.log('点击回调1');
 		}
 	},{
 		title: '标题二',
 		content: '<div style="text-align:center; font-weight:blod; line-height:100px;">内容二</div>',
 		callback: function(content){
 			// this 是当前单击的nav  a 对象
 			// content 是显示内容的 dom 对象
 			// [注] 单击时content不为空时，会先设置内容，再走回调，如果content为空，则直接走回调

 			console.log('点击回调2');
 		}
 	},{
 		title: '标题三',
 		content: '<div style="text-align:center; font-weight:blod; line-height:100px;">内容三</div>',
 		callback: function(content){
 			// content.innerHTML 内容对象
 			console.log('点击回调3');
 		}
 	}]
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
jss().ajax({
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
jss().xdr({
    url:'请求地址',
    type:'POST',
    time:'10000',
    data:'json对象字符串'
});
```




