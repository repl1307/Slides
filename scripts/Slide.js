import Rect from './Rect.js';

export default class Slide {
  constructor(){
    this.html = this.createSlideHTML();
    this.previewHTML = this.createSlidePreviewHTML();
    this.elements = [];
    const test = new Rect();
    test.setText('This is a test');
    
    this.addElement(test.html);
    const title = new Rect();
    title.setText('Slide Title');
    title.setX('50%');
    title.setY('50%');
    this.addElement(title.html);
  }
  addElement(elem){
    this.elements.push(elem);
    this.html.appendChild(elem);
  }
  createSlideHTML(){
    const background = document.createElement('div');
    background.classList.add('background');
    return background;
  }
  createSlidePreviewHTML(){
    const preview = document.createElement('div');
    preview.classList.add('slide-preview');
    const previewHighlight = document.createElement('div');
    previewHighlight.classList.add('preview-highlight');
    preview.appendChild(previewHighlight);
    return preview;
  }
}