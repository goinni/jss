/*
 * 埋点
 * @param src 图片路径
 */
_jss.fn.addBuried = function(src,flag) {
	var img = document.getElementById("hmCdssBuriedImg");
	var evt = document.getElementById("hmCdssEventImg");
	var imgLoad = true;
	if(!img){
		img = document.createElement("img");
		img.setAttribute("id", "hmCdssBuriedImg");
		document.body.appendChild(img);
	}
	if(!evt){
		evt = document.createElement("img");
		evt.setAttribute("id", "hmCdssEventImg");
		document.body.appendChild(evt);
	}
	if (flag) {
		var cloneEvt = evt.cloneNode(true);
		cloneEvt.src = src;
	} else {
		var cloneEvt = img.cloneNode(true);
		cloneEvt.src = src;
	}

}