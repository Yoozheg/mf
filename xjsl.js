(function(win,doc,helem,undefined){
 var displayCache ={}, readyList=[],
  inArray = Array.prototype.indexOf ? function(val,arr){return arr.indexOf(val)}: function(val,arr){var i = arr.length;while(i--){if(a[i] === val) return i}return -1},
  Event = (function(){
	var guid = 0
	function fixEvent(event){
	 event = event || window.event
	 if(event.isFixed) return event;
	 event.isFixed = true 
	 event.preventDefault = event.preventDefault || function(){this.returnValue = false}
	 event.stopPropagation = event.stopPropagation || function(){this.cancelBubble = true}
	 if(!event.target) event.target = event.srcElement
	 if(!event.relatedTarget && event.fromElement) event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
	 if(event.pageX == null && event.clientX != null){
	  var html = doc.documentElement, body = doc.body;
	  event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
	  event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
	 }
	 if(!event.which && event.button) event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0 )));
	 return event
	}
	function commonHandle(event){ // Вызывается в контексте элемента всегда this = element
	 event = fixEvent(event)
	 var handlers = this.events[event.type]
	 for(var g in handlers){
	  var handler = handlers[g]
	  var ret = handler.call(this)
	  if(ret === false){
	   event.preventDefault()
	   event.stopPropagation()
	  }else if ( ret !== undefined){
       event.result = ret
      }
	  if(event.stopNow) break;
	 }
	}
	return{
	add: function(elem, type, handler){
	 if(elem.setInterval &&(elem != window && !elem.frameElement )) elem = window;
	 if(!handler.guid) handler.guid = ++guid;
	 if(!elem.events){
	  elem.events ={}
	  elem.handle = function(event){
	   if(typeof Event !== "undefined") return commonHandle.call(elem, event)
	  }
	 }
	 if(!elem.events[type]){
	  elem.events[type] ={}
	  if(elem.addEventListener) elem.addEventListener(type, elem.handle, false); else if(elem.attachEvent) elem.attachEvent("on" + type, elem.handle)
	 }
	 elem.events[type][handler.guid] = handler
	},
	remove: function(elem, type, handler){
	 var handlers = elem.events && elem.events[type]
	 if(!handlers) return;
	 if(!handler){
	  if(!type){
	   for(type in elem.events)
	    for(var handle in handlers)
		delete elem.events[type][handle];
      }else{
 	   for(var handle in handlers)
	    delete elem.events[type][handle];
      }
      return
	 }
	 delete handlers[handler.guid]
	 for(var any in handlers) return;
	 if(elem.removeEventListener) elem.removeEventListener(type, elem.handle, false); else if(elem.detachEvent) elem.detachEvent("on" + type, elem.handle);
	 delete elem.events[type]
	 for(var any in elem.events) return;
	 try{
	  delete elem.handle
	  delete elem.events 
	 }catch(e){ // IE
	  elem.removeAttribute("handle")
	  elem.removeAttribute("events")
	 }
	}
   }
  }()),
  xjsl ={
 ajax:function(text,addr,callback,method){
  var req;
  try{
   req = new XMLHttpRequest();
  }catch(e){
   try{
    req = new ActiveXObject("Msxml2.XMLHTTP");
   }catch(e){
     try{
      req = new ActiveXObject("Microsoft.XMLHTTP");
     }catch(e){
       req = false;
     }
    }
   }
   method = (method || (text ? "post" : "get")).toLowerCase()
   req.open(method,addr,true);
    if(method=="post")
  	 req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
	 
     req.onreadystatechange=function(){
      if(req.readyState==4){
  	   if(callback){
        callback.call(null, req.responseText);
  	   }else{
  	    return req.responseText;
  	   }
     }
    }
    if(typeof text != "string"){
     res=[];
     for(f in text)
      res.push(encodeURIComponent(f)+"="+encodeURIComponent(text[f]));
     req.send(res.join("&"));
    }else{
	 req.send(text);
	}
    return this;
  },
 cookie: function(name,value,props){
   if(!value && !props){
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined
   }
   props = props ||{}
   var exp = props.expires
  if(typeof exp == "number" && exp){
       var d = new Date()
       d.setTime(d.getTime() + exp*1000)
       exp = props.expires = d
   }
   if(exp && exp.toUTCString){props.expires = exp.toUTCString()}
   value = encodeURIComponent(value)
   var updatedCookie = name + "=" + value
   for(var propName in props){
       updatedCookie += "; " + propName
       var propValue = props[propName]
       if(propValue !== true){ updatedCookie += "=" + propValue }
   }
   document.cookie = updatedCookie
   return this
  },
 storage:{
   set:function(item,value){
 	(win.localStorage||win.globalStorage).setItem(item,value);
	return this
   },
   get:function(item){
	return (win.localStorage||win.globalStorage).getItem(item);
   },
   key:function(index){
    return (win.localStorage||win.globalStorage).key(index)
   },
   remove:function(item){
    (win.localStorage||win.globalStorage).removeItem(item);
	return this
   },
   len:function(){
    return (win.localStorage||win.globalStorage).length;
   },
   clear:function(){
    (win.localStorage||win.globalStorage).clear();
	return this
   }
  },
 ready: function(handler){
  	if(!readyList.length)
	 bindReady(function(){
	  for(var i=0; i < readyList.length; ++i)
	   readyList[i]();
	 })
  	readyList.push(handler);
  	return this;
  },
 client:{ //инфо о клиенте
  width:function(){
   return win.innerWidth ? win.innerWidth : helem && helem.clientWidth ? helem.clientWidth : undefined;
  },
  height:function(){
   return win.innerHeight ? win.innerHeight : helem && helem.clientHeight ? helem.clientHeight : undefined;
  },
  browser:'', //вычисленый браузер
  version:'' //версия
 },
 rand:function(min,max){ //случайные целые числа
  if(!max){max = min; min = 0}
  return Math.floor(Math.random() * (max - min + 1)) + min;
 },
 
 ex:{} //расширения
};
 function bindReady(handler){
  var called = false;
  function ready(){
  	if(called) return
  	called = true
  	handler()
  }
  if(doc.addEventListener){
  	doc.addEventListener("DOMContentLoaded", function(){
  		doc.removeEventListener( "DOMContentLoaded", arguments.callee, false)
  		ready()
  	},false)
  }else if(doc.attachEvent){
  	if(helem.doScroll && win == win.top){
  		function tryScroll(){
  			if(called) return
  			try{
  				helem.doScroll("left")
  				ready()
  			}catch(e){
  				setTimeout(tryScroll, 0)
  			}
  		}
  		tryScroll()
  	}
  	doc.attachEvent("onreadystatechange", function(){
  		if(doc.readyState==="complete"){
  			doc.detachEvent("onreadystatechange",arguments.callee)
  			ready()
  		}
  	})
  }
  if(win.addEventListener) win.addEventListener('load',ready,false); else if(win.attachEvent) win.attachEvent('onload',ready); // else win.onload=ready
 }
 function getRealDisplay(elem){
	if(elem.currentStyle){
		return elem.currentStyle.display
	}else if(window.getComputedStyle){
		var computedStyle = window.getComputedStyle(elem, null )
		return computedStyle.getPropertyValue('display')
	}
}
 function isHidden(el){
	var width = el.offsetWidth, height = el.offsetHeight,
		tr = el.nodeName.toLowerCase() === "tr"

	return width === 0 && height === 0 && !tr ?
		true : width > 0 && height > 0 && !tr ? false :	getRealDisplay(el)
}
 function hide(el){
 if(!el.getAttribute('displayOld'))
  el.setAttribute("displayOld", el.style.display)
 el.style.display = "none"
}
 function show(el){
 if(getRealDisplay(el) != 'none') return
 var old = el.getAttribute("displayOld");
 el.style.display = old || "";
 if(getRealDisplay(el) === "none"){
  var nodeName = el.nodeName, body = document.body, display
   if(displayCache[nodeName]){
	display = displayCache[nodeName]
   }else{
	var testElem = document.createElement(nodeName)
	body.appendChild(testElem)
	display = getRealDisplay(testElem)
	if(display === "none"){
	 display = "block"
	}
	body.removeChild(testElem)
	displayCache[nodeName] = display
   }
   el.setAttribute('displayOld', display)
   el.style.display = display
 }
}
 function searchNodes(){
  var list=[], i;
  for(i=0;i<arguments.length;++i){
   if(typeof arguments[i] == "object"){ //object || array
	if(arguments[i] instanceof Array){ //array
	 list=list.concat(searchNodesAll.apply(this,arguments[i]))
	}else list.push(arguments[i]); //object
   }else{ //string
	list.push(this.querySelector(arguments[i]));
   }
  }
  return list
 }
 function searchNodesAll(){
  var i,j,list=[];
  for(i=0;i<arguments.length;++i){
   if(typeof arguments[i] == "object"){ //object || array
	if(arguments[i] instanceof Array){ //array
	 list=list.concat(searchNodesAll.apply(this,arguments[i]))
	}else list.push(arguments[i]); //object
   }else{ //string
	list=list.concat(Array.prototype.slice.call(this.querySelectorAll(arguments[i])));
   }
  }
  return list
 }
 function create(){
 var i, //счётчик
	str1,str2, //временные строки
	elem, //текущий элемент
	list=[];
 for(i=0;i<arguments.length;++i){
  if(typeof arguments[i] == 'string'){
   elem=doc.createElement(str1=arguments[i].match(/^\D{1}[\w-\+]*/g)[0]);
   str1=arguments[i].substr(str1.length);
   while(str1.length != 0){
    str2=str1.match(/^(?:#|\.)?\D{1}[\w-\+]*/g)[0];
    str2[0] == '.' ? elem.className=str2.substr(1) : elem.id=str2.substr(1);
    str1=str1.substr(str2.length);
   }
   list.push(elem);
  }else{
   list.push(arguments[i]);
  }
 }
 return list;
}
 function wrapList(){
  var args =  arguments.length == 1 ? arguments[0] : Array.prototype.slice.call(arguments);
  this.node = args;
  this.node.html=function(code){
   if(args instanceof Array){
    if(code == arguments[0]){
	 for(i in args)
	  args[i].innerHTML = arguments.length == 1 ? code : arguments[i]
	}else{  // !code
	  code=[];
	  for(i in args) code.push(args[i].innerHTML)
	  return code
	 }
   }else{
    if(code){
	 args.innerHTML=code;
    }else return args.innerHTML
   }
   return args
  };
  this.node.txt=function(code){
   if(args instanceof Array){
    if(code == arguments[0]){
	 for(i in args)
	  args[i].innerText = arguments.length == 1 ? code : arguments[i]
	}else{  // !code
	  code=[];
	  for(i in args) code.push(args[i].innerText)
	  return code
	 }
   }else{
    if(code){
	 args.innerText=code;
    }else return args.innerText
   }
   return args
  };
  this.node.css=function(code){
   if(args instanceof Array){
    if(code == arguments[0]){
	 for(i in args)
	  args[i].style = arguments.length == 1 ? code : arguments[i]
	}else{  // !code
	  code=[];
	  for(i in args) code.push(args[i].style)
	  return code
	 }
   }else{
    if(code){
	 args.style=code;
    }else return args.style
   }
   return args
  };
  this.node.attr=function(code){
   var i,j,attributes=[];
   if(args instanceof Array){
    if(code == arguments[0] && !(code instanceof Array || typeof code == "string")){
	 for(i=0;i<args.length;++i){
	  code = arguments.length == 1 ? code : arguments[i]
	  for(j in code)
	  args[i].setAttribute(j,code[j])
	 }
	}else{  // get
	 for(i in args){
	  code = arguments.length == 1 ? code : arguments[i];
	  if(typeof code == "string")
	   attributes.push(args[i].getAttribute(code));
	  else{
	   attributes[i]=[];
	   for(j=0;j<code.length;++j)
	    attributes[i].push(args[i].getAttribute(code[j]))
	  }
	 }
	 return attributes
	}
   }else{
    if(code == arguments[0] && code instanceof Array){
	 for(i=0;i<code.length;++i) attributes.push(args.getAttribute(code[i]))
	 return attributes
    }else if(code == arguments[0] && typeof code == 'string') return args.getAttribute(code);
	else{ //object
	 for(i in code) args.setAttribute(i,code[i]);
	}
   }
   return args
  };
  this.node.q=function(code){
   return args.length > 1 ?  $(args[code])  : args;
  };
  this.node.find=function(){
   if(args instanceof Array){
    var list=[]
	for(i=0;i<args.length;++i) list.concat(searchNodes.apply(args[i],arguments));
	return wrapList(list)
   }
   return wrapList(searchNodes.apply(args,arguments));
  }
  this.node.val=function(code){
   if(args instanceof Array){
    if(code == arguments[0]){
	 for(i in args)
	  args[i].value= arguments.length == 1 ? code : arguments[i]
	}else{  // !code
	  code=[];
	  for(i in args) code.push(args[i].value)
	  return code
	 }
   }else{
    if(code){
	 args.value=code;
    }else return args.value
   }
   return args
  };
  this.node.parent = function(){
   if(args instanceof Array){
    var list=[],i=0;
	for(;i<args.length;++i) if(inArray(args[i].parentNode,list) == -1) list.push(args[i].parentNode)
	return wrapList(list);
   }else return wrapList(args.parentNode)
  };
  this.node.first=function(){
    //достаточно воспользоваться встроенным методом
    if(args instanceof Array){
	 var list=[],i=0;
	 for(;i<args.length;++i) if(args[i].firstElementChild) list.push(args[i].firstElementChild)
	 return (list[0] && list[0].nodeName) ? wrapList.apply(null,list) : undefined;
    }else return args.firstElementChild ? wrapList(args.firstElementChild) : undefined;
  };
  this.node.last=function(){
    if(args instanceof Array){
	 var list=[],i=0;
	 for(;i<args.length;++i) if(args[i].lastElementChild) list.push(args[i].lastElementChild)
	 return (list[0] && list[0].nodeName) ? wrapList.apply(null,list) : undefined;
    }else return args.lastElementChild ? wrapList(args.lastElementChild) : undefined;
  };
  this.node.next=function(){
   if(args instanceof Array){
	var list=[],i=0;
	for(;i<args.length;++i) if(args[i].nextElementSibling) list.push(args[i].nextElementSibling)
	return (list[0] && list[0].nodeName) ? wrapList.apply(null,list) : undefined;
   }else return args.nextElementSibling ? wrapList(args.nextElementSibling) : undefined;
  };
  this.node.prev=function(){
    if(args instanceof Array){
	 var list=[],i=0;
	 for(;i<args.length;++i) if(args[i].previousElementSibling) list.push(args[i].previousElementSibling)
	 return (list[0] && list[0].nodeName) ? wrapList.apply(null,list) : undefined;
    }else return args.previousElementSibling ? wrapList(args.previousElementSibling) : undefined;
  };
  this.node.child=function(){
   if(args instanceof Array){
	 var list=[],i=0;
	 for(;i<args.length;++i) if(args[i].children) list.concat(Array.prototype.slice.call(args[i].children))
	 return (list[0] && list[0].nodeName) ? wrapList.apply(null,list) : undefined;
    }else return args.children ? wrapList(Array.prototype.slice.call(args.children)) : undefined;
  }
  this.node.remove=function(){
   var node = args.parent()
   if(args instanceof Array){
	for(;i<args.length;++i) args[i].parentNode.removeChild(args[i]);
   }else args.parentNode.removeChild(args)
   return node
  };
  this.node.empty=function(){
   if(args instanceof Array){
    for(var i=0;i<args.length;++i) while(args[i].childNodes.length) args[i].removeChild(args[i].childNodes[0]);
   }else while(args.childNodes.length) args.removeChild(args.childNodes[0]);
   return args
  };
  this.node.each=function(fn){
   if(args instanceof Array){
    for(var i=0;i<args.length;++i) fn.call(wrapList(args[i]),i);
   }else fn.call(args,undefined);
   return args;
  }
  this.node.event={
   add:function(code){
    var i,j;
    if(args instanceof Array){
      for(i=0;i<args.length;++i){
	   code = arguments.length == 1 ? code : arguments[i]
	   for(j in code) Event.add(args[i],j,code[j])
	  }
    }else for(i in code) Event.add(args,i,code[i]);
    return args
   },
   del:function(code){
    var i,j;
    if(args instanceof Array){
      for(i=0;i<args.length;++i){
	   if(code==arguments[0] && arguments.length > 0){
	    code = arguments.length == 1 ? code : arguments[i]
	    if(typeof code == "object"){
	     for(j in code)Event.remove(args[i],j,code[j]);
	    }else{
		Event.remove(args[i],code);
	    }
	   }else{
	    for(i=0;i<args.length;++i)Event.remove(args[i])
	   }
	  }
    }else{
	 if(code==arguments[0] && arguments.length > 0){
	  if(typeof code == "object"){
	   for(i in code)Event.remove(args,i,code[i]);
	  }else{
	  Event.remove(args,code);
	  }
	 }else Event.remove(args);
    }
    return args
   }
  }
  this.node.show=function(){
   if(args instanceof Array){
    for(var i=0;i<args.length;++i) show(args[i]);
   }else show(args)
   return args;
  };
  this.node.hide=function(){
   if(args instanceof Array){
    for(var i=0;i<args.length;++i) hide(args[i]);
   }else hide(args)
   return args;
  };
  this.node.toggle=function(){
   if(args instanceof Array){
    for(var i=0;i<args.length;++i) isHidden(args[i]) ? show(args[i]) : hide(args[i]);
   }else isHidden(args) ? show(args) : hide(args)
   return args;
  };
  this.node.add=function(code){ //добавить текущий в конец code
   
  };
  this.node.pdd=function(code){}; //в начало
  this.node.append=function(){ //добавить потомка в конец текущего узла
   var list=create.apply(null,arguments), i=0;
   if(args instanceof Array)
    for(;i<args.length;++i) args[i].appendChild(list.length > 1 ? list[i] : list[0]);
   else if(list.length > 1){
	 var tmp=doc.createDocumentFragment();
	 for(;i<list.length;++i) tmp.appendChild(list[i]);
	 args.appendChild(tmp);
    }else args.appendChild(list[0]);
   return wrapList(wrapList(list.length > 1 ? list : list[0]))
  };
  this.node.prepend=function(){ //добавить потомка в начало текущего узла
   var list=create.apply(null,arguments), i=0;
   if(args instanceof Array)
    for(;i<args.length;++i) args[i].insertBefore(list.length > 1 ? list[i] : list[0], args[i].firstChild);
   else if(list.length > 1){
	 var tmp=doc.createDocumentFragment();
	 for(;i<list.length;++i) tmp.appendChild(list[i]);
	 args.insertBefore(tmp,args.firstChild);
    }else args.insertBefore(list[0],args.firstChild);
   return wrapList(wrapList(list.length > 1 ? list : list[0]))
  };
  this.node.wrap={ //обернуть
   inside:function(tag){},
   outside:function(tag){},
  };
  this.node.after=function(){ // Добавить новый узел после текущего элемента
   var list=create.apply(null,arguments), i=0;
   if(args instanceof Array)
    for(;i<args.length;++i)
	 args[i].parentNode.insertBefore(list.length > 1 ? list[i] : list[0],args[i]);
   else
    if(list.length > 1){
	 var tmp=doc.createDocumentFragment();
	 for(;i<list.length;++i) tmp.appendChild(list[i]);
	 args.parentNode.insertBefore(tmp,args);
    }else args.parentNode.insertBefore(list[0],args);
   return wrapList(wrapList(list.length > 1 ? list : list[0]))
  };
  this.node.before=function(){ // Добавить новый узел перед текущим элементом
   var list=create.apply(null,arguments), i=0;
   if(args instanceof Array)
    for(;i<args.length;++i)
	 args[i].parentNode.insertBefore(list.length > 1 ? list[i] : list[0],args[i]);
   else
    if(list.length > 1){
	 var tmp=doc.createDocumentFragment();
	 for(;i<list.length;++i) tmp.appendChild(list[i]);
	 args.parentNode.insertBefore(tmp,args);
    }else args.parentNode.insertBefore(list[0],args);
   return wrapList(wrapList(list.length > 1 ? list : list[0]))
  }; 
  this.node.insert={
   after:function(tag){}, //Поместить текущий узел после указанного элемента
   before:function(tag){}//Поместить текущий узел перед указанным элементом
  }
  this.node.replace=function(){}; //заменить текущий новым
  this.node.filter=function(func,ret){};
  this.node.animate=function(type,params,delay,callback){
   function stop(a){
    var flag=true;
    for(var i in a){
	 //alert(i+': '+a[i]+'\n'+args.style[i]+'\n'+flag)
	 if(a[i][1] != parseInt(args.style[i])) flag = false
    }
	return flag;
   }
   function frame(a){
    for(var i in a){
     var prp =  type == 1 ?  Math.floor(parseInt(args.style[i])*a[i][0]) : Math.floor(parseInt(args.style[i])+a[i][0]);
	 args.style[i] = (prp > parseInt(args.style[i]) ? (prp > a[i][1] ? a[i][1] : prp) : (prp < a[i][1] ? a[i][1] : prp)) + 'px';
    }
   }
   //for(var i in params.css) params.css[i]=[false,params.css[i]];
   args.style.overflow='hidden';
   args.style.width=(args.offsetWidth < args.scrollWidth ? args.offsetWidth : args.scrollWidth)+'px';
   args.style.height=(args.offsetHeight < args.scrollHeight ? args.offsetHeight : args.scrollHeight)+'px';
   var m = function(){
    if(!stop(params)){
	 frame(params);
	 setTimeout(m,delay);
	 //alert(1)
    }else{
	 clearTimeout(m);
	// callback.call(args);
    }
   }
   m();
   return args
  }

  return this.node
}
 $=function(){
  var list= this == win ? searchNodes.apply(doc,arguments) : create.apply(null,arguments);
  return (list[0] && list[0].nodeName) ? wrapList.apply(null,list) : undefined;
 }
 win.xjsl = xjsl;
})(window,document,document.documentElement||document.body);
