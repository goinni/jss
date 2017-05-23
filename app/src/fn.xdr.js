/*
 * ie8跨域请求
 * @param opt.url 	请求地址
 * @param opt.type 	请求方法  POST 或 GET
 * @param opt.time 	请求超时
 * @param opt.data 	请求参数
 */
 _jss.fn.xdr = function(opt){	

	var xdr;

    function alert_error(){
        alert("XDR onerror");
    }
    function alert_timeout(){
        alert("XDR ontimeout");
    }
    function alert_progress(){
        // alert("XDR onprogress");
    }
    function req_abort(){
        if(xdr){
            xdr.abort(); // Abort XDR if the Stop button is pressed. 
        }
    }

    /*
	 * 请求
	 * @param url 		请求url
	 * @param metch 	请求方法
	 * @param data      请求参数字符串
	 * @param time      请求超时
     */
    function req_init(url, metch, time, data, callback,errCalback) {
        var timeout = time || 10000;
        if (window.XDomainRequest) // Check whether the browser supports XDR. 
        {
            xdr = new XDomainRequest(); // Create a new XDR object.
            if (xdr)
            {
                // There is an error and the request cannot be completed. 
                // For example, the network is not available.
                xdr.onerror     = function(){
                    errCalback && errCalback(xdr);
                };
                        
                // This event is raised when the request reaches its timeout. 
                xdr.ontimeout   = alert_timeout;
                        
                // When the object starts returning data, the onprogress event 
                // is raised and the data can be retrieved by using responseText.
                xdr.onprogress  = alert_progress;
                       
                // When the object is complete, the onload event is raised and 
                // the responseText ensures the data is available. 
                xdr.onload      = function(){
                	callback && callback(xdr.responseText);
                };

                xdr.timeout     = timeout;
                        
                // The URL is preset in the text area. This is passed in the 
                // open call with a get request.
                xdr.open(metch || "GET", url);
                        
                // The request is then sent to the server.  
                xdr.send(data);
            } else {
                alert('Failed to create new XDR object.');
            }
        } else {
            alert('XDR does not exist.');
        }
    }

    //初始化入口
    req_init(opt.url, opt.type, opt.time, opt.data, opt.success,opt.error);

}