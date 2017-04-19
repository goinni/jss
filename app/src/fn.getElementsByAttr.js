/*
 * 根据属性获取元素
 */
_jss.fn.getElementsByAttr = function(input_str, domDiv){
    input_str = input_str.replace(/\s/g,"");
    var typeReg = /(\w+)\[(\S+)\]/;
    var eleTag,attrs=[];
    var arr = input_str.match(typeReg);
    if(arr){
        eleTag = arr[1];
        attrs = arr[2].split('][');
    }else{
        eleTag = input_str;
    }
    var domList = this.getElementsByTagName(eleTag,domDiv);
   // this.get(eleTag, domDiv);

    var checkedList = [];
    if(attrs.length){
        for(var i = 0;i<domList.length;i++){
            var temp = domList[i];
            var hasMatch = true;
            for(var j=0;j<attrs.length;j++){
                var attTemp = attrs[j].split("=");
                if(attTemp.length>1){
                    if(!(temp.getAttribute(attTemp[0])==attTemp[1])){
                        hasMatch = false;
                        break;
                    }
                }else{
                    if(temp.getAttribute(attTemp[0])==null){
                        hasMatch = false;
                        break;
                    }
                }
            }
            if(hasMatch){
                checkedList.push(temp);
            }
        }
        return checkedList;
    }else{
        return domList;
    }
}