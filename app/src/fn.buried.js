/*
 * 埋点
 * @param src 图片路径
 */
_jss.fn.addBuried = function(src) {
	var img = document.getElementById("hmCdssBuriedImg");
	if (img) {
		img.src = src;
	} else {
		var ele = document.createElement("img");
		ele.setAttribute("id", "hmCdssBuriedImg");
		ele.src = src;
		document.body.appendChild(ele);
	}
}