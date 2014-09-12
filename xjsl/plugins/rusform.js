(function(document, $, undefined){
 "use strict";
 $.rusform = function(k, form1, form2, form5, x){
  
  if(form1 instanceof Array){
   x = form2;
   form5 = form1[2];
   form2 = form1[1];
   form1 = form1[0];
  }
  
  var n = Math.abs(k) % 100, n1 = n % 10;
  if ((n > 20 || n < 10) && n1>1 && n1 < 5) return x ? k + ' ' + form2 : form2;
  if (n != 11 && n1 == 1) return x ? k + ' ' + form1 : form1;
  return x ? k + ' ' + form5 : form5;
 }
})(document, $);
