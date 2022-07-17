const checkbox = document.querySelectorAll('input[type="checkbox"]');

chrome.storage.local.get(['modal'], (res) => {
    const checkbox = document.querySelector('input[data="modal"]');

    if (res.modal === true) {
        checkbox.setAttribute('checked', '');
    } else {
        checkbox.removeAttribute('checked');
    }
})

const checkBox = (evt) => {
    let isChecked = evt.target.hasAttribute('checked');

    if (isChecked) {
        evt.target.removeAttribute('checked');
        isChecked = !isChecked;
    } else {
        evt.target.setAttribute('checked', '');
        isChecked = !isChecked;
    }
    chrome.storage.local.set({ modal: isChecked });
}

checkbox.forEach((checkbox) => {
    checkbox.addEventListener('click', (evt) => {
        checkBox(evt);
    })
})