import { makeAutoObservable } from "mobx";

class Details {

    details = [];

    constructor() {
        makeAutoObservable(this);
    }

    loadDetails (url) {
        fetch(url)
        .then(r => r.ok ? r.json() : createError())
        .then(d => this.details = d)
        .catch(e => createError())
    }

    createError() {
        alert('Error with download');
    }
}

export default new Details();