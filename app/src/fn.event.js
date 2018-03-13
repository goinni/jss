/**
 * 停止事件的传播，阻止它被分派到其他 Document 节点
 */
_jss.fn.stopPropagation = function(ev){
	var e=window.event || ev;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}
/*
 * 安装事件
 */
_jss.fn.fixEvent = function(e){
    if(!window.event&&!e){
        var r,eventExec = "arguments.callee.caller";
        while(!r){
            eventExec += ".caller";
            r = eval(eventExec+".arguments[0]");
            r && (r.toString() != '[object MouseEvent]') && (r = null);
        }
        return r;
    }
    return (window.event || e);
}
/*
 * 事件绑定
 * @param arr 可以绑定一个dom 对象数组
 * @param type 事件类型如：onclick,onchange,onkeydown等
 * @param callback 回调方法
 */
_jss.fn.bind = function(arr, type, callback) {
    var _this = this;
    if(!arr)return ;
    if(!this.isCollection(arr)){
        arr = [arr];
    }
    for(var i = 0; i<arr.length; i++){
        var o = arr[i];
        if(typeof o != "object")continue;
        // o['_'+type] = callback;//缓存绑定的事件，方便日后解绑,因为解绑的事件必须与绑定的事件一至
        function fn(o){
            return function(e){
                callback && callback.call(o, e);
            }
        }
        o['_'+type] = fn(o);
        addEv(o);
    }
    function addEv(o){
        var fn = o['_'+type];
        if (o.attachEvent) {
            // IE6+
            o.attachEvent(type, fn, false);
        } else if (o.addEventListener) {
            // chrome,firefox
            o.addEventListener(type.substring(2), fn, false);
        } else {
            o[type] = fn;
        }
    }
}

/*
 * 事件解绑
 * @param arr
 * @param type 事件类型如：onclick,onchange,onkeydown等
 * [注]解绑时，o和callback函数必须与绑定时的相同
 */
_jss.fn.unbind = function(arr, type) {
    if(!arr)return ;
    if(!this.isCollection(arr)){
        arr = [arr];
    }
    for(var i = 0; i<arr.length; i++){
        var o = arr[i];
        if(typeof o != "object")continue;
        removeEv(o, o['_'+type]);
    }
    function removeEv(o, callback){
        if (o.detachEvent) {
            o.detachEvent(type, callback||function(){});
        } else if (o.removeEventListener) {
            o.removeEventListener(type.substring(2), callback||function(){}, false);
        } else {
            o[type] = null;
        }
    }
}



