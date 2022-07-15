const getSelectedText = () => {
    let text = '';
    let selectedElement = null;
    if (window.getSelection) {
        text = window.getSelection().toString();
    }
    
    if (text != '') {
        selectedElement = window.getSelection().getRangeAt(0).getBoundingClientRect();
        console.log(text);
        console.log(selectedElement);
        const popup = document.createElement('div');
        popup.classList.add('corrector_popup');
        console.log(popup);
        popup.style.cssText = `
            border: 2px solid red;
            position: fixed;
            top: ${selectedElement.top - 50}px;
            left: ${selectedElement.left}px;
            height: ${selectedElement.height}px;
            width: ${selectedElement.width}px;
        `
        document.body.appendChild(popup);
    }
}



document.onmouseup = getSelectedText;