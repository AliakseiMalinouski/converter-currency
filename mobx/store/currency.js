import { makeAutoObservable } from "mobx";
import { toJS } from "mobx";

class Currency {

    standartValute = {};

    pair = {}

    error = {};

    constructor() {
        makeAutoObservable(this);
    }

    doStandartRequest(currency) {
        fetch(`https://v6.exchangerate-api.com/v6/5f6c169eb629a374b98a6f66/latest/${currency}`)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                this.error = this.createError(404, 'Error in the standard currency enquiry', 'Standart', currency);
            }
        })
        .then(data => {
            this.standartValute = toJS(data);
        })
        .catch(error => {
            this.error = this.createError(404, 'Error in the standard currency enquiry', 'Standart', currency);
        })
    }

    doPairRequest(firstValute, secondValute) {
        fetch(`https://v6.exchangerate-api.com/v6/5f6c169eb629a374b98a6f66/pair/${firstValute}/${secondValute}`)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                this.error = this.createError(404, 'Error in the pair currency enquiry', 'Pair', [firstValute, secondValute]);
            }
        })
        .then(data => {
            this.pair = toJS(data);
        })
        .catch(error => {
            this.error = this.createError(404, 'Error in the pair currency enquiry', 'Pair', [firstValute, secondValute]);
        })
    }

    createError(status, text, type, currency) {
        alert("Error with download data");
        return {
            status: status || 404,
            text: text || 'Error with download data',
            type: type || 'Request',
            currency: Array.isArray(currency) ? currency.join(",") : currency || 'No currency'
        }
    }
}

export default new Currency();