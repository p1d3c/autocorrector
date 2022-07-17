import api from '../components/api.js';

const form = document.querySelector('.form');
const textArea = document.querySelector('.textarea');
const re = /[,.!?;:()]/;

let changeTimer = false;

const apiRequest = (text, textArray) => {
    api.checkText(text)
    .then((data) => {
        textArray.forEach((incorrect, i) => {
            data.forEach((correct) => {
                if (re.test(incorrect)) {
                    incorrect = incorrect.slice(0, -1)
                }
                if (incorrect === correct.word) {
                    textArray[i] = correct.s[0];
                }
            })
        })
        textArea.value = textArray.join(' ');
    })
    .catch((err) => {
        console.log(err)
    })
}

const handleSubmit = (evt, textArea) => {
    evt.preventDefault();
    const textArray = textArea.value.split(' ');
    apiRequest(textArea.value, textArray);
}

form.addEventListener('submit', (evt) => {
    handleSubmit(evt, textArea);
});

form.addEventListener('keydown', (evt) => {
    if(changeTimer) {
        clearTimeout(changeTimer);
    }
    changeTimer = setTimeout(() => {
        handleSubmit(evt, textArea);
        changeTimer = false;
    }, 750)
})
