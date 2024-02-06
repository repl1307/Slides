import utils from './Utils.js';

export default class Rect {
  static mouse = {
    x: 0, y: 0,
  };
  constructor(x='10px', y='10px', w='100px', h='100px'){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rotation = 0;
    this.dragging = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    };
    //html
    this.html = document.createElement('div');
    this.html.style = `
      top: ${x};
      left: ${y};
      width: ${w};
      height: ${h};
      transform: rotate(${this.rotation}deg);
      padding: 5px;
    `;
    this.html.classList.add('rect');
    this.createNotches();
  }
  setX(x){
    this.x = x;
    this.html.style.left = x;
  }
  setY(y){
    this.y = y;
    this.html.style.top = y;
  }
  setText(text){
    this.html.textContent = '';
    let redLetter = false;
    for(const t of text){
      this.html.innerHTML += `<span style="color: ${redLetter? 'red' : 'black'};">${t}</span>`;
      redLetter = !redLetter;
    }
    this.createNotches();
  }
  createNotches(){
    //grabbable notches
    this.notches = {
      left: new Notch('left', this),
      right: new Notch('right', this),
      bottomRight: new Notch('bottom-right', this),
      bottomLeft: new Notch('bottom-left', this),
      topRight: new Notch('top-right', this),
      topLeft: new Notch('top-left', this),
      top: new Notch('top', this),
      bottom: new Notch('bottom', this),
    };

    for(const notch of Object.values(this.notches)){
      this.html.appendChild(notch.html);
    }

    //click
    this.html.addEventListener('click', e => {
      this.html.contentEditable = 'plaintext-only';
      for(const notch of Object.values(this.notches)){
        notch.html.contentEditable = false;
      }
    });

    //keydown
    this.html.addEventListener('input', e => {
      if(this.html.textContent.length < 1)
        this.html.innerHTML = ' '+this.html.innerHTML;
    });

    //mouse down
    for(const [key, val] of Object.entries(this.notches)){
      this.notches[key].html.addEventListener('mousedown', e => {
        const k = key.toLowerCase();
        if(k.includes('right'))
          this.dragging.right = true;
        else if(k.includes('left'))
          this.dragging.left = true;

        if(k.includes('top'))
          this.dragging.top = true;
        else if(k.includes('bottom'))
          this.dragging.bottom = true;

      });
    }
    //mouse up
    document.addEventListener('mouseup', e => {
      for(const key of Object.keys(this.dragging))
        this.dragging[key] = false;
    });

    //mousemove
    document.addEventListener('mousemove', e => {
      if(this.dragging.right){
        const s = getComputedStyle(this.html);
        const pos = utils.getMousePos(document.body, e);
        const rect = this.html.getBoundingClientRect();
        const xShift = pos.x - (rect.x + rect.width);
        this.html.style.width = (parseFloat(s.width)+xShift)+'px'
      }
      if(this.dragging.left){
        const s = getComputedStyle(this.html);
        const pos = utils.getMousePos(document.body, e);
        const rect = this.html.getBoundingClientRect();
        const xShift = pos.x - (rect.x);
        this.html.style.left = (parseFloat(s.left)+xShift)+'px';
        this.html.style.width = (parseFloat(s.width)-xShift)+'px';
      }
      if(this.dragging.bottom){
        const s = getComputedStyle(this.html);
        const pos = utils.getMousePos(document.body, e);
        const rect = this.html.getBoundingClientRect();
        const yShift = pos.y - (rect.y + rect.height);
        this.html.style.height = (parseFloat(s.height)+yShift)+'px'
      }
      if(this.dragging.top){
        const s = getComputedStyle(this.html);
        const pos = utils.getMousePos(document.body, e);
        const rect = this.html.getBoundingClientRect();
        const yShift = pos.y - (rect.y);
        this.html.style.top = (parseFloat(s.top)+yShift)+'px';
        this.html.style.height = (parseFloat(s.height)-yShift)+'px';
      }
    });
  }
}


//notch class
class Notch {
  // positions: 
  // top-right, top-left, bottom-right, bottom-left
  // top, bottom, left, right
  constructor(position, parent, size=10){
    this.size = size;
    this.position = position;
    this.parent = parent;
    this.html = this.createHTML(this.position);
  }
  createHTML(pos){
    const div = document.createElement('div');
    div.classList.add('notch');
    switch(pos){
      case 'bottom-right':
        div.style.top = 'calc(100% - 5px)';
        div.style.left = 'calc(100% - 5px)';
        div.style.cursor = 'nwse-resize';
      break;
      case 'bottom-left':
        div.style.top = 'calc(100% - 5px)';
        div.style.left = '-5px';
        div.style.cursor = 'nesw-resize';
        break;
      case 'top-right':
        div.style.top = '-5px';
        div.style.left = 'calc(100% - 5px)';
        div.style.cursor = 'nesw-resize';
        break;
      case 'top-left':
        div.style.top = '-5px';
        div.style.left = '-5px';
        div.style.cursor = 'nwse-resize';
        break;
      case 'top':
        div.style.top = '-5px';
        div.style.left = 'calc(50% - 5px)';
        div.style.cursor = 'ns-resize';
        break;
      case 'right':
        div.style.top = 'calc(50% - 5px)';
        div.style.left = 'calc(100% - 5px)';
        div.style.cursor = 'ew-resize';
        break;
      case 'bottom':
        div.style.top = 'calc(100% - 5px)';
        div.style.left = 'calc(50% - 5px)';
        div.style.cursor = 'ns-resize';
        break;
      case 'left':
        div.style.top = 'calc(50% - 5px)';
        div.style.left = '-5px';
        div.style.cursor = 'ew-resize';
      break;
    }
    return div;
  }
}