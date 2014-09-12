(function(document, $, undefined){
 "use strict";

 $.rand = function(min, max){ //случайные целые числа
  if(!max) if(min > 0){max = min; min = 0}else max = 0;
  return Math.floor(Math.random() * (max - min)) + min;
 }

 $.randArbitary = function(min, max){ //случайные числа
  if(!min) min = 1;
  if(!max) if(min > 0){max = min; min = 0}else max = 0;
  return Math.random() * (max - min) + min;
 }
})(document, $);
