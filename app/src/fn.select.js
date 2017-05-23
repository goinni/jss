/*
 * 向指定元素添加下拉框
 */
_jss.fn.select = function (entity, opt) {
    var img = document.createElement('img'), select = {}, _this = this;
    var height = parseFloat(opt.height||32);

    var innerContent = "<div class='jss-select-panel'><div class='jss-select-tit-p'><div class='jss-select-tit'>" +
        "<span class='jss-select-text'></span>" +
        "<span class='jss-select-img'><img class='jss-se-icon' src=''></span>" +
        "</div ></div>" +
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
            'line-height': height+'px',
            'padding-right': '20px',
            'background-color': 'white'
        }
    });
    _this.addStyleSheet("jss-select-panel-4", {
        key: ".jss-select-panel .jss-select-tit .jss-select-text",
        value: {
            'padding': '0 10px',
            'display': 'inline-block'

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
            'top': (height+1)+'px',
            'overflow': 'hidden'

        }
    });

    _this.addStyleSheet("jss-select-panel-8", {
        key: ".jss-select-panel .jss-select-content li",
        value: {
            'padding': '0 10px',
            'margin-top': '1px',
            'position': 'relative',
            //'vertical-align': 'top',
            'width': '100%'

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
    _this.addStyleSheet("jss-select-panel-16", {
        key: ".jss-select-panel .jss-select-tit .js-mut-t",
        value: {
            'padding':'0px 5px',
            'line-height': (height-6)+'px',
            'display': 'inline-block',
            'border': '1px solid #e0e0e0',
            'margin-left': '5px'
        }
    });
    _this.addStyleSheet("jss-select-panel-17", {
        key: ".jss-select-panel .jss-select-tit .js-mut-t:hover",
        value: {
            'background':'#e0e0e0'
        }
    });
    _this.addStyleSheet("jss-select-panel-18", {
        key: ".jss-select-panel .jss-select-tit-p",
        value: {
            'border': '1px solid #d2d6de',
            'width': '100%'
        }
    });

    select.init = function (opt) {
        var _t = select;
        var data = opt.options;
        _t.current = data[0], _t.opt = opt, _t.objData = {},_t.currentArr=[];
        _this.html(entity, innerContent);
        var selDefault;
        if(_t.opt.isMult){
            jss(entity).find(".jss-select-text").css({"padding":"0 0 0 1px",'vertical-align':'middle','height':(height-1)+'px','display':'inline-block'});
            _t.needScroll = false;
            selDefault = opt.defaultValue||[]
        }else{
            _t.needScroll = true;
            selDefault = opt.defaultValue||data[0].value;
            selDefault = [selDefault]
        }
        //jss(entity).find(".jss-select-text").html(_t.current.text);
        if(opt.ZIndex){
            jss(entity).find(".jss-select-panel").css({'z-index':opt.ZIndex});
        }
        jss(entity).find("img").getDom().src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUBAMAAAB2TKBEAAAAHlBMVEUAAACIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIhgro/iAAAACXRSTlMA5sZlGps6mjl8aeBHAAAAVUlEQVQI12OInAkGUxmYIAwFBhZJED3RgYEhE8SYxsDAwAxiGDAAQSVIKQgwgZQCAVA5UCkYdAKVggGzATojcwYDXDGKdpD90xkQVsAthTsD7jC4UwFVBC5942sWpwAAAABJRU5ErkJggg==";
        if(data.length>7){
            jss(entity).find(".jss-select-content").css({height:"220px","overflow-y":"auto"});
        }


        var defauStr = "HM"+selDefault.join("HM")+"HM";
        var ul = jss(entity).find(".js-select-data-ul");
        var currentLi;
        for (var i = 0; i < data.length; i++) {
            var li = jss("<li>");
            if(defauStr.indexOf("HM"+data[i].value+"HM")!=-1){
                li.addClass("active");
                _t.current = data[i];
                if(_t.opt.isMult){
                    var spn = jss("<span>");
                    spn.getDom().id = "hm_mult_t_"+data[i].value;
                    spn.html(data[i].text+"<i></i>");
                    spn.attr({"pval":data[i].value});
                    spn.addClass("js-mut-t");
                    jss(entity).find(".jss-select-tit").append(spn);
                    _t.currentArr.push(data[i]);
                }else{
                    jss(entity).find(".jss-select-text").html(_t.current.text);
                }
                currentLi = li;
            }
            li.attr({sIndex: i, sval: data[i].value,stext:data[i].text});
            li.html(data[i].text);
            ul.append(li);
            _t.objData[data[i].value] = data[i];
        }

        var liList = jss(entity).find(".jss-select-content").find("li");
        liList.bind("onclick", function (e) {
            jss.stopPropagation(e);
            var item = this;
            if(_t.opt.isMult){
                if(jss(item).hasClass("active")){
                    jss(item).removeClass("active");
                    jss("#hm_mult_t_"+jss(item).attr("sval")).remove();
                }else{
                    jss(item).addClass("active");
                    var spn = jss("<span>");
                    spn.getDom().id = "hm_mult_t_"+jss(item).attr("sval");
                    spn.attr({"pval":jss(item).attr("sval")});
                    spn.html(jss(item).attr("stext")+"<i></i>");
                    spn.addClass("js-mut-t");
                    jss(entity).find(".jss-select-tit").append(spn);

                    spanTitAction();
                }
                var tit =  jss(entity).find(".jss-select-tit").getDom();
                jss(entity).find(".jss-select-content").css({top:((tit.clientHeight||tit.offsetHeight)+1)+"px"});
                setCurrArr();
            }else{
                liList.removeClass("active");
                jss(item).addClass("active");
                jss(entity).find(".jss-select-panel").removeClass("jss-cont-show");
                jss(entity).find(".jss-select-text").html(jss(item).attr("stext"));
            }

            _t.current = data[jss(item).attr("sIndex")];

            opt.calback && opt.calback.call(this, _t.current);

        });
        var tit = jss(entity).find(".jss-select-tit");
        tit.bind("onclick", function (e) {
            jss.stopPropagation(e);
            var thisTit = jss(entity).find(".jss-select-panel");
            if(thisTit.hasClass("jss-cont-show")){
                jss(".jss-select-panel").removeClass("jss-cont-show");
            }else{
                var tit =  jss(entity).find(".jss-select-tit").getDom();
                jss(entity).find(".jss-select-content").css({top:((tit.clientHeight||tit.offsetHeight) +1)+"px"});
                jss(".jss-select-panel").removeClass("jss-cont-show");
                jss(entity).find(".jss-select-panel").addClass("jss-cont-show");
                if(_t.needScroll){
                    setTimeout(function(){
                        scrollLi( _t.current.value);
                    } ,10)
                }
            }

        });
        spanTitAction();
        function spanTitAction(){
            var titSpan = jss(entity).find(".jss-select-tit").find(".js-mut-t");
            titSpan.unbind("onclick");
            titSpan.bind("onclick", function (e) {
                jss.stopPropagation(e);
                var pval = jss(this).attr("pval");
                jss(this).remove();
                var uli = jss(entity).findByAttr("li[sval=" + pval + "]");
                uli.removeClass("active");
                var tit =  jss(entity).find(".jss-select-tit").getDom();
                jss(entity).find(".jss-select-content").css({top:((tit.clientHeight||tit.offsetHeight)+1)+"px"});
                setCurrArr();
                opt.calback && opt.calback.call(this, _t.current);
            });
        }

        function setCurrArr(){
            var titSpans = jss(entity).find(".jss-select-tit").find(".js-mut-t").getDom();
            if(titSpans){
                _t.currentArr = [];
                for(var i=0;i<titSpans.length;i++){
                    var pVal = jss(titSpans[i]).attr("pval");
                    _t.currentArr.push(_t.objData[pVal]);
                }
            }
        }

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
        if(_t.opt.isMult){
            return;
        }
        var li = jss(entity).findByAttr("li[sval=" + value + "]");
        li.getDom().click();
        _t.current = _t.objData[value];
        _t.needScroll = true;
    };
    select.getValue = function () {
        var _t = select;
        if(_t.opt.isMult){
            return _t.currentArr;
        }else{
            return _t.current;
        }

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