/**
 * 监听输入框输入的值
 * @param input 输入框dom对象
 * @param onFocusCallback 获得焦点时回调
 * @param onBlurCallback  失去焦点时回调
 * @param time 监听频率 缺省值100毫秒
 */
_jss.fn.inputTimer = function (input, onFocusCallback, onBlurCallback, time){
    //var input = document.getElementById('search_input');
    input.onfocus=function(){
		var isInput = input.type=="textarea" || input.type=="text";
		var inputPrevValue = isInput?input.value:input.innerHTML;
    	//开启timer 时时监控值的改变
        input._searchInputTimer = setInterval(function(){
            var currentValue = isInput?input.value:input.innerHTML;
            if(inputPrevValue != currentValue){
                inputPrevValue =  currentValue;
                onFocusCallback && onFocusCallback.call(input);
            }
        },time || 100);
    }
    input.onblur=function(){
    	//清除timer的监控
        if(input._searchInputTimer){
            clearInterval(input._searchInputTimer);
            input._searchInputTimer = null;
            onBlurCallback && onBlurCallback.call(input);
        }
    }
}