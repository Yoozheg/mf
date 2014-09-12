(function(document, $, undefined){
 "use strict";

 $.DOM.hover = function(mouseover, mouseout, mousemove){
  this.on({mouseover:mouseover, mouseout:mouseout});
  if(mousemove) this.on({mousemove:mousemove});
  return this;
 }
})(document, $);
