/**
*|cookie设置
*+----------------------------------------------------
*| @param name cookie名
*| @param value cookie 值
*| @param expiredays cookie 过期时间 [单位]毫秒 ; 1天 =1*24*60*60*1000
*+--------------------------------------------------------------------
*/
_jss.fn.setCookie = function (name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setTime(todayDate.getTime() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
/**
*+----------------------------------------------------
*|cookie获取
*+----------------------------------------------------
*| @param name cookie名
*+----------------------------------------------------
*/
_jss.fn.getCookie = function (name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}