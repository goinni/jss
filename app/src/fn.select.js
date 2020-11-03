/*
 * 向指定元素添加下拉框
 */
_jss.fn.select = function (entity, opt) {
    var select = {}, _this = this;
    var height = parseFloat(opt.height||32);


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
    _this.addStyleSheet("jss-select-panel-19", {
        key: ".jss-select-panel .jss-select-tit .jss-select-text-mut",
        value: {"padding":"0 0 0 1px",
                'vertical-align':'middle',
                'height':(height-1)+'px',
                'display':'inline-block'
        }
    });

    select.init = function (opt) {
        var _t = select;

        var selectPanel = document.createElement('div'),
            selectTitP = document.createElement('div'),
            selectTit = document.createElement('div'),
            textSpan = document.createElement('span'),
            imgSpan = document.createElement('span'),
            img = document.createElement('img'),
            contentDiv = document.createElement('div'),
            dataUl = document.createElement('ul');
        selectPanel.className='jss-select-panel';
        selectTitP.className='jss-select-tit-p';
        selectTit.className='jss-select-tit';
        textSpan.className = 'jss-select-text';
        imgSpan.className='jss-select-img';
        img.className='jss-se-icon';
        contentDiv.className='jss-select-content';
        dataUl.className='js-select-data-ul';

        _t.selectTitle = selectTit;
        _t.contentPanel = contentDiv;

        selectPanel.appendChild(selectTitP);
        selectTitP.appendChild(selectTit);
        selectTit.appendChild(textSpan);
        selectTit.appendChild(imgSpan);
        imgSpan.appendChild(img);
        selectPanel.appendChild(contentDiv);
        contentDiv.appendChild(dataUl);
        entity.innerHTML="";
        entity.appendChild(selectPanel);

        var data = opt.options;
        _t.current = data[0], _t.opt = opt, _t.objData = {},_t.currentArr=[];
        var selDefault;
        if(_t.opt.isMult){
            textSpan.className +=" jss-select-text-mut";
            _t.needScroll = false;
            selDefault = opt.defaultValue||[]
        }else{
            _t.needScroll = true;
            selDefault = opt.defaultValue||data[0].value;
            selDefault = [selDefault]
        }
        opt.ZIndex &&  _this.css(selectPanel,{'z-index':opt.ZIndex});
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUBAMAAAB2TKBEAAAAHlBMVEUAAACIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIhgro/iAAAACXRSTlMA5sZlGps6mjl8aeBHAAAAVUlEQVQI12OInAkGUxmYIAwFBhZJED3RgYEhE8SYxsDAwAxiGDAAQSVIKQgwgZQCAVA5UCkYdAKVggGzATojcwYDXDGKdpD90xkQVsAthTsD7jC4UwFVBC5942sWpwAAAABJRU5ErkJggg==";
        if(data.length>7){
            _this.css(contentDiv,{'height':'220px','overflowY':'auto'});
        }
        var defauStr = "HM"+selDefault.join("HM")+"HM";
        var ul = dataUl;
        var currentLi;
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            if(defauStr.indexOf("HM"+data[i].value+"HM")!=-1){
                li.className='active';
                _t.current = data[i];
                if(_t.opt.isMult){
                    var spn = document.createElement('span');
                    _this.addClass(spn,"hm_mult_t_"+data[i].value);
                    spn.innerHTML = data[i].text+"<i></i>";
                    spn.setAttribute('pval',data[i].value);
                    _this.addClass(spn,"js-mut-t");
                    spn.onclick = onSpanTitAction;
                    selectTit.appendChild(spn);
                    _t.currentArr.push(data[i]);
                }else{
                    textSpan.innerHTML = _t.current.text;
                }
                currentLi = li;
            }
            li.setAttribute('sIndex',i);
            li.setAttribute('sval',data[i].value);
            li.setAttribute('stext',data[i].text);
            li.innerHTML = data[i].text;
            ul.appendChild(li);
            _t.objData[data[i].value] = data[i];
            li.onclick = function (e) {
                _this.stopPropagation(e);
                var item = this;
                if(_t.opt.isMult){
                    if(_this.hasClass(item,'active')){
                        _this.removeClass(item,'active');
                        var bar = _this.getElementsByClass("hm_mult_t_"+item.getAttribute('sval'),selectTit);
                        _this.remove(bar);
                    }else{
                        _this.addClass(item,"active");

                        var spn = document.createElement('span');
                        _this.addClass(spn,"hm_mult_t_"+item.getAttribute('sval'));
                        spn.innerHTML = item.getAttribute('stext')+"<i></i>";
                        spn.setAttribute('pval',item.getAttribute('sval'));
                        _this.addClass(spn,"js-mut-t");
                        selectTit.appendChild(spn);
                        spn.onclick = onSpanTitAction;
                    }
                    _this.css(contentDiv,{top:((selectTit.clientHeight||selectTit.offsetHeight)+1)+"px"});
                    setCurrArr();
                }else{
                    var liList = _this.getElementsByTagName('li',dataUl);
                    _this.removeClass(liList,'active');
                    _this.addClass(item,'active');
                    _this.removeClass(selectPanel,'jss-cont-show');
                    textSpan.innerHTML = item.getAttribute('stext');
                }
                _t.current = data[item.getAttribute('sIndex')];
                opt.calback && opt.calback.call(this, _t.current);
            }
        }
        selectTit.onclick = function(e){
            jss.stopPropagation(e);
            if(_this.hasClass(selectPanel,'jss-cont-show')){
                _this.removeClass(selectPanel,'jss-cont-show');
            }else{
                var pan=_this.getElementsByClass('jss-select-panel');
                _this.removeClass(pan,'jss-cont-show');
                var tit =  selectTit;
                _this.css(contentDiv,{top:((tit.clientHeight||tit.offsetHeight) +1)+"px"});
                _this.addClass(selectPanel,'jss-cont-show');
                if(_t.needScroll){
                    setTimeout(function(){
                        scrollLi(_t.current.value,contentDiv);
                    } ,10)
                }
            }
        };
        function onSpanTitAction (e){
            var item = this;
            _this.stopPropagation(e);
            var pval = item.getAttribute('pval');
            _this.remove(item);
            var uli = _this.getElementsByAttr("li[sval=" + pval + "]",contentDiv);
            _this.removeClass(uli,'active');
            _this.css(contentDiv,{top:((selectTit.clientHeight||selectTit.offsetHeight)+1)+"px"});
            setCurrArr();
            opt.calback && opt.calback.call(this, _t.current);
        }

        function setCurrArr(){
            var titSpans = _this.getElementsByClass('js-mut-t',selectTit);
            if(titSpans){
                _t.currentArr = [];
                if (_this.isArray(titSpans) || _this.isHTMLCollection(titSpans)) {
                    titSpans = titSpans;
                } else {
                    titSpans = [titSpans]
                }
                for(var i=0;i<titSpans.length;i++){
                    var pVal = titSpans[i].getAttribute('pval');
                    _t.currentArr.push(_t.objData[pVal]);
                }
            }
        }
    //    _this.bind(document,'onclick',function(){
    //        _this.removeClass(selectPanel,'jss-cont-show');
    //    });
    };
    select.init(opt);
    select.setDisabled = function (flag) {
        var _t = select;
        if (flag) {
            _this.addClass(_t.selectTitle,'disabled');
            _t.cachTclick = _t.selectTitle.onclick;
            _t.selectTitle.onclick = null;
        } else {
            _t.opt.defaultValue = _t.current.value;
            _t.selectTitle.onclick = _t.cachTclick;
            _this.removeClass(_t.selectTitle,'disabled');
        }
    };
    select.setValue = function (value) {
        var _t = select;
        if(_t.opt.isMult){
            return;
        }
        var li = _this.getElementsByAttr("li[sval=" + value + "]",_t.contentPanel);
        li[0] && li[0].click();
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

    function scrollLi(val,contentDiv){
        var li = _this.getElementsByAttr("li[sval=" + val + "]",contentDiv);
        var offsTop = li[0].offsetTop;
        var scrollPanel = contentDiv;
        scrollPanel.scrollTop = offsTop-2;
        select.needScroll = false;
    }
	if(opt.disabled){
		select.setDisabled(true);
	}
    return select;
}