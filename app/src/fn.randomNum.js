/**
 * 获取区间随机数据（ 最小数 ~ 最大数之间的一个随机数 ）
 * @param startNum 最小数
 * @param endNum   最大数
 */
_jss.fn.randomNum = function (startNum, endNum){

  return (Math.random() * ( endNum - startNum ) + startNum);
}