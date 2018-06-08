/*
 * 埋点
 * @param src 图片路径
 */
_jss.fn.addBuried = function(src,flag) {
	var img = document.getElementById("hmCdssBuriedImg");
	if(!img){
		img = document.createElement("img");
		img.setAttribute("id", "hmCdssBuriedImg");
		document.body.appendChild(img);
	}
	var cloneEvt = img.cloneNode(true);
	cloneEvt.src = src;

}