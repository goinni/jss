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
};
/**
 * 获取唯一编号
 */
jss.uuid = function() {
    return jss.prototype.uuid();
};
/*
 * 停止事件的传播，阻止它被分派到其他 Document 节点
 * @param e 事件源
 */
jss.stopPropagation = function(e) {
    jss.prototype.stopPropagation(e);
};
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
};

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
};

/*
 * ie8跨域请求
 * @param opt.url   请求地址
 * @param opt.type  请求方法  POST 或 GET
 * @param opt.time  请求超时
 * @param opt.data  请求参数  json对象字符串
 */
jss.xdr = function(opt) {
    jss.prototype.xdr(opt);
};
/**
 * 获取浏览器参数名称
 * @param name 浏览器地址参数名
 */
jss.queryUrlParam = function(name) {
    return jss.prototype.queryUrlParam(name);
};
/**
 * 克隆json对象
 * @param jsonobject json对象
 * @return 新的json对象
 */
jss.clone = function(jsonobject) {
    return jss.prototype.clone(jsonobject);
};

/*
 * 判断对象是否为集合(包含html集合和普通数组对象)
 * @param entity     指定的对象
 */
jss.isCollection = function(entity) {
    return jss.prototype.isCollection(entity);
};
/*
 * 判断是否为数组
 */
jss.isArray = function(entity) {
    return jss.prototype.isArray(entity);
};
/*
 * 判断是否为数组
 */
jss.isHTMLCollection = function(entity) {
    return jss.prototype.isHTMLCollection(entity);
};
/*
 * 埋点
 */
jss.addBuried = function(entity,flag) {
    return jss.prototype.addBuried(entity,flag);
};
/**
 * 获取区间随机数据（ 最小数 ~ 最大数之间的一个随机数 ）
 * @param startNum 最小数
 * @param endNum   最大数
 */
jss.randomNum = function (startNum, endNum){

  return (Math.random() * ( endNum - startNum ) + startNum);
}
/**
 *<h1>解决IE6里的PNG图片不透明BUG</h1>
 *<p>
 *  使用方法：
    GtPNG.fix('div,img');
 *</p>
 */
(function(){
    //[注]以下代码只对IE6有效
    var browser=navigator.appName;
    var b_version=navigator.appVersion; 
    var version=b_version.split(";"); 
    var trim_Version=version[1].replace(/[ ]/g,""); 
    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") 
    { //判断当前浏览器是否为IE6
     try{
    eval(function(p, a, c, k, e, r) {
        e = function(c) {
            return (c < a ? '' : e(parseInt(c / a)))
                    + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c
                            .toString(36))
        };
        if (!''.replace(/^/, String)) {
            while (c--)
                r[e(c)] = k[c] || e(c);
            k = [ function(e) {
                return r[e]
            } ];
            e = function() {
                return '\\w+'
            };
            c = 1
        }
        ;
        while (c--)
            if (k[c])
                p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
        return p
    }
    (
    '2 E={J:\'E\',Z:{},1E:7(){4(x.1l&&!x.1l[6.J]){x.1l.23(6.J,\'24:25-26-27:3\')}4(1F.11){1F.11(\'28\',7(){E=29})}},1G:7(){2 a=x.1m(\'8\');x.1H.1b.1n(a,x.1H.1b.1b);2 b=a.1o;b.1c(6.J+\'\\\\:*\',\'{12:2a(#1I#2b)}\');b.1c(6.J+\'\\\\:9\',\'Q:1p;\');b.1c(\'1J.\'+6.J+\'1K\',\'12:y; 1q:y; Q:1p; z-2c:-1; 1d:-1r; 1L:1M;\');6.1o=b},1N:7(){2 a=13.2d;4(13.1e.K(\'2e\')!=-1||13.1e.K(\'1q\')!=-1){E.1f(a)}4(13.1e==\'8.1s\'){2 b=(a.F.1s==\'y\')?\'y\':\'2f\';G(2 v M a.3){a.3[v].9.8.1s=b}}4(13.1e.K(\'14\')!=-1){E.1t(a)}},1t:7(a){4(a.F.14.K(\'2g\')!=-1){2 b=a.F.14;b=1u(b.2h(b.1v(\'=\')+1,b.1v(\')\')),10)/2i;a.3.N.9.8.14=a.F.14;a.3.C.I.2j=b}},15:7(a){2k(7(){E.1f(a)},1)},2l:7(a){2 b=a.1O(\',\');G(2 i=0;i<b.2m;i++){6.1o.1c(b[i],\'12:2n(E.1P(6))\')}},1f:7(a){a.S.1Q=\'\';6.1R(a);6.16(a);6.1t(a);4(a.O){6.1S(a)}},1T:7(b){2 c=6;2 d={2o:\'16\',2p:\'16\'};4(b.17==\'A\'){2 e={2q:\'15\',2r:\'15\',2s:\'15\',2t:\'15\'};G(2 a M e){d[a]=e[a]}}G(2 h M d){b.11(\'1w\'+h,7(){c[d[h]](b)})}b.11(\'2u\',6.1N)},1x:7(a){a.8.2v=1;4(a.F.Q==\'2w\'){a.8.Q=\'2x\'}},1S:7(a){2 b={\'2y\':P,\'2z\':P,\'2A\':P};G(2 s M b){a.3.N.9.8[s]=a.F[s]}},1R:7(a){4(!a.F){1g}U{2 b=a.F}G(2 v M a.3){a.3[v].9.8.1U=b.1U}a.S.18=\'\';a.S.19=\'\';2 c=(b.18==\'1V\');2 d=P;4(b.19!=\'y\'||a.O){4(!a.O){a.D=b.19;a.D=a.D.2B(5,a.D.1v(\'")\')-5)}U{a.D=a.1h}2 e=6;4(!e.Z[a.D]){2 f=x.1m(\'1J\');e.Z[a.D]=f;f.2C=e.J+\'1K\';f.S.1Q=\'12:y; Q:1p; 1y:-1r; 1d:-1r; 1q:y;\';f.11(\'2D\',7(){6.1i=6.2E;6.1j=6.2F;e.16(a)});f.1h=a.D;f.1W(\'1i\');f.1W(\'1j\');x.1X.1n(f,x.1X.1b)}a.3.C.I.1h=a.D;d=V}a.3.C.I.1w=!d;a.3.C.I.N=\'y\';a.3.N.9.8.18=b.18;a.S.19=\'y\';a.S.18=\'1V\'},16:7(e){2 f=e.F;2 g={\'W\':e.2G+1,\'H\':e.2H+1,\'w\':6.Z[e.D].1i,\'h\':6.Z[e.D].1j,\'L\':e.2I,\'T\':e.2J,\'1k\':e.2K,\'1z\':e.2L};2 i=(g.L+g.1k==1)?1:0;2 j=7(a,l,t,w,h,o){a.2M=w+\',\'+h;a.2N=o+\',\'+o;a.2O=\'2P,1Y\'+w+\',1Y\'+w+\',\'+h+\'2Q,\'+h+\' 2R\';a.8.1i=w+\'u\';a.8.1j=h+\'u\';a.8.1y=l+\'u\';a.8.1d=t+\'u\'};j(e.3.N.9,(g.L+(e.O?0:g.1k)),(g.T+(e.O?0:g.1z)),(g.W-1),(g.H-1),0);j(e.3.C.9,(g.L+g.1k),(g.T+g.1z),(g.W),(g.H),1);2 k={\'X\':0,\'Y\':0};2 m=7(a,b){2 c=P;2S(b){1a\'1y\':1a\'1d\':k[a]=0;1A;1a\'2T\':k[a]=.5;1A;1a\'2U\':1a\'2V\':k[a]=1;1A;1I:4(b.K(\'%\')!=-1){k[a]=1u(b)*.2W}U{c=V}}2 d=(a==\'X\');k[a]=2X.2Y(c?((g[d?\'W\':\'H\']*k[a])-(g[d?\'w\':\'h\']*k[a])):1u(b));4(k[a]==0){k[a]++}};G(2 b M k){m(b,f[\'2Z\'+b])}e.3.C.I.Q=(k.X/g.W)+\',\'+(k.Y/g.H);2 n=f.30;2 p={\'T\':1,\'R\':g.W+i,\'B\':g.H,\'L\':1+i};2 q={\'X\':{\'1B\':\'L\',\'1C\':\'R\',\'d\':\'W\'},\'Y\':{\'1B\':\'T\',\'1C\':\'B\',\'d\':\'H\'}};4(n!=\'1D\'){2 c={\'T\':(k.Y),\'R\':(k.X+g.w),\'B\':(k.Y+g.h),\'L\':(k.X)};4(n.K(\'1D-\')!=-1){2 v=n.1O(\'1D-\')[1].31();c[q[v].1B]=1;c[q[v].1C]=g[q[v].d]}4(c.B>g.H){c.B=g.H}e.3.C.9.8.1Z=\'20(\'+c.T+\'u \'+(c.R+i)+\'u \'+c.B+\'u \'+(c.L+i)+\'u)\'}U{e.3.C.9.8.1Z=\'20(\'+p.T+\'u \'+p.R+\'u \'+p.B+\'u \'+p.L+\'u)\'}},1P:7(a){a.8.12=\'y\';4(a.17==\'32\'||a.17==\'33\'||a.17==\'34\'){1g}a.O=V;4(a.17==\'35\'){4(a.1h.21().K(/\\.22$/)!=-1){a.O=P;a.8.1L=\'1M\'}U{1g}}U 4(a.F.19.21().K(\'.22\')==-1){1g}2 b=E;a.3={N:{},C:{}};2 c={9:{},I:{}};G(2 r M a.3){G(2 e M c){2 d=b.J+\':\'+e;a.3[r][e]=x.1m(d)}a.3[r].9.36=V;a.3[r].9.37(a.3[r].I);a.38.1n(a.3[r].9,a)}a.3.C.9.39=\'y\';a.3.C.I.3a=\'3b\';a.3.N.I.1w=V;b.1T(a);b.1x(a);b.1x(a.3c);b.1f(a)}};3d{x.3e("3f",V,P)}3g(r){}E.1E();E.1G();',
    62,
    203,
    '||var|vml|if||this|function|style|shape|||||||||||||||||||||px|||document|none||||image|vmlBg|GtPNG|currentStyle|for||fill|ns|search||in|color|isImg|true|position||runtimeStyle||else|false||||imgSize||attachEvent|behavior|event|filter|handlePseudoHover|vmlOffsets|nodeName|backgroundColor|backgroundImage|case|firstChild|addRule|top|propertyName|applyVML|return|src|width|height|bLW|namespaces|createElement|insertBefore|styleSheet|absolute|border|10000px|display|vmlOpacity|parseInt|lastIndexOf|on|giveLayout|left|bTW|break|b1|b2|repeat|createVmlNameSpace|window|createVmlStyleSheet|documentElement|default|img|_sizeFinder|visibility|hidden|readPropertyChange|split|fixPng|cssText|vmlFill|copyImageBorders|attachHandlers|zIndex|transparent|removeAttribute|body|0l|clip|rect|toLowerCase|png|add|urn|schemas|microsoft|com|onbeforeunload|null|url|VML|index|srcElement|background|block|lpha|substring|100|opacity|setTimeout|fix|length|expression|resize|move|mouseleave|mouseenter|focus|blur|onpropertychange|zoom|static|relative|borderStyle|borderWidth|borderColor|substr|className|onload|offsetWidth|offsetHeight|clientWidth|clientHeight|offsetLeft|offsetTop|clientLeft|clientTop|coordsize|coordorigin|path|m0|l0|xe|switch|center|right|bottom|01|Math|ceil|backgroundPosition|backgroundRepeat|toUpperCase|BODY|TD|TR|IMG|stroked|appendChild|parentNode|fillcolor|type|tile|offsetParent|try|execCommand|BackgroundImageCache|catch'
            .split('|'), 0, {}))
    }catch(e){}
    //将存放PNG的元素放入fix(..)中,多个用','号隔开
        // GtPNG.fix('div,img');
        jss.iePNG = GtPNG;
    }
})();
