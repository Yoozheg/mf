(function(document, $, undefined){
 "use strict";
 $.DOM.svgAddCls = function(classTitle){
  return this.each(function() {
   var oldClass = this.attr("class");
   oldClass = oldClass ? oldClass : '';
   this.attr("class", (oldClass+" "+classTitle).trim());
  });
 }
 $.DOM.svgDelCls = function(classTitle){
  return this.each(function(){
   var oldClass = this.attr("class"),
 	  startpos = oldClass.indexOf(classTitle),
 		endpos = startpos + classTitle.length,
 		newClass = oldClass.substring(0, startpos).trim() + " " + oldClass.substring(endpos).trim();
   if(!newClass.trim()) this.attr("class", null); else this.attr("class", newClass.trim());
  });
 }
})(document, $);
