import Slide from './Slide.js';
import Toolbar from './Toolbar.js';

export default class SlideManager {
  constructor(){
    this.slides = [];
    this.theme = '#a6c5c9';
    
    //slide elements
    this.slidesList = document.getElementById('slides-list');
    this.canvas = document.getElementById('slide-canvas');
    this.currentSlideElement = document.getElementById('current-slide');
    this.slideWrapper = document.getElementById('current-slide-wrapper');
    this.toolBarOptions = []; //TODO - Tool bar options
    
    //scaling
    const w = document.getElementById('slide-container').offsetWidth;
    const h = document.getElementById('slide-container').offsetHeight;
    const container = this.currentSlideElement;
    this.scale = {
      x: w / container.clientWidth * 0.9,
      y: h / container.clientHeight * 0.9,
      baseX: w / container.clientWidth,
      baseY: h / container.clientHeight,
    };

    this.scaleCurrentSlide();
    
    document.querySelector('#zoom-button input[type=number]').addEventListener('input', e => {
      const val = e.target.value;
      if(val > 15){
        this.scale.x = this.scale.baseX * val/100*0.9;
        this.scale.y = this.scale.baseY * val/100*0.9;
        this.scaleCurrentSlide();
      }
    });
    
    //first slide
    this.currentSlide = 0;
    this.addSlide();

    //add slide button
    this.addSlideButton = document.getElementById('add-slide');
    this.addSlideButton.addEventListener('click', e => {
      this.addSlide();
    });

    setInterval(() => {
      this.updatePreview(this.slides[this.currentSlide]);
    }, 1000);

    this.toolbar = new Toolbar(this);
  }

  //scale current slide
  scaleCurrentSlide(){
    const scale = Math.min(this.scale.x, this.scale.y);
    this.slideWrapper.style.width = (965*scale)+'px';
    this.slideWrapper.style.height = (545*scale)+'px';
    this.currentSlideElement.style.transform = `scale(${scale})`;
  }
  
  //add slide
  addSlide(){
    const { currentSlide, slides, slidesList } = this;
    const slide = new Slide();
    slide.html.style.background = this.theme;
    if(slides.length > 0)
      this.deselectSlide(currentSlide);
    if(slides.length > 0)
      slides[currentSlide].previewHTML.after(slide.previewHTML);
    else
      slidesList.appendChild(slide.previewHTML);
    slides.splice(currentSlide, 0 , slide);
    this.currentSlide = slides.indexOf(slide);
    this.selectSlide(currentSlide);
    this.updatePreview(slide);
    
    //enable selecting different slide on click
    slide.previewHTML.addEventListener('click', e => {
      this.deselectSlide(this.currentSlide);
      this.currentSlide = this.slides.indexOf(slide);
      this.selectSlide(this.currentSlide);
    });
  }

  //select slide
  selectSlide(index){
    const slide = this.slides[index];
    slide.previewHTML.classList.add('selected');
    for(const c of this.currentSlideElement.children)
      c.remove();
    this.currentSlideElement.appendChild(slide.html);
  }

  //deselect slide
  deselectSlide(index){
    const slide = this.slides[index];
    slide.previewHTML.classList.remove('selected');
  }

  //update preview
   updatePreview(slide) {
    const preview = slide.previewHTML;
    const content = this.currentSlideElement;

    if(preview.children.length > 1)
      preview.lastChild.remove();
     
    const scale = Math.min(
      preview.clientWidth / content.clientWidth,    
      preview.clientHeight / content.clientHeight,
    );

    const clone = this.currentSlideElement.cloneNode(true);
    clone.id = '';
    preview.appendChild(clone);
    clone.style.transform = `scale(${scale})`;
    clone.style.width = 'calc(100% / '+scale+')';
    preview.style.height = (content.clientHeight * scale)+'px';
    preview.style.background = getComputedStyle(clone.lastChild).background;
    clone.style.border = 'none';
  }
}