(function(document, $, undefined){
 "use strict";
  var _ = (function(){ //core
   var _ = function(canvas){
    canvas = $(canvas).get();
    return canvas.getContext ? new _.fn.init(canvas) : undefined;
   };
   var identityMatrix = [[1,0,0],[0,1,0],[0,0,1]];

  _.fn = _.prototype = {
   constructor: _,
   ctx: null, width: null, height: null, currentTransform: identityMatrix, transforms: [identityMatrix],
   init:function(canvas){
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');
   },
   get:function(context){return context ? this.ctx : this.ctx.canvas},
   size:function(width, height){
    if(!width && !height){
     this.width = this.ctx.canvas.width;
     this.height = this.ctx.canvas.height;
    }
    if(width) this.ctx.canvas.width = this.width = width;
    if(height) this.ctx.canvas.height = this.height = height;
    return this;
   },
   hardScale:function(width, height, fromWidth, fromHeight){
    if(fromWidth || fromHeight) this.size(fromWidth, fromHeight);
    this.ctx.canvas.style.width = width+'px';
    this.ctx.canvas.style.height = height+'px';
    return this
   },
   begin:function(){this.ctx.beginPath(); return this},
   move:function(x,y){this.ctx.moveTo(x,y); return this},
   line:function(x,y){this.ctx.lineTo(x,y); return this},
   lines:function(points){for(var i = 0; i < points.length; ++i) this.ctx.lineTo(points[i][0], points[i][1]); return this},
   fill:function(color){
    if(color) this.style({fill:color});
    this.ctx.fill();
    return this
   },
   stroke:function(color){
    if(color) this.style({stroke:color});
    this.ctx.stroke();
    return this
   },
   clip:function(){this.ctx.clip(); return this},
   clear:function(){return this.save().resetTransform().clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height).restore()},
   clearRect:function(x1,y1,x2,y2){this.ctx.clearRect(x1,y1,x2,y2);return this},
   rect:function(x, y, width, height){this.ctx.rect(x,y,width,height); return this},
   fillRect:function(x, y, width, height){this.ctx.fillRect(x,y,width,height); return this},
   strokeRect:function(x, y, width, height){this.ctx.strokeRect(x,y,width,height); return this},
   pointRect:function(x, y, width, height, point){
    var X = width - (point.x - x), Y = height - (point.y - y);
    return X > 0 && Y > 0 && X < width && Y < height;
   },
   fillText:function(s, x, y, maxWidth){maxWidth ? this.ctx.fillText(s, x, y, maxWidth) : this.ctx.fillText(s, x, y);return this},
   strokeText:function(s, x, y, maxWidth){maxWidth ? this.ctx.strokeText(s, x, y, maxWidth) : this.ctx.strokeText(s, x, y);return this},
   measure:function(s){return this.ctx.measureText(s)},
   center:function(){return {x: this.width/2, y: this.height/2}},
   image:function(img, params){
    var X = params.X, Y = params.Y, W = params.W, H = params.H,
      x = params.x, y = params.y, w = params.w, h = params.h;
    if(X === undefined && w === undefined){ this.ctx.drawImage(img, x, y); }else
    if(X === undefined){ this.ctx.drawImage(img, x, y, w, h); }else
    {this.ctx.drawImage(img, X, Y, W, H, x, y, w, h);}
    return this;
   },
   data:function(params){ // img, x, y, dirtyX, dirtyY, width, height
    if(!params) return this.ctx.getImageData(0, 0, this.width, this.height);
    var img = params.img, x = params.x, y = params.y, X = params.dirtyX, Y = params.dirtyY, w = params.width, h = params.height;
    //if(img && !x && !y && !X && !Y && !w && !h) return this.ctx.createImageData(img); //copy info
    //if(!img && !x && !y && !X && !Y && w && h) return this.ctx.createImageData(w, h);
    //if(!img && x && y && !X && !Y && w && h) return this.ctx.getImageData(x, y, w, h);
    //if(img){
     //if(x && y && !w && !h) return this.ctx.putImageData(img, x, y);
     //if(x && y && w && h && !X && !Y) return this.ctx.putImageData(img, x, y, w, h);
     //return this.ctx.putImageData(img, x, y, X, Y, w, h);
    //}
   },
   setPixel: function(imageData, x, y, r, g, b, a){
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
   },
   setDataPixel: function(imageData, x, y, r, g, b, a){
    index = (x + y * imageData.length) * 4;
    imageData[index + 0] = r;
    imageData[index + 1] = g;
    imageData[index + 2] = b;
    imageData[index + 3] = a;
   },
   setGridPixel: function(grid, x, y, r, g, b, a){ 
    $.copy(grid[x][y], {r:r, g:g, b:b, a:a||255});
   },
   grid:function(source){
    if(!source){
     source = this.data().data;
     var res = [];
     for(var i = 0; i < source.length; i += 4){
      var y = Math.floor(i / (this.width * 4)), x = (i - (y * this.height * 4)) / 4;
      if(!res[x]) res[x] = new Array(this.width);
      res[x][y] = {r: source[i], g: source[i+1], b: source[i+2], a: source[i+3]}
     }
     return res;
    }else{
     var res = this.data();
     var index = 0;
     /*for(var i = 0; i < source.length; ++i){
      for(var j = 0; j < source[i].length; ++j){
       res.data[index++] = source[i][j].r;
       res.data[index++] = source[i][j].g;
       res.data[index++] = source[i][j].b;
       res.data[index++] = source[i][j].a || 255;
      }
     }*/
     for(var i = 0; i < res.data.length; i += 4){
      var y = Math.floor(i / (this.width * 4)), x = (i - (y * this.height * 4)) / 4;
      res.data[i]   = source[x][y].r;
      res.data[i+1] = source[x][y].g;
      res.data[i+2] = source[x][y].b;
      res.data[i+3] = source[x][y].a || 255;
     }
     return res;
    }
   },
   base64:function(){
    return this.ctx.canvas.toDataURL()
   },
   style:function(params){
    if(params.fill) this.ctx.fillStyle = params.fill;
    if(params.stroke) this.ctx.strokeStyle = params.stroke;
    if(params.width) this.ctx.lineWidth = params.width;
    if(params.font) this.ctx.font = params.font;
    if(params.base) this.ctx.textBaseline = params.base;
    if(params.align) this.ctx.textAlign = params.align;
    if(params.lineJoin) this.ctx.lineJoin = params.lineJoin;
    if(params.shadow){
     this.ctx.shadowOffsetX = params.shadow.x;
     this.ctx.shadowOffsetY = params.shadow.y;
     this.ctx.shadowBlur = params.shadow.blur;
     this.ctx.shadowColor = params.shadow.color;
    }
    return this
   },
   curve:function(){ // {bezier(cx1,cy1,cx2,cy2,x,y),quadratic(cx1,cy1,x,y)} - кривые Безье
    var i = 0, params;
    for(; i < arguments.length; ++i){
   params = arguments[i];
     if(params.length === 6) this.context.bezierCurveTo(params[0],params[1],params[2],params[3],params[4],params[5]); else this.context.quadraticCurveTo(params[0],params[1],params[2],params[3]);
  }
  return this
   },
   arc:function(x,y, radius, startAngle, endAngle, anticlockwise){ //дуги
    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise == true);
    return this;
   },
   pie:function(x, y, radius, startAngle, endAngle, anticlockwise){
    var X1 = x + radius * Math.cos(startAngle), Y1 = y + radius * Math.sin(startAngle),
        X2 = x + radius * Math.cos(endAngle),   Y2 = y + radius * Math.sin(endAngle);
    this.begin().move(x,y).line(X1,Y1).arc(x,y,radius, startAngle,endAngle, anticlockwise).end();
    return this;
   },
   point:function(){},
   scale:function(x, y){
    this.ctx.scale(x,y);
    this.currentTransform = _.matrix.multiplication(this.currentTransform, [[x,0,0],[0,y,0],[0,0,1]]);
    return this
   },
   resetScale:function(){
    var sx = this.currentTransform[0][2], sy = this.currentTransform[1][2];
    return this.scale(1/sx, 1/sy);
   },
   rotate:function(angle){
    this.ctx.rotate(angle);
    this.currentTransform = _.matrix.multiplication(this.currentTransform, [[Math.cos(angle), -Math.sin(angle),0],[Math.sin(angle), Math.cos(angle),0],[0,0,1]]);
    return this
   },
   translate:function(x, y){
    this.ctx.translate(x, y);
    this.currentTransform = _.matrix.multiplication(this.currentTransform, [[1,0,x],[0,1,y],[0,0,1]]);
    return this
   },
   transform:function(a,b,c,d,e,f){
    this.ctx.transform(a,b,c,d,e,f);
    this.currentTransform = _.matrix.multiplication(this.currentTransform, [[a,c,e], [b,d,f], [0,0,1]]);
    return this
   },
   setTransform:function(a,b,c,d,e,f){
    this.ctx.setTransform(a,b,c,d,e,f);
    this.currentTransform = [[a,c,e], [b,d,f], [0,0,1]];
    return this
   },
   resetTransform:function(){
    this.ctx.setTransform(1,0,0,1,0,0);
    this.currentTransform = identityMatrix;
    //this.transforms = [this.currentTransform];
    return this
   },
   reset:function(){
    this.ctx.canvas.width = this.ctx.canvas.width;
    this.currentTransform = identityMatrix;
    this.transforms = [this.currentTransform];
    return this
   },
   save:function(){
    this.ctx.save(); 
    this.transforms.push(this.currentTransform);
    return this
   },
   restore:function(){
    this.ctx.restore();
    this.currentTransform = this.transforms.pop();
    return this
   },
   end:function(){this.ctx.closePath(); return this},
   originalCoords:function(x, y){ //AB = X
    var X = _.matrix.multiplication(this.currentTransform, [[x],[y],[1]]);
    return {x: X[0], y: X[1]}
   },
   transformedCoords:function(x, y){ //AX = B => X = inverse(A) B
    var A = this.currentTransform.slice();
    var X = _.matrix.multiplication(_.matrix.inverse(A), [[x], [y], [1]]);
    return {x: X[0], y: X[1]}
   },
   viewport:function(x, y, padding){
    if(!padding) padding = 0;
    var coords = this.originalCoords(x, y);
    return coords.x > padding && coords.y > padding && coords.x < this.width - padding && coords.y < this.height - padding;
   }
  }
  _.fn.init.prototype = _.fn;
  return _;
 })();

 _.degree = function(deg){return deg / 180 * Math.PI}
 _.integer = function(num){return num|0}
 _.matrix = {
  multiplication:function(A,B){
   var C = [];
   for(var i = 0; i < A.length; ++i)
    for (var j = 0; j < B[0].length; ++j){
     if(!C[i]) C[i] = [];
     C[i][j] = 0;
     for(var k = 0; k < A[0].length; ++k)
     C[i][j] += A[i][k] * B[k][j];
    }
   return C
  },
  scalarMultiplication: function(A, b){
   var C = [];
   for(var i = 0; i < A.length; ++i)
    for(var j = 0; j < A[i].length; ++j){
     if(!C[i]) C[i] = [];
     C[i][j] = A[i][j] * b;
    }
   return C
  },
  transponate: function(A){
   var C = [];
   for(var i = 0; i < A.length; ++i)
    for(var j = 0; j < A[0].length; ++j){
     if(!C[j]) C[j] = [];
     C[j][i] = A[i][j];
    }
   return C
  },
  inverse: function(A){
   var C = [];
   for(var i = 0; i < A.length; ++i)
    for(var j = 0; j < A[i].length; ++j){
     if(!C[i]) C[i] = [];
     C[i][j] = Math.pow(-1, i+j) * this.det(this.minor(A, i, j));
    }
    C = this.transponate(C);
    return this.scalarMultiplication(C, 1 / this.det(A))
  },
  minor: function(A, x, y){
   var C = [];
   for(var i = 0; i < A.length; ++i)
    for(var j = 0; j < A[i].length; ++j){
     if(i < x){
      if(!C[i]) C[i] = [];
      if(j > y) C[i][j-1] = A[i][j];
      if(j < y) C[i][j] = A[i][j];
     }
     if(i > x){
      if(!C[i-1]) C[i-1] = [];
      if(j > y) C[i-1][j-1] = A[i][j];
      if(j < y) C[i-1][j] = A[i][j];
     }
    }
   return C
  },
  det: function(A){
   if(A[0].length === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
   var S = 0;
   for(var j = 0; j < A[0].length; ++j){
    var C = this.minor(A, 0, j);
    S += A[0][j] * Math.pow(-1, j) * this.det(C);
   }
   return S
  }
 };
 _.fn.ellipse = function(x, y, a, b){
  // Запоминаем положение системы координат (CК) и масштаб
  // Переносим СК в центр будущего эллипса
  // Масштабируем по х. Теперь нарисованная окружность вытянется в a / b раз и станет эллипсом
  // Рисуем окружность, которая благодаря масштабированию станет эллипсом
  // Восстанавливаем СК и масштаб
  this.save().begin().translate(x, y).scale(a / b, 1).arc(0, 0, b, 0, Math.PI * 2, true).end().restore();
  return this;
 }

 $._ = _;
})(document, $);
