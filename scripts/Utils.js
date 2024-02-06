class Utils {
  constructor(){
    this.mouse = {
      x: 0,
      y: 0
    };

    //initialize mouse pos function for Rect class
    document.addEventListener('mousemove', e => {
      const pos = this.getMousePos(document.getElementById('slide-container'), e)
      this.mouse.x = pos.x; 
      this.mouse.y = pos.y;
    });
  }
  getMousePos(elem, e){
    const rect = elem.getBoundingClientRect();
    const scaleX = elem.offsetWidth / rect.width;
    const scaleY = elem.offsetHeight / rect.height; 

    return {
      x: (e.clientX - rect.left) * scaleX, 
      y: (e.clientY - rect.top) * scaleY,
    };
  }
  //convert integar to hexadecimal
  componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  //convert rgb color to hex string
  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }
  //convert rgb string to rgb
  stringToRgb(str){
    const list = str.split(',');
    return {
      r: parseInt(list[0].substring(list[0].indexOf('(')+1, list[0].length)),
      g: parseInt(list[1]),
      b: parseInt(list[2].substring(0, list[2].indexOf(')')))
    };
  }

}

const utils = new Utils();

export default utils;
