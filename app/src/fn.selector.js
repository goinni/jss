/*
 * 选择器
 * @author Jerry
 * @time 2017-01-13
 */
_jss.fn.selector = function(name) {
    var _this = {},
        fn = this;

    /*
     * jss对象标记
     */
    _this.isJss = true;

    /**
     * 获取原始dom元素
     */
    _this.getDom = function() {
        return _this.result;
    }
    
    /**
     * 获取集合中的某个节点，返回jss对象
     */
    _this.eq = function(index) {
        _this.result = (_this.result.length ? _this.result[index] : _this.result);
        return _this;
    }

    /*
     * 显示元素
     */
    _this.show = function(){
        fn.show(_this.result);
        return _this;
    }

    /*
     * 隐藏元素
     */
    _this.hide = function(){
        fn.hide(_this.result);
        return _this;
    }

    /*
     * 设置input、textarea元素值
     */
    _this.val = function(text){
        var r = fn.value(_this.result, text);
        if(typeof text == 'undefined'){
            return r;
        }
        return _this;
    }

    /*
     * 设置元素innerHTML内容
     */
    _this.html = function(text){
        var r = fn.html(_this.result, text);
        if(typeof text == 'undefined'){
            return r;
        }
        return _this;
    }

    /**
     * 向元素后加入元素
     * @param obj 一个dom元素或一组元素
     */
    _this.append = function(obj) {
        if (obj.isJss) {
            obj = obj.result;
        }
        if (obj && obj.length) {
            for (var i = 0; i < obj.length; i++) {
                fn.append(_this.result, obj[i]);
            }
        } else {
            fn.append(_this.result, obj);
        }
        return _this;
    }

    /*
     * 是否包含指定的类名
     * @param className 类名
     */
    _this.hasClass = function(className) {
        return fn.hasClass(
            filterArrFirst(_this.result),
            className
        );
    }

    /*
     * 是否包含指定的类名
     * @param className 类名
     */
    _this.css = function(cssProperty) {
        var r = fn.css(
            _this.result,
            cssProperty
        );
        if (typeof cssProperty === 'string') {
            return r;
        } else {
            return _this;
        }
    }

    /*
     * 向元素中添加class样式
     * @param className 类名
     */
    _this.addClass = function(className) {
        fn.addClass(_this.result, className);
        return _this;
    }

    /*
     * 获取所有子节点，不包括孙节点
     */
    _this.children = function() {
        _this.result = fn.children(_this.result);
        return _this;
    }

    /*
     * 删除元素中class样式
     * @param className 类名
     */
    _this.removeClass = function(className) {
        fn.removeClass(_this.result, className);
        return _this;
    }

    /*
     * 获取和设置元素属性
     * @param value 属性名 或 属性json对象
     */
    _this.attr = function(value) {
        if (typeof value === 'string') {
            return fn.getAttr(
                filterArrFirst(_this.result),
                value
            );
        } else {
            fn.setAttr(_this.result, value);
            return _this;
        }
    }

    /*
     * 删除属性
     */
    _this.removeAttr = function(name) {
        fn.removeAttr(_this.result, name);
        return _this;
    }

    /*
     * 获取父节点
     */
    _this.parent = function() {
        _this.result = fn.parent(
            filterArrFirst(_this.result)
        );
        return _this;
    }

    /*
     * 从当前结果下所有子节点包括孙节点 中查找指定元素
     * @param index 选择器参数#id 或 .class 或 div标签名等, 参数为空时获取所有子节点及孙节点
     */
    _this.find = function(index) {
        _this.result = filterArrFirst(_this.result); //防止结果是多个，如果是多个则取第一个下面的值
        return fn.isee(index, _this, true);
    }
    /*
     * 按属性查询dom结点
     * @param index 选择器参数#id 或 .class 或 div标签名等, div[name=]
     */
    _this.findByAttr = function(index) {
        _this.result = filterArrFirst(_this.result); //防止结果是多个，如果是多个则取第一个下面的值
        return fn.isee(index, _this, true);
    }

    /*
     * 获取当前元素的显示区信息，返回对象包含top,left,right,bottom,width,height
     */
    _this.clientRect = function() {
        return fn.clientRect(
            filterArrFirst(_this.result)
        );
    }

    /*
     * 删除节点
     */
    _this.remove = function() {
        fn.remove(_this.result);
        return _this;
    }

    /*
     * 切换样式
     */
    _this.toggleClass = function(className) {
        fn.toggleClass(_this.result, className);
        return _this;
    }

    /*
     * 事件绑定
     * @param type   	事件类型，如：onclick, onkeyup,onkeydown ...
     * @param callback  事件回调
     */
    _this.bind = function(type, callback) {
        fn.bind(_this.result, type, callback);
        return _this;
    }

    /*
     * 事件解绑定
     * @param type   	事件类型，如：onclick, onkeyup,onkeydown ...
     */
    _this.unbind = function(type) {
        fn.unbind(_this.result, type);
        return _this;
    }

    /**
     * 监听输入框输入的值
     * @param input 输入框dom对象
     * @param onFocusCallback 获得焦点时回调
     * @param onBlurCallback  失去焦点时回调
     * @param time 监听频率 缺省值100毫秒
     */
    _this.inputTimer = function(onFocusCallback, onBlurCallback, time) {
        fn.inputTimer(
            filterArrFirst(_this.result),
            onFocusCallback,
            onBlurCallback,
            time
        );
        return _this;
    }

    /*
     * 使元素自由可拖拽
     * @param callback 回调
     * callback(left, top); //this为当前拖拽对象
     *【注】使用时请先将元素设置绝对定位！！！！
     */
    _this.drag = function(callback) {
        fn.dragElement(
            filterArrFirst(_this.result),
            callback
        );
        return _this;
    }

    /**
     * 打开弹窗
     * @param config 弹窗配制
     */
    _this.dialog = function(config) {
        return fn.dialog(config, filterArrFirst(_this.result));
    }

    /*
     * 在指定区域添加loading效果
     */
    _this.loading = function(config) {
        return fn.loading(filterArrFirst(_this.result), config);
    }
    /**
     * 指定区域创建下拉框
     * @param config
     */
    _this.select = function(config) {
        return fn.select(filterArrFirst(_this.result), config);
    }

    /*
     * 动态创建选项卡
     */
    _this.tabs = function(config) {
        return fn.tabs(filterArrFirst(_this.result), config);
    };
    /*
     * 动态创建手风琴
     */
    _this.accordion = function(config) {
        return fn.accordion(filterArrFirst(_this.result), config);
    }

    /*
     * 渲染模板，并将值传入 【注】该方法依赖 art-template 组件库
     * @param tplString html模板字符串
     * @param data 模板数据json对象
     * @return 返回生成后的html字符串
     */
    _this.renderTpl = function(tplString, data){
        var result = null;
        try{
            var render = template.compile(tplString);
                result = render(data);
            if(_this.result){
                var dom = filterArrFirst(_this.result);
                dom.innerHTML = result;
            }
        }catch(e){
            throw new Error("add [ art-template ] lib please!!");
        }
        return result; 
    }

    /*
     * 向指定容器中添加一个面板
     * @param config 配制对象
     */
    _this.panel = function(config){
        return fn.panel(filterArrFirst(_this.result), config);
    }
    /*
     * 获取标签在文档中的位置
     * @return {left:xx,top:xx} 坐标
     */
    _this.documentPosition = function(){
        var r = fn.documentPosition(filterArrFirst(_this.result));
        return r;
    };
    /**
     * 自动提示层
     */
    _this.suggest = function(config){
        return fn.suggest(filterArrFirst(_this.result), config);
    }

    /**
     * 校验结果
     * 当结果为数组时返回第一个元素
     * [注]在必要的方法里使用 比如：hasClass,多个结果，只取第一个
     */
    function filterArrFirst(o) {
        if (o && o.length) {
            o = o[0];
        }
        return o;
    }


    return fn.isee(name, _this);
}