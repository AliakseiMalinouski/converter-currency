import { makeAutoObservable } from "mobx";


class Currency {

    total = 0;

    constructor() {
        makeAutoObservable(this);
    }

    plus () {
        console.log('eee')
        this.total = this.total + 1;
    }

    minus () {
        this.total = this.total - 1;
    }
}

export default new Currency();