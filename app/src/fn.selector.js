/*
 * 选择器
 * @author Jerry
 * @time 2017-01-13
 */
_jss.fn.selector = function(name) {
    var fn = this;
    var _this = new selectMethod(fn);
    /*
     * jss对象标记
     */
    _this.isJss = true;
    return fn.isee(name, _this);
};
function selectMethod(fn) {
    this.fn = fn;
}

selectMethod.prototype = {

    /**
     * 获取原始dom元素
     */
    getDom: function () {
        return this.result;
    },

    /**
     * 获取集合中的某个节点，返回jss对象
     */
    eq: function (index) {
        this.result = (this.result.length ? this.result[index] : this.result);
        return this;
    },

    /*
     * 显示元素
     */
    show: function () {
        this.fn.show(this.result);
        return this;
    },

    /*
     * 隐藏元素
     */
    hide: function () {
        this.fn.hide(this.result);
        return this;
    },

    /*
     * 设置input、textarea元素值
     */
    val: function (text) {
        var r = this.fn.value(this.result, text);
        if (typeof text == 'undefined') {
            return r;
        }
        return this;
    },

    /*
     * 设置元素innerHTML内容
     */
    html: function (text) {
        var r = this.fn.html(this.result, text);
        if (typeof text == 'undefined') {
            return r;
        }
        return this;
    },

    /**
     * 向元素后加入元素
     * @param obj 一个dom元素或一组元素
     */
    append: function (obj) {
        if (obj.isJss) {
            obj = obj.result;
        }
        if (obj && obj.length) {
            for (var i = 0; i < obj.length; i++) {
                this.fn.append(this.result, obj[i]);
            }
        } else {
            this.fn.append(this.result, obj);
        }
        return this;
    },

    /*
     * 是否包含指定的类名
     * @param className 类名
     */
    hasClass: function (className) {
        return this.fn.hasClass(
            this.filterArrFirst(this.result),
            className
        );
    },

    /*
     * 是否包含指定的类名
     * @param className 类名
     */
    css: function (cssProperty) {
        var r = this.fn.css(
            this.result,
            cssProperty
        );
        if (typeof cssProperty === 'string') {
            return r;
        } else {
            return this;
        }
    },

    /*
     * 向元素中添加class样式
     * @param className 类名
     */
    addClass: function (className) {
        this.fn.addClass(this.result, className);
        return this;
    },

    /*
     * 获取所有子节点，不包括孙节点
     */
    children: function () {
        this.result = this.fn.children(this.result);
        return this;
    },

    /*
     * 删除元素中class样式
     * @param className 类名
     */
    removeClass: function (className) {
        this.fn.removeClass(this.result, className);
        return this;
    },

    /*
     * 获取和设置元素属性
     * @param value 属性名 或 属性json对象
     */
    attr: function (value) {
        if (typeof value === 'string') {
            return this.fn.getAttr(
                this.filterArrFirst(this.result),
                value
            );
        } else {
            this.fn.setAttr(this.result, value);
            return this;
        }
    },

    /*
     * 删除属性
     */
    removeAttr: function (name) {
        this.fn.removeAttr(this.result, name);
        return this;
    },

    /*
     * 获取父节点
     */
    parent: function () {
        this.result = this.fn.parent(
            this.filterArrFirst(this.result)
        );
        return this;
    },

    /*
     * 从当前结果下所有子节点包括孙节点 中查找指定元素
     * @param index 选择器参数#id 或 .class 或 div标签名等, 参数为空时获取所有子节点及孙节点
     */
    find: function (index) {
        this.result = this.filterArrFirst(this.result); //防止结果是多个，如果是多个则取第一个下面的值
        return this.fn.isee(index, this, true);
    },
    /*
     * 按属性查询dom结点
     * @param index 选择器参数#id 或 .class 或 div标签名等, div[name=]
     */
    findByAttr: function (index) {
        this.result = this.filterArrFirst(this.result); //防止结果是多个，如果是多个则取第一个下面的值
        return this.fn.isee(index, this, true);
    },

    /*
     * 获取当前元素的显示区信息，返回对象包含top,left,right,bottom,width,height
     */
    clientRect: function () {
        return this.fn.clientRect(
            this.filterArrFirst(this.result)
        );
    },

    /*
     * 删除节点
     */
    remove: function () {
        this.fn.remove(this.result);
        return this;
    },

    /*
     * 切换样式
     */
    toggleClass: function (className) {
        this.fn.toggleClass(this.result, className);
        return this;
    },

    /*
     * 事件绑定
     * @param type   	事件类型，如：onclick, onkeyup,onkeydown ...
     * @param callback  事件回调
     */
    bind: function (type, callback) {
        this.fn.bind(this.result, type, callback);
        return this;
    },

    /*
     * 事件解绑定
     * @param type   	事件类型，如：onclick, onkeyup,onkeydown ...
     */
    unbind: function (type) {
        this.fn.unbind(this.result, type);
        return this;
    },

    /**
     * 监听输入框输入的值
     * @param input 输入框dom对象
     * @param onFocusCallback 获得焦点时回调
     * @param onBlurCallback  失去焦点时回调
     * @param time 监听频率 缺省值100毫秒
     */
    inputTimer: function (onFocusCallback, onBlurCallback, time) {
        this.fn.inputTimer(
            this.filterArrFirst(this.result),
            onFocusCallback,
            onBlurCallback,
            time
        );
        return this;
    },

    /*
     * 使元素自由可拖拽
     * @param callback 回调
     * callback(left, top); //this为当前拖拽对象
     *【注】使用时请先将元素设置绝对定位！！！！
     */
    drag: function (callback) {
        this.fn.dragElement(
            this.filterArrFirst(this.result),
            callback
        );
        return this;
    },

    /**
     * 打开弹窗
     * @param config 弹窗配制
     */
    dialog: function (config) {
        return this.fn.dialog(config, this.filterArrFirst(this.result));
    },

    /*
     * 在指定区域添加loading效果
     */
    loading: function (config) {
        return this.fn.loading(this.filterArrFirst(this.result), config);
    },
    /**
     * 指定区域创建下拉框
     * @param config
     */
    select: function (config) {
        return this.fn.select(this.filterArrFirst(this.result), config);
    },

    /*
     * 动态创建选项卡
     */
    tabs: function (config) {
        return this.fn.tabs(this.filterArrFirst(this.result), config);
    },
    /*
     * 动态创建手风琴
     */
    accordion: function (config) {
        return this.fn.accordion(this.filterArrFirst(this.result), config);
    },

    /*
     * 渲染模板，并将值传入 【注】该方法依赖 art-template 组件库
     * @param tplString html模板字符串
     * @param data 模板数据json对象
     * @return 返回生成后的html字符串
     */
    renderTpl: function (tplString, data) {
        var result = null;
        try {
            var render = template.compile(tplString);
            result = render(data);
            if (this.result) {
                var dom = this.filterArrFirst(this.result);
                dom.innerHTML = result;
            }
        } catch (e) {
            throw new Error("add [ art-template ] lib please!!");
        }
        return result;
    },

    /*
     * 向指定容器中添加一个面板
     * @param config 配制对象
     */
    panel: function (config) {
        return this.fn.panel(this.filterArrFirst(this.result), config);
    },
    /*
     * 获取标签在文档中的位置
     * @return {left:xx,top:xx} 坐标
     */
    documentPosition: function () {
        var r = this.fn.documentPosition(this.filterArrFirst(this.result));
        return r;
    },
    /**
     * 自动提示层
     */
    suggest: function (config) {
        return this.fn.suggest(this.filterArrFirst(this.result), config);
    },
    /**
     * 校验结果
     * 当结果为数组时返回第一个元素
     * [注]在必要的方法里使用 比如：hasClass,多个结果，只取第一个
     */
    filterArrFirst: function (o) {
        if (o && o.length) {
            o = o[0];
        }
        return o;
    }
}