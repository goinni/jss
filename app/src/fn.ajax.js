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
_jss.fn.ajax = function(opt){
	var xmlhttp;
	//1.
	if (window.XMLHttpRequest) {
	    try {
	        xmlhttp = new XMLHttpRequest();
	        if( xmlhttp.overrideMimeType ){
			    xmlhttp.overrideMimeType("text/html; charset=UTF-8");
			}
	    } catch(e) {}
	} else if (window.ActiveXObject) {
	    try {
	        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch(e) {
	        try {
	            xmlhttp = new ActiveXObject("Msxml2.XMLHttp");
	        } catch(e) {
	            try {
	                xmlhttp = new ActiveXObject("Msxml3.XMLHttp");
	            } catch(e) {}
	        }
	    }
	}
	//2.
	xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4) { //readystate 为4即数据传输结束
	    	var r = "";
	        try {
	            if (xmlhttp.status == 200) {
	            	var result = xmlhttp.responseText;
	            	try{
	            		//默认返回值为JSON数据
	            		result = JSON.parse(result);
	            	}catch(e){
	            		// e todo
	            	}
	                opt.success && opt.success.call(this, result);
	            } else {
	                opt.error && opt.error.call(this, xmlhttp);
	            }
	        } catch(e) {
	            opt.error && opt.error.call(this, e);
	        }
	    }
	}
	
	//构造请求参数
	var param = "";
	if(opt.data){
		for(var key in opt.data){
			param += (key + "=" + opt.data[key] + "&");
		}
		param = param.substring(0, param.length-1);
	}
	//构造GET请求
	var metch = opt.type || 'GET';
	var sendParam = null;
	if(metch === "GET" && param){
		opt.url += ('?' + param);
	}else{
		//POST 请求参数
		sendParam = JSON.stringify(opt.data);
	}
	//3.
	var isAsync = true;  //缺省为异步请求
	if(opt.async === false || opt.async === "false"){
		isAsync = false;
	}
	xmlhttp.open(metch, opt.url, isAsync);
	if(metch === "POST"){
		// xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
	}
	//设置请求头
	if(opt.header){
		for(var key in opt.header){
			xmlhttp.setRequestHeader(key, opt.header[key]);
		}
	}
	xmlhttp.send(sendParam); 

}