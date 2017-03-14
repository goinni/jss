/*
 * 任意版块可拖拽
 * @param entity 被拖拽的对象
 * @param callback 拖拽时时回调
 * callback(left, top); //this为当前拖拽对象
 * 【注】使用时请先将元素设置绝对定位！！！！
 */
_jss.fn.dragElement = function(entity, callback){
    var _drag = {},_this = this;
    //初始化
    _drag.init = function (o, callback){
        o.onmousedown = this.start;
        o.dragEnd = this.end;
        callback&&(o.___cback = callback);
    }
    //开始
    _drag.start = function (e){

        var o,e = _this.fixEvent(e);
        e.preventDefault && e.preventDefault();
        _drag.o = o = this;
        //this.style.position="absolute";
        o.x = e.clientX - _drag.o.offsetLeft;
        o.y = e.clientY - _drag.o.offsetTop;
        document.onmousemove = _drag.move;
        document.onmouseup = _drag.end;
    }
    //移动
    _drag.move = function (e){
        var oLeft,oTop,e = _this.fixEvent(e);
        oLeft = e.clientX - _drag.o.x;
        oTop = e.clientY - _drag.o.y;
        _drag.o.style.left = oLeft + 'px';
        _drag.o.style.top = oTop + 'px';
        _drag.o.___cback&&_drag.o.___cback.call(_drag.o,oLeft,oTop);
    }
    //结束
    _drag.end = function (){
      _drag.o = document.onmousemove = document.onmouseup = null;
    }

    //初始化入口
    _drag.init(entity, callback);

    return _drag;
}
