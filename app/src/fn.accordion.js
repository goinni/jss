/*
 * 伸缩菜单
 */
_jss.fn.accordion = function (entity, config) {
    var _this = this;

    // 构造panel
    var group = document.createElement('div');
    _this.append(entity, group);
    var items = config.items || [];
    var hmm = new HmAccordionMethod(group,_this,config);
    hmm.initAccordCss();
    hmm.createAccordion(items);
    // 动态设置样式
    _this.css(group, {
        'width': config.width || 'auto',
        'height': config.height || 'auto'
    });
    // 将伸缩面板添加到指定窗口中

    return hmm;
};

function HmAccordionMethod(group,fn,config) {
 var _t = this;
 this.group = group;
    // 缓存panel数据
 this.itemlist = {};
 this.fn = fn;
 this.config = config;
 this.group.className = "jss-accordion-group";
}

HmAccordionMethod.prototype = {
    /*
     * 打开所有面板
     */
    openAll: function () {
        this.addActive(this.group);
    },
    /*
     * 关闭所有面板
     */
    closedAll: function () {
        this.distoryActive(this.group);
    },
    /*
     * 打开指定面板
     */
    open: function (id) {
        this.itemlist[id].click();
    },
    /*
     * 更新面板面容
     */
    updateData: function (items) {
        this.group.innerHTML = "";
        this.createAccordion(items);
    },
    // 添加所有子节点激活状态
    addActive: function (dom) {
        var chlids = this.fn.children(dom);
        for (var i = 0; i < chlids.length; i++) {
            var child = chlids[i];
            if (!this.fn.hasClass(child, 'jss-acc-p-active')) {
                this.fn.addClass(child, 'jss-acc-p-active');
            }

        }
    },
    // 销毁所有子节点激活状态
    distoryActive: function (dom) {
        var chlids = this.fn.children(dom);
        for (var i = 0; i < chlids.length; i++) {
            var child = chlids[i];
            if (this.fn.hasClass(child, 'jss-acc-p-active')) {
                this.fn.removeClass(child, 'jss-acc-p-active');
            }

        }
    },
    bulidAccordion2: function (item, i) {
        var _t = this;
        var pClasName = "";
        // 样式
        if ((!i && this.config.firstOpen) || (!i && typeof this.config.firstOpen == "undefined") || this.config.openAll) {
            pClasName = "jss-accordion-panel " + (item.stopClick ? '' : 'jss-acc-p-active');
        } else {
            // 如果设置加载打开
            pClasName = "jss-accordion-panel " + (item.active ? 'jss-acc-p-active' : '');
        }
        var str = '<div class="'+pClasName+'">' +
             '<div flag="'+(i)+'" class="jss-accordion-panel-header"><a class="jss-accordion-panel-header-h4-a">'+(item.title || '')+'</a></div>' +
             '<div class="jss-accordion-panel-collapse"><div class="jss-accordion-panel-collapse-body">'+(item.content || '')+'</div></div>' +
         '</div>';

        return str;
    },
    // 创建伸缩列表
    createAccordion: function (items) {
        var _t = this;
        _t.items = items;
        var panhtml ="";
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            panhtml = panhtml +this.bulidAccordion2(item, i);
        }
        _t.group.innerHTML = panhtml;
        var headers = _t.fn.getElementsByClass('jss-accordion-panel-header',_t.group);
        _t.fn.bind(headers,'onclick',function(event){
            var isForStopClick = _t.config.configStopClick && _t.config.configStopClick(event);
            _t.headerClick(this,isForStopClick);
        });
    },
    headerClick:function(obj,isForStopClick){
        var _t = this;
        var item =_t.items[obj.getAttribute('flag')];

        if(item.stopClick||isForStopClick){
            return;
        }else{
            if (_t.config.mutex) {
                _t.distoryActive(_t.group);
            }
            var heard = _t.fn.parent(obj);
            _t.fn.toggleClass(heard, 'jss-acc-p-active');
            var body = _t.fn.getElementsByClass('jss-accordion-panel-collapse-body',heard);
            // 回调
            item.callback && item.callback.call(obj, body, _t.fn.hasClass(heard, 'jss-acc-p-active'));
        }
    },
    //初始化伸缩列表样式
    initAccordCss:function(){
        if(window['_style_sheet_stores'] && window['_style_sheet_stores']['accordion-group'] && window['_style_sheet_stores']['accordion-panel']){
            return;
        }
        // 存放面板盒子
        var groupcss = {
            width: "auto",
            height: "auto"
        };
        this.fn.addStyleSheet("accordion-group", {
            key: ".jss-accordion-group",
            value: groupcss
        });


        // 面板
        var panelcss = {
            'padding-bottom': '5px',
            'position': 'relative',
            'border-radius': '5px',
            'background': '#ffffff',
            'display': 'block'
        };
        this.fn.addStyleSheet("accordion-panel", {
            key: ".jss-accordion-panel",
            value: panelcss
        });

        // 激活面板
        var panelactivecss = {
            display: 'block'
        };
        this.fn.addStyleSheet("accordion-panel-active", {
            key: ".jss-acc-p-active .jss-accordion-panel-collapse",
            value: panelactivecss
        });

        // 头部
        var headercss = {
            'color': '#444',
            'display': 'block',
            'background': '#eff3f4',
            'line-height': '25px',
            'padding': '8px 0',
            'border-radius': '5px',
            'position': 'relative',
            'width': '100%',
            'zoom': 1

        };
        this.fn.addStyleSheet("accordion-panel-header", {
            key: ".jss-accordion-panel-header",
            value: headercss
        });

        var acss = {
            'font-size': '16px',
            'display': 'block',
            'margin': 0,
            'color': '#666666',
            'text-decoration': 'none',
            'display': 'block',
            'padding-left': '15px',
            'cursor': 'pointer',
            'background-color': 'transparent'
        };
        var ahovercss = {
            'color': '#666666'
        };
        this.fn.addStyleSheet("accordion-panel-header-h4-a", {
            key: ".jss-accordion-panel-header-h4-a",
            value: acss
        });
        this.fn.addStyleSheet("accordion-panel-header-h4-ahover", {
            key: ".jss-accordion-panel-header-h4-a:hover",
            value: ahovercss
        });

        // 内容
        var collapsecss = {
            'display': 'none',
            'border-top': '1px solid #dde6e6',
            'zoom': 1,
            'width': '100%'
        };
        this.fn.addStyleSheet("accordion-panel-collapse", {
            key: ".jss-accordion-panel-collapse",
            value: collapsecss
        });

        var bodycss = {
            'border-top-left-radius': '0',
            'border-top-right-radius': '0',
            'border-bottom-right-radius': '3px',
            'border-bottom-left-radius': '3px'
        };
        this.fn.addStyleSheet("accordion-panel-collapse-body", {
            key: ".jss-accordion-panel-collapse-body",
            value: bodycss
        });
    }

};