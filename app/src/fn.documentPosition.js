/*
 * 获取标签在文档中的位置
 * @return {left:xx,top:xx} 坐标
 */
_jss.fn.documentPosition = function (entity) {
    var top = entity.offsetTop;
    var left = entity.offsetLeft;
    var parent = entity.offsetParent;
    while (parent) {
        top += parent.offsetTop;
        left += parent.offsetLeft;
        parent = parent.offsetParent;
    }
    return {left: left, top: top};

}