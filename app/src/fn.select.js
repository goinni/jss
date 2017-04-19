/*
 * 向指定元素添加下拉框
 */
_jss.fn.select = function (entity, opt) {
    var img = document.createElement('img'), select = {}, _this = this;
    var height = parseFloat(opt.height||32);

    var innerContent = "<div class='jss-select-panel'><div class='jss-select-tit'>" +
        "<span class='jss-select-text'></span>" +
        "<span class='jss-select-img'><img class='jss-se-icon' src=''></span>" +
        "</div >" +
        "<div class='jss-select-content'>" +
        "<ul class='js-select-data-ul'></ul>" +
        "</div></div>";
    _this.addStyleSheet("jss-select-panel-1", {
        key: ".jss-select-panel",
        value: {
            position: 'relative',
            'color': '#333',
            'font-size': '14px',
            'cursor': 'pointer',
            'z-index':'9999999'
        }
    });
    _this.addStyleSheet("jss-select-panel-2", {
        key: ".jss-select-panel ul",
        value: {
            'margin': '0',
            'padding': '0',
            'list-style': 'none'
        }
    });
    _this.addStyleSheet("jss-select-panel-3", {
        key: ".jss-select-panel .jss-select-tit",
        value: {
            'height':height+'px',
            'line-height': height+'px',
            'border': '1px solid #d2d6de',
            'width': '100%'
        }
    });
    _this.addStyleSheet("jss-select-panel-4", {
        key: ".jss-select-panel .jss-select-tit .jss-select-text",
        value: {
            'padding': '0 10px'
        }
    });
    _this.addStyleSheet("jss-select-panel-5", {
        key: ".jss-select-panel .jss-select-tit .jss-se-icon",
        value: {
            'border': 'none',
            'display': 'block',
            'width': '100%'
        }
    });
    _this.addStyleSheet("jss-select-panel-6", {
        key: ".jss-select-panel .jss-select-tit.disabled",
        value: {
            'background-color': '#eee',
            'color': '#333'
        }
    });
    _this.addStyleSheet("jss-select-panel-7", {
        key: ".jss-select-panel .jss-select-content",
        value: {
            'border': '1px solid #dfdfdf',
            'position': 'absolute',
            'z-index': '1000000',
            'line-height':height+'px',
            'font-size': '14px',
            'width': '100%',
            'display': 'none',
            'background-color': 'white',
            'left': '0',
            'top': (height+1)+'px'

        }
    });

    _this.addStyleSheet("jss-select-panel-8", {
        key: ".jss-select-panel .jss-select-content li",
        value: {
            'padding': '0 10px',
            'margin-top': '1px',
            'position': 'relative'
        }
    });
    _this.addStyleSheet("jss-select-panel-9", {
        key: ".jss-select-panel .jss-select-content li:hover",
        value: {
            'background-color': '#3c8dbc',
            'color': 'white'
        }
    });
    _this.addStyleSheet("jss-select-panel-10", {
        key: ".jss-select-panel .jss-select-content li.active",
        value: {
            'background-color': '#ddd',
            'color': '#333'
        }
    });

    //_this.addStyleSheet("jss-select-panel-11", {
    //    key: ".jss-select-panel .jss-cont-show",
    //    value: {
    //        'display': 'block'
    //    }
    //});
    _this.addStyleSheet("jss-select-panel-12", {
        key: ".jss-select-panel .jss-select-img",
        value: {
            'width': '8px',
            'height': '5px',
            'position': 'absolute',
            'right': '7px',
            'top': '46%',
            'overflow': 'hidden'

        }
    });
    //_this.addStyleSheet("jss-select-panel-13", {
    //    key: ".jss-select-panel .jss-select-tit .jss-se-icon.jss-tab-show",
    //    value: {
    //        'margin-top': '-5px'
    //    }
    //});
    _this.addStyleSheet("jss-select-panel-14", {
        key: ".jss-select-panel.jss-cont-show .jss-select-content",
        value: {
            'display': 'block'
        }
    });
    _this.addStyleSheet("jss-select-panel-15", {
        key: ".jss-select-panel.jss-cont-show .jss-select-tit .jss-se-icon",
        value: {
            'margin-top': '-5px'
        }
    });

    select.init = function (opt) {
        var _t = select;
        var data = opt.options;
        _t.current = data[0], _t.opt = opt, _t.objData = {};
        _this.html(entity, innerContent);
        //jss(entity).find(".jss-select-text").html(_t.current.text);
        jss(entity).find("img").getDom().src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUBAMAAAB2TKBEAAAAHlBMVEUAAACIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIhgro/iAAAACXRSTlMA5sZlGps6mjl8aeBHAAAAVUlEQVQI12OInAkGUxmYIAwFBhZJED3RgYEhE8SYxsDAwAxiGDAAQSVIKQgwgZQCAVA5UCkYdAKVggGzATojcwYDXDGKdpD90xkQVsAthTsD7jC4UwFVBC5942sWpwAAAABJRU5ErkJggg==";
        if(data.length>7){
            jss(entity).find(".jss-select-content").css({height:"220px",overflow:"auto"});
        }
        var selDefault = opt.defaultValue||data[0].value;
        var ul = jss(entity).find(".js-select-data-ul");
        var currentLi;
        for (var i = 0; i < data.length; i++) {
            var li = jss("<li>");
            if(selDefault==data[i].value){
                li.addClass("active");
                _t.current = data[i];
                jss(entity).find(".jss-select-text").html(_t.current.text);
                currentLi = li;
            }
            li.attr({sIndex: i, sval: data[i].value});
            li.html(data[i].text);
            ul.append(li);
            _t.objData[data[i].value] = data[i];
        }
        _t.needScroll = true;
        var liList = jss(entity).find(".jss-select-content").find("li");
        liList.bind("onclick", function (e) {
            jss.stopPropagation(e);
            var item = this;
            liList.removeClass("active");
            jss(item).addClass("active");
            jss(entity).find(".jss-select-panel").removeClass("jss-cont-show");
            //jss(entity).find("img").removeClass("jss-tab-show");
            _t.current = data[jss(item).attr("sIndex")];
            jss(entity).find(".jss-select-text").html(_t.current.text);
            opt.calback && opt.calback.call(this, _t.current);

        });
        var tit = jss(entity).find(".jss-select-tit");
        tit.bind("onclick", function (e) {
            jss.stopPropagation(e);
            //jss(entity).find(".jss-select-panel").toggleClass("jss-cont-show");
            //jss(entity).find("img").toggleClass("jss-tab-show");
            var thisTit = jss(entity).find(".jss-select-panel");
            if(thisTit.hasClass("jss-cont-show")){
                jss(".jss-select-panel").removeClass("jss-cont-show");
            }else{
                jss(".jss-select-panel").removeClass("jss-cont-show");
                jss(entity).find(".jss-select-panel").addClass("jss-cont-show");
                if(_t.needScroll){
                    setTimeout(function(){
                        scrollLi( _t.current.value);
                    } ,10)
                }
            }

        });
        jss(document).bind("onclick", function () {
            jss(entity).find(".jss-select-panel").removeClass("jss-cont-show");
            //jss(entity).find("img").removeClass("jss-tab-show");
        });
    };
    select.init(opt);
    select.setDisabled = function (flag) {
        var _t = select;
        if (flag) {
            var tit = jss(entity).find(".jss-select-tit");
            tit.addClass("disabled");
            tit.unbind("onclick");
        } else {
           // var last = _t.current.value;
            _t.opt.defaultValue = _t.current.value;
            _t.init(_t.opt);
          //  select.setValue(last);
        }
    };
    select.setValue = function (value) {
        var _t = select;
        var li = jss(entity).findByAttr("li[sval=" + value + "]");
        li.getDom().click();
        _t.current = _t.objData[value];
        _t.needScroll = true;
    };
    select.getValue = function () {
        var _t = select;
        return _t.current;
    };

    function scrollLi(val){
        var li = jss(entity).findByAttr("li[sval=" + val + "]");
        var offsTop = li.getDom().offsetTop;
        var scrollPanel = jss(entity).find(".jss-select-content").getDom();
        scrollPanel.scrollTop = offsTop-2;
        select.needScroll = false;
    }

    return select;
}