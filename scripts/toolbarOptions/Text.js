export default class Text {
  // elem --> the html slide element the text toolbar option 
  // is referring to
  constructor(){
    this.elem = null;
    
    const container = document.createElement('div');
    container.style = `
      display: none;
      position: relative;
      margin: 0;
      padding: 0;
    `;
    document.getElementById('tool-bar').appendChild(container);

    const fontSizeButton = document.createElement('button');
    fontSizeButton.classList.add('tool-bar-button');
    fontSizeButton.textContent = 'Font Size: ';
    container.appendChild(fontSizeButton);

    const fontSizeInput = document.createElement('input');
    fontSizeInput.type = 'number';
    fontSizeInput.min = '4';
    fontSizeInput.max = '480';
    fontSizeInput.value = '12';
    fontSizeButton.appendChild(fontSizeInput);

    fontSizeInput.addEventListener('input', e => {
      if(!this.elem) return;
      this.elem.style.fontSize = e.target.value + 'px';
    });

    document.getElementById('slide-container').addEventListener('click', e => {
      if(e.target.classList.contains('rect')){
        container.style.display = 'flex';
        this.elem = e.target;
        fontSizeInput.value = parseInt(getComputedStyle(this.elem).fontSize);
      }
      else if(!e.target.classList.contains('notch')){
        container.style.display = 'none';
        this.elem = null;
      }
    });
    
  }
}