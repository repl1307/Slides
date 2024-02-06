import Background from './toolbarOptions/Background.js';
import Text from './toolbarOptions/Text.js';
import utils from './Utils.js';

export default class Toolbar {
  constructor(slideManager){
    this.slideManager = slideManager;
    this.background = new Background();
    this.text = new Text();

    const sm = this.slideManager;
    //custom color
    this.background.colorPicker.addEventListener('input', e => {
      sm.currentSlideElement.lastChild.style.background = this.background.colorPicker.value;
      sm.updatePreview(sm.slides[sm.currentSlide]);
      console.log(this.background.colorPicker.value);
    });

    //premade palettes
    this.selectedCell = null;
    this.background.cells.forEach(c => {
      c.addEventListener('click', e => {
        const style = getComputedStyle(c);
        const rgb = utils.stringToRgb(style.backgroundColor);
        this.background.colorPicker.value = utils.rgbToHex(rgb.r, rgb.g, rgb.b);
        sm.currentSlideElement.lastChild.style.background = style.background;
        sm.updatePreview(sm.slides[sm.currentSlide]);
        if(this.selectedCell)
          this.selectedCell.classList.remove('selected-border');
        this.selectedCell = c;
        this.selectedCell.classList.add('selected-border');
      });
    });

    //set color as theme
    this.background.themeButton.addEventListener('click', e => {
      sm.slides.forEach(slide => {
        const background = getComputedStyle(sm.currentSlideElement.lastChild).background;
        slide.html.style.background = background;
        sm.updatePreview(slide);
        sm.theme = background;
      });
    });
    
    //presentation title;
    document.title = 'Slides - '+document.querySelector('#name-options input[type=text]').value;
    document.querySelector('#name-options input[type=text]').addEventListener('input', e => {
      document.title = 'Slides - '+e.target.value;
    });

    
  }
}