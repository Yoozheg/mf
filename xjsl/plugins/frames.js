(function(document, $, undefined){
 "use strict";

 $.frameLocation = function(iframe){
	iframe = $(iframe).get();
  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	return innerDoc.location.href;
 }

})(document, $);
