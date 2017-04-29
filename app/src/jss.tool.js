/*
 * 动态添加一个样式组
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
    例如： fn.addStyleSheet("bodyCssId", "body{color:red;}");
    设置完后会在head style标签中添加一个样式表
 */
jss.addStyleSheet = function(cssId, cssText) {
    return jss.prototype.addStyleSheet(cssId, cssText);
}
/**
 * 获取唯一编号
 */
jss.uuid = function() {
    return jss.prototype.uuid();
}
/*
 * 停止事件的传播，阻止它被分派到其他 Document 节点
 * @param e 事件源
 */
jss.stopPropagation = function(e) {
    jss.prototype.stopPropagation(e);
}
/**
 * cookie设置和获取
 * @param opt cookie名字或设置cookie信息；如：{name:'', value:'', time:'过期时间'}
 */
jss.cookie = function(opt) {

    if (typeof opt === 'string') {
        //获取
        return jss.prototype.getCookie(opt);
    } else {
        //设置
        jss.prototype.setCookie(opt.name, opt.value, opt.time);
    }
}

/*
 * AJAX 请求
 * @param opt.url 请求地址
 * @param opt.success 成功回调
 * @param opt.error 失败回调
 * @param opt.type 请求方法 缺省值为GET
 * @param opt.data 请求参数
 * @param opt.header 设置请求头 {key: value}
 * @param opt.async 是否异步请求数据，缺省值为是
 */
jss.ajax = function(opt) {
    jss.prototype.ajax(opt);
}

/*
 * ie8跨域请求
 * @param opt.url   请求地址
 * @param opt.type  请求方法  POST 或 GET
 * @param opt.time  请求超时
 * @param opt.data  请求参数  json对象字符串
 */
jss.xdr = function(opt) {
    jss.prototype.xdr(opt);
}
/**
 * 获取浏览器参数名称
 * @param name 浏览器地址参数名
 */
jss.queryUrlParam = function(name) {
    return jss.prototype.queryUrlParam(name);
}
/**
 * 克隆json对象
 * @param jsonobject json对象
 * @return 新的json对象
 */
jss.clone = function(jsonobject) {
    return jss.prototype.clone(jsonobject);
}

/*
 * 判断对象是否为集合(包含html集合和普通数组对象)
 * @param entity     指定的对象
 */
jss.isCollection = function(entity){
    return jss.prototype.isCollection(entity);
}
/*
 * 判断是否为数组
 */
jss.isArray = function(entity){
    return jss.prototype.isArray(entity);
}
/*
 * 判断是否为数组
 */
jss.isHTMLCollection = function(entity){
    return jss.prototype.isHTMLCollection(entity);
}








