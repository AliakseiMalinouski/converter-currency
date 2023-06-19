import { makeAutoObservable } from "mobx";
import { toJS } from "mobx";
import { keysToArray } from "@/helpers/keysToArray";

class Currency {

    standartValute = {};

    arrayKeys = [];

    pair = {}

    error = {};

    amount = null;

    resultAfterPair = {
        counting: null,
        from: "",
        to: "",
        state: false, 
        price: ""
    };

    constructor() {
        makeAutoObservable(this);
    }

    doStandartRequest(currency) {
        console.log(currency)
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

    doPairRequest(firstValute, secondValute, amount) {
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
            this.amount = amount;
            this.mathPairAmount(data, amount);
        })
        .catch(error => {
            this.error = this.createError(404, 'Error in the pair currency enquiry', 'Pair', [firstValute, secondValute], error);
        })
    }

    doMockRequest (randomCurrency) {
        fetch(`https://v6.exchangerate-api.com/v6/5f6c169eb629a374b98a6f66/latest/${randomCurrency}`)
        .then(response => {
            if(response.ok) return response.json();
            else this.createError(404, 'Failed mock request', 'Mock', randomCurrency);
        })
        .then(data => {
            let array = keysToArray(toJS(data.conversion_rates));
            this.arrayKeys = array;
        })
        .catch(error => this.createError(404, 'Failed mock request', 'Mock', randomCurrency))
    }

    createError(status, text, type, currency, error) {
        alert("Error with download data");
        console.log({
            status: status || 404,
            text: text || 'Error with download data',
            type: type || 'Request',
            currency: Array.isArray(currency) ? currency.join(",") : currency || 'No currency',
            error: error
        })
        return {
            status: status || 404,
            text: text || 'Error with download data',
            type: type || 'Request',
            currency: Array.isArray(currency) ? currency.join(",") : currency || 'No currency'
        }
    }

    mathPairAmount (data, amount) {
        let {
            conversion_rate,
            base_code,
            target_code
        } = data;

        let result = {
            counting: amount * conversion_rate,
            from: base_code,
            to: target_code,
            state: true, 
            price: conversion_rate
        }
        this.resultAfterPair = toJS(result);

    }

    closeResult (newState) {
        this.resultAfterPair.state = !newState;
    }
}

export default new Currency();