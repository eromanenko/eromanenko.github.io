// libs
function $(selector, context) {
  return (context || document).querySelectorAll(selector);
}

function elStyle(el) {
  return (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Helpers
var h = {
  bind: function(el, event, listener, useCapture) {
    if (typeof useCapture === 'undefined') useCapture = false;
    if (el.addEventListener) el.addEventListener(event, listener, useCapture);
    else if (el.attachEvent) el.attachEvent('on' + event, listener);
  },
  unbind: function(el, event, listener, useCapture) {
    if (typeof useCapture === 'undefined') useCapture = false;
    if (el.removeEventListener) el.removeEventListener(event, listener, useCapture);
    else if (el.detachEvent) el.detachEvent('on' + event, listener);
  },
  relative: function(id, dir) {
    var i;
    var rel = [];
    var pos = this.posInMatrix(id);
    if (dir == 'up' || dir == 'down') {
      for (i = 0; i < matrix.length; i++) {
        rel.push(matrix[i][pos.c]);
      }
    } else {
      for (i = 0; i < matrix[pos.r].length; i++) {
        rel.push(matrix[pos.r][i]);
      }
    }
    return rel;
  },
  posInMatrix: function(id) {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] == id) {
          return {
            r: i,
            c: j
          };
        }
      }
    }
    return false;
  },
  create: function(i) {
    var div = document.createElement('div');
    div.setAttribute('data-id', i + 1);
    div.className = 'part' + (i + 1);
    div.style.height = partHeight + 'px';
    div.style.width = partWidth + 'px';
    div.style.background = 'url(./img/' + imgs[i] + ') no-repeat';
    //			div.style.backgroundSize = '100%';//TODO: разобраться с растягиванием фона без соблюдения пропорций
    h.bind(div, touchEvents.touchStart, onTouchStart);
    return div;
  },
  remove: function(i) {
    setTimeout(function() {
      game.removeChild($('.part' + i)[0]);
    }, 300);
  },
  automate: function() {
    var id = getRandomInt(1, imgs.length);
    var dir = directions[getRandomInt(0, 1)];
    //TODO: написать про неповторение движения
    directions.push(directions.shift());
    directions.push(directions.shift());
    move(id, dir);

    if (--shuffle > 0) {
      setTimeout(h.automate, 500);
    }
  }
};

// Supports
var support = {
  touch: (function() {
    'use strict';
    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  })()
};




// Vars
var imgs = [
    '01.jpg',
    '02.jpg',
    '03.jpg',
    '04.jpg',
    '05.jpg',
    '06.jpg',
    '07.jpg',
    '08.jpg',
    '09.jpg'
  ],
  matrix = [],
  sideSize = Math.sqrt(imgs.length),
  sensitive = 50, // отзывчивость на перетаскивание
  touches = {},
  game,
  partHeight,
  partWidth,
  idToClone,
  shuffle = 10; // сколько раз перемешивать при загрузке
var directions = ['up', 'down', 'left', 'right'];
var touchEvents = {
  touchStart: support.touch ? 'touchstart' : 'mousedown',
  touchMove: support.touch ? 'touchmove' : 'mousemove',
  touchEnd: support.touch ? 'touchend' : 'mouseup'
};


// Event Handlers
var isTouchEvent = false;

function onTouchStart(event) {
  var eventTarget = event.target || event.srcElement;
  //TODO: написать про курсор
  eventTarget.style.cursor = 'move';
  eventTarget.style.cursor = 'grabbing';
  eventTarget.style.cursor = '-moz-grabbin';
  eventTarget.style.cursor = '-webkit-grabbing';
  if (event.preventDefault) event.preventDefault();
  else event.returnValue = false;
  isTouchEvent = event.type === 'touchstart';
  var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
  var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);
  touches.startX = touches.currentX = pageX;
  touches.startY = touches.currentY = pageY;
  h.bind(eventTarget, touchEvents.touchMove, onTouchMove);
  h.bind(eventTarget, touchEvents.touchEnd, onTouchEnd);
}

function onTouchMove(event) {
  var eventTarget = event.target || event.srcElement;
  var id = eventTarget.getAttribute('data-id');
  var pageX = isTouchEvent ? event.targetTouches[0].pageX : (event.pageX || event.clientX);
  var pageY = isTouchEvent ? event.targetTouches[0].pageY : (event.pageY || event.clientY);
  touches.currentX = pageX;
  touches.currentY = pageY;
  if (Math.max(Math.abs(pageX - touches.startX), Math.abs(pageY - touches.startY)) <= sensitive) return;
  var verOrHor = (Math.abs(pageX - touches.startX) > sensitive) ? 'hor' : 'ver';
  var incX = (pageX - touches.startX) / Math.abs(pageX - touches.startX),
    incY = (pageY - touches.startY) / Math.abs(pageY - touches.startY);
  var direction;
  if (verOrHor == 'hor') {
    direction = incX < 0 ? 'left' : 'right';
  } else {
    direction = incY < 0 ? 'up' : 'down';
  }

  move(id, direction);
  onTouchEnd(event);

}

function onTouchEnd(event) {
  var eventTarget = event.target || event.srcElement;
  eventTarget.style.cursor = 'move';
  eventTarget.style.cursor = 'grab';
  eventTarget.style.cursor = '-moz-grab';
  eventTarget.style.cursor = '-webkit-grab';
  h.unbind(eventTarget, touchEvents.touchMove, onTouchMove);
  h.unbind(eventTarget, touchEvents.touchEnd, onTouchEnd);
  isTouchEvent = false;
}


function drawMatrix(id, direction) {
  var i;
  var pos = h.posInMatrix(id);
  switch (direction) {
    case 'left':
      matrix[pos.r].push(matrix[pos.r].shift());
      break;
    case 'right':
      matrix[pos.r].unshift(matrix[pos.r].pop());
      break;
    case 'up':
      pos.temp = matrix[0][pos.c];
      for (i = 0; i < matrix.length - 1; i++) {
        matrix[i][pos.c] = matrix[i + 1][pos.c];
      }
      matrix[matrix.length - 1][pos.c] = pos.temp;
      break;
    case 'down':
      pos.temp = matrix[matrix.length - 1][pos.c];
      for (i = matrix.length - 1; i > 0; i--) {
        matrix[i][pos.c] = matrix[i - 1][pos.c];
      }
      matrix[0][pos.c] = pos.temp;
      break;
  }
}

function move(id, direction) {
  var rel = h.relative(id, direction);
  //добавляем элемент, который будет "выезжать"
  var div;
  var inc = 1;
  var arrToMove = [];
  for (var i = 0; i < rel.length; i++) {
    arrToMove.push($('.part' + rel[i])[0]);
  }
  switch (direction) {
    case 'left':
      idToClone = rel[0];
      div = h.create(idToClone - 1);
      div.style.top = elStyle($('.part' + idToClone)[0]).top;
      div.style.left = elStyle(game).width;
      game.appendChild(div);
      drawMatrix(idToClone, 'left');
      inc = -1;
      break;
    case 'right':
      idToClone = rel[rel.length - 1];
      div = h.create(idToClone - 1);
      div.style.top = elStyle($('.part' + idToClone)[0]).top;
      div.style.left = '-' + partWidth + 'px';
      game.appendChild(div);
      drawMatrix(idToClone, 'right');
      break;
    case 'up':
      idToClone = rel[0];
      div = h.create(idToClone - 1);
      div.style.left = elStyle($('.part' + idToClone)[0]).left;
      div.style.top = elStyle(game).height;
      game.appendChild(div);
      drawMatrix(idToClone, 'up');
      inc = -1;
      break;
    case 'down':
      idToClone = rel[rel.length - 1];
      div = h.create(idToClone - 1);
      div.style.left = elStyle($('.part' + idToClone)[0]).left;
      div.style.top = '-' + partHeight + 'px';
      game.appendChild(div);
      drawMatrix(idToClone, 'down');
      break;
  }
  arrToMove.push(div);
  arrToMove.forEach(function(el, index) {
    if (direction == 'left' || direction == 'right') {
      // написать про транзишн для созданных элементов
      el.style.left = parseFloat(elStyle(el).left) + (inc * partWidth) + 'px';
    } else {
      el.style.top = parseFloat(elStyle(el).top) + (inc * partHeight) + 'px';
    }
  });
  h.remove(idToClone);
}

// Main
window.onload = function() {
  game = $('#game')[0];
  partHeight = parseFloat(elStyle(game).height) / sideSize;
  partWidth = parseFloat(elStyle(game).width) / sideSize;
  for (var i = 0; i < imgs.length; i++) {
    if ((i % sideSize) === 0) {
      matrix.push([]);
    }
    matrix[matrix.length - 1].push(i + 1);
    var div = h.create(i);
    div.style.top = Math.floor(i / sideSize) * partHeight + 'px';
    div.style.left = (i % sideSize) * partWidth + 'px';
    game.appendChild(div);
  }
  h.automate();
};
