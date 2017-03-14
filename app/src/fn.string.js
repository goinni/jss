//+---------------------------------------------------------------------	
//|去所有空格
//+---------------------------------------------------------------------	
String.prototype.trims = function() {return this.replace(/[ ]/g,"");}
//+---------------------------------------------------------------------
//|去两边空格
//+---------------------------------------------------------------------
String.prototype.trim = function() {return this.replace(/^\s+|\s+$/g,"");}
//+---------------------------------------------------------------------
//|去左边空格
//+---------------------------------------------------------------------
String.prototype.ltrim = function() {return this.replace(/^\s+/,"");}
//+---------------------------------------------------------------------
//|去右边空格
//+---------------------------------------------------------------------
String.prototype.rtrim = function() {return this.replace(/\s+$/,"");}