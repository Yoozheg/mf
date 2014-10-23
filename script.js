function inArray(array, elem){
 for(var i = 0; i < array.length; ++i){
  if (array[i] == elem) return i;
 }
 return -1;
};

function splash(bool){
 if(bool){
  if(!$('#splash')){
   return $(document.body).append(new $('div#splash')).event.add({click: function(){splash(false)}}).show().append(new $('button')).html('X');
  } else{
   return $('#splash').show().first();
  }
 } else{
  $('#splash').hide();
 };
};

function showNews(id){
 if(id){
  splash(true).event.add({click: function(){splash(false); $('#showNews').hide()}});
  if(!$('#showNews')){   
   $('body>div:first-child').append(new $('div#showNews')).html('Здесь будет полный текст новости. С картинками, заголовками и т.п.').show();
  } else{$('div#showNews').html('Здесь будет полный текст новости. С картинками, заголовками и т.п.').show();   
  }
 }
}


var feature = ['img/feature1.jpg','img/feature2.jpg','img/feature3.jpg','img/feature4.jpg'];
var featureCurrent = 0;



function fixItem(el){
 alert($(['.'+el.className]));
}



$.ready(function(){

 if($('#feature>img')){
  setInterval(function(){
   featureCurrent = featureCurrent == feature.length-1 ? 0 : featureCurrent+1;
   $('#feature>img').attr('src',feature[featureCurrent]);
  },10000)
 }
 
})


