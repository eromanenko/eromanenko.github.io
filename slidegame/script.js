window.onload = function(){
  	var stop = 0;
	var container = document.getElementById('container');
	var idblock = ['lt','ct','rt','lm','cm','rm','lb','cb','rb'];
	var block;
	var idbutton = ['lu', 'cu', 'ru', 'ld', 'cd', 'rd', 'tr', 'mr', 'br', 'tl', 'ml', 'bl'];
	var button = idbutton.map(function (id) {
	    return document.getElementById(id);
	});
	button.forEach(function(but, j){
		but.onclick = function() {
          if (stop == 0){
            stop = 1;
			block = idblock.map(function (i) {
				return document.getElementById(i);
			});
			var a;
			var b;
			var c;
			var e;
			var size1;
			var size2;
			var prop1;
			var prop2;
			var step;
			if(j < 3) {
				a = 0;
				b = 1;
				c = 3;
				e = 0;
				size1 = 200;
				size2 = 300;
				prop1 = 'top';
				prop2 = 'left';
				step = -1;
			};
			if(j > 2 && j < 6) {
				a = 3;
				b = 1;
				c = 3;
				e = 3;
				size1 = 200;
				size2 = 300;
				prop1 = 'top';
				prop2 = 'left';
				step = 1;
			};
			if(j > 5 && j < 9) {
				a = 6;
				b = 3;
				c = 1;
				e = 1;
				size1 = 300;
				size2 = 200;
				prop1 = 'left';
				prop2 = 'top';
				step = 1;
			};
			if(j > 8) {
				a = 9;
				b = 3;
				c = 1;
				e = 0;
				size1 = 300;
				size2 = 200;
				prop1 = 'left';
				prop2 = 'top';
				step = -1;
			};
			var n = (j - a) * b;
			var d = size1 * step * (step - 2);
			var newblock = document.createElement('div');
			newblock.innerHTML = block[n + 2 * e].innerHTML;
			newblock.style[prop1] = d + 'px';
			newblock.style[prop2] = size2 * n / b + 'px';
			container.appendChild(newblock);
			move(block[n], prop1, 0, step * size1);
			move(block[n + c], prop1, size1, (step + 1) * size1);
			move(block[n + 2 * c], prop1, 2 * size1, (step + 2) * size1);
			move(newblock, prop1, d, d + step * size1);
			var id = [];
			id[0] = block[n].id;
			id[1] = block[n + c].id;
			id[2] = block[n + 2 * c].id;
			setTimeout(function() {
				container.removeChild(block[n + 2 * e]);
				block[n + c].id = id[1 + step];
				block[n + c * (2 - (1 + step))].id = id[1];
				newblock.id = id[1 - step];
              	stop = 0;
			}, 300);
          }
		}
	});
};
function move(elem, prop, start, end) {
	animateProp({
		delay: 10,
		duration: 300,
		delta: makeEaseInOut(quad),
		start: start,
		end: end,
		prop: prop,
		elem: elem
	});
}
function animate(opts) {
  var start = new Date;
  var delta = opts.delta || linear;
  var timer = setInterval(function() {
    var progress = (new Date - start) / opts.duration;
    if (progress > 1) progress = 1;
    opts.step( delta(progress) );
    if (progress == 1) {
      clearInterval(timer);
      opts.complete && opts.complete();
    }
  }, opts.delay || 13);
  return timer;
}
function animateProp(opts) {
  var start = opts.start, end = opts.end, prop = opts.prop;
  opts.step = function(delta) {
    var value = Math.round(start + (end - start)*delta);
    opts.elem.style[prop] = value + 'px';
  }
  return animate(opts);
}
function quad(progress) {
  return Math.pow(progress, 2);
}
function makeEaseInOut(delta) {
  return function(progress) {
    if (progress < .5)
      return delta(2*progress) / 2;
    else
      return (2 - delta(2*(1-progress))) / 2;
  }
}