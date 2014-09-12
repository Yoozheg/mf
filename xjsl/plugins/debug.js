(function(document, $, undefined){
 "use strict";
 $.debug = { //отладка
  tree: function(obj){return "{"+getTree(obj, 0)+"}\n"}
 }
 
 function getTree(obj, spaces){
  var s = [];
  for(var i in obj){
   var elem = "";
   switch(typeof obj[i]){
    case "number": elem = obj[i]; break;
    case "string": elem = "'"+obj[i]+"'"; break;
    case "function": elem = "function"+(new RegExp(/\(.*?\)/)).exec(obj[i]); break;
    case "object": {
     if(obj[i] instanceof Array) elem = "["+getTree(obj[i], spaces + 1)+"]"; else {
      elem = (elem = "{"+getTree(obj[i], spaces+1)+"}");
     }
    }; break;
    default: elem = typeof obj[i];
   }
   s.push(i+": " + elem);
  }
  var ret = "";
  for(var i=0;i<s.length;++i){
   if(i == 0) ret += "\n";
   ret += offset(spaces+1)+s[i];
   if(i < s.length-1) ret+=",\n"; else ret+="\n";
  }
  return ret+(s.length > 0 ? offset(spaces) : "");
	
	function offset(spaces){
   var s = "";
   for(var i = 0; i < spaces; ++i) s+=" ";
   return s;
  }
 }
})(document, $);
