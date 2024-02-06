export default class Background {
  constructor(){
    const button = document.createElement('button');
    button.classList.add('tool-bar-option');
    button.style.position = 'relative';
    document.getElementById('tool-bar').appendChild(button);

    const span = document.createElement('span');
    span.textContent = 'Background';
    button.appendChild(span);

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#ffffff';
    colorPicker.style = 'height: 3rem; width: 6rem;';
    
    const colorPickerLabel = document.createElement('label');
    colorPickerLabel.textContent = 'Custom Color: ';
    colorPickerLabel.style = `font-size: 1.15rem;`;
    
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.appendChild(colorPickerLabel);
    colorPickerContainer.appendChild(colorPicker);
    colorPickerContainer.style = 'display: flex; justify-content: center; align-items: center;'
    
    const colorOptions = document.createElement('div');
    colorOptions.style = `
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      overflow: hidden;
    `;

    this.cells = [];
    const colors = [
      new RGB(255, 150, 150), new RGB(150, 255, 150), new RGB(150, 150, 255),
      new RGB(255, 255, 150), new RGB(255, 150, 255), new RGB(255, 255, 255),
    ];
    
    for(const c of colors){
      const col = document.createElement('div');
      col.style = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `;
      // different shades of color
      for(let i = 0; i <= 5; i++){
        const incr = -30;
        const cell = document.createElement('div');
        const r = Math.floor(c.r + incr*i);
        const g = Math.floor(c.g + incr*i);
        const b = Math.floor(c.b + incr*i);
        cell.style = `
          border-radius: 50%;
          padding: 10px;
          margin: 5px;
          border: 1px solid;
          box-sizing: border-box;
          background-color: rgb(${r}, ${g}, ${b});
        `;
        this.cells.push(cell);
        col.appendChild(cell);
      }
      colorOptions.appendChild(col);
    }
    const container = document.createElement('div');
    container.style = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin: 5px auto;
      min-width: 5rem;
      background-color: #bdc1c2;
      border-radius: 10px;
      z-index: 10;
      padding: 5px;
      max-width: fit-content;
    `;

    const themeButton = document.createElement('button');
    themeButton.style = `
      width: 95%; 
      padding: 10px;
      margin: 5px;
      box-sizing: border-box;
      min-height: 3rem;
      font-size: 1.15rem;
      border-radius: 10px;
      border: 1px solid;
      background-color: darkgrey;
    `;
    themeButton.textContent = "Set As Theme";

    const opacitySliderContainer = document.createElement('div');
    opacitySliderContainer.style = `
      display: flex;
      flex-direction: row;
      align-items: center;
    `;
    
    const opacitySliderLabel = document.createElement('label');
    opacitySliderLabel.textContent = 'Opacity: ';

    const opacitySliderWrapper = document.createElement('div');
    opacitySliderWrapper.style = `
      display: flex;
      flex-direction: column;
      width: 100%;
    `;

    const dataList = document.createElement('datalist');
    dataList.id = 'opacity-slider-values';
    dataList.style = `
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0;
      padding: 5px;
      box-sizing: border-box;
      width: 100%;
    `;
    for(let i = 0; i <= 1; i+=0.5){
      const opt = document.createElement('option');
      opt.style = `
        flex: 0;
        text-align: center;
        padding: 0;
      `;
      opt.value = i;
      opt.label = i;
      dataList.appendChild(opt);
    }
    
    const opacitySlider = document.createElement('input');
    opacitySlider.type = 'range';
    opacitySlider.max = 1;
    opacitySlider.step = 0.05;
    opacitySlider.value = 1;
    opacitySlider.style = 'width: 100%;';
    opacitySlider.setAttribute('list', 'opacity-slider-values');

    opacitySliderWrapper.appendChild(opacitySlider);
    opacitySliderWrapper.appendChild(dataList);
    
    opacitySliderContainer.appendChild(opacitySliderLabel);
    opacitySliderContainer.appendChild(opacitySliderWrapper);
    
    //appending to main container
    container.classList.add('hidden');
    container.appendChild(colorPickerContainer);
    container.appendChild(colorOptions);
    container.appendChild(themeButton);
    container.appendChild(opacitySliderContainer);
    
    //toggle dropdown
    button.addEventListener('click', e => {
      e.stopPropagation();
      if(e.target == button || e.target == span)
        container.classList.toggle('hidden');
    });
    document.addEventListener('click', e => {
      if(!container.classList.contains('hidden'))
        container.classList.add('hidden');
    });
    button.appendChild(container);

    this.button = button;
    this.colorPicker = colorPicker;
    this.container = container;
    this.themeButton = themeButton;
  }
}

class RGB {
  constructor(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
}