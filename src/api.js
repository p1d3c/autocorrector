const BASE_URL = 'http://speller.yandex.net/services/spellservice.json/checkText?text=';

class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
    }

    _convertText(text) {
        return text.replace(' ', '+');
    }

    checkText(text) {
        const convertedText = this._convertText(text);
        return fetch(this.baseUrl + `${convertedText}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({})
        })
            .then((res) => {
                return this._getResponseData(res);
            })
    }
}

const api = new Api({
    baseUrl: BASE_URL,
    hedaers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
})

export default api;