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
  splash(true).event.add({click: function(){splash(false); $('#show-news').hide()}});
  if(!$('#show-news')){   
   $('body>div:first-child').append(new $('div#show-news')).html('Здесь будет полный текст новости. С картинками, заголовками и т.п.').show();
  } else{$('div#show-news').html('Здесь будет полный текст новости. С картинками, заголовками и т.п.').show();   
  }
 }
}

var feature = {
 list: ['img/feature1.jpg','img/feature2.jpg','img/feature3.jpg','img/feature4.jpg'],
 current: 0,
 set: function(index){
  $('#feature>img').src = feature.list[feature.current = index];
  clearTimeout(feature.timer);
  feature.timer = setTimeout(function(){$('.feature-button-right').click()},7000);
 },
 timer: 0
};

function fixItem(el){
 alert($(['.'+el.className]));
}

xjsl.ready(function(){
 for(var i=0; i < feature.list.length; ++i){
  $('#feature-bottom-buttons').append(new $('button')).html('&nbsp;').val(''+i).event.add({click: function(){
   feature.set(this.value);  //формируем нижние кнопки из списка
  }})
 }
 
 $('.feature-button-left').event.add({click: function(){ // обработка клика на левую кнопку
  feature.set(feature.current == 0 ? feature.list.length-1 : feature.current-1);
 }})
 
 $('.feature-button-right').event.add({click: function(){ // обработка клика на правую кнопку
  feature.set(feature.current == feature.list.length-1 ? 0 : feature.current+1);
 }})
 
 feature.set(0);
 

 
})


