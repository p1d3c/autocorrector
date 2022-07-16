const body = document.querySelector('body');
let popup = null;
let timer = false;
let isSelection = false;

const checkText = (text) => {
    const getResponseData = (res) => {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
    }

    const convertText = (text) => {
        return text.replace(' ', '+');
    }
    
    const convertedText = convertText(text);

    return fetch('https://speller.yandex.net/services/spellservice.json/checkText?text=' + `${convertedText}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({})
    })
    .then((res) => {
        return getResponseData(res);
    })
}

const fillPopup = (popup, selectedText) => {
    popup.insertAdjacentHTML('afterbegin', `
        <h2 style="margin: 0; padding: 10px">
            ${selectedText}
        </h2>
    `)
}

const createPopup = (selectedElementRect, selectedText) => {
    popup = document.createElement('div');
    popup.classList.add('corrector_popup');
    popup.style.cssText = `
        border: 1px solid grey;
        border-radius: 10px;
        position: fixed;
        top: ${selectedElementRect.bottom + 30}px;
        left: ${selectedElementRect.left - 10}px;
        height: ${selectedElementRect.height + 20}px;
        width: ${selectedElementRect.width + 20}px;
        background-color: white;
        display: flex; 
        justify-content: center; 
        align-items: center;
    `;
    fillPopup(popup, selectedText);
    return popup;
}

const getSelectedText = () => {
    let selectedElementRect = null;
    const selectedText = window.getSelection().toString();

    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(() => {
        timer = false;
        if (selectedText != '' && selectedText) {
            selectedElementRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            if (selectedElementRect.width > 0) {
                let correctText = [];
                checkText(selectedText)
                .then((data) => {
                    if (data.length > 0) {
                        correctText = data.map((correct) => {
                            if (correct.s.length > 1) {
                                return `(${correct.s.join(' ')})`
                            }
                            return correct.s[0];
                        })
                        document
                        .body
                        .appendChild(createPopup(selectedElementRect, correctText.join(' ')));
                    } else {
                        document
                        .body
                        .appendChild(createPopup(selectedElementRect, 'Правильно'));
                    }
                })
            }
        }
    }, 400);

}

const closePopup = (evt, popup) => {
    evt.stopPropagation();
    popup.remove();
}

body.addEventListener('click', (evt) => {
    const popup = document.querySelector('.corrector_popup');
    if (popup) {
        closePopup(evt, popup);
    }
})

document.onselectionchange = getSelectedText;