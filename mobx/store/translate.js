import { makeAutoObservable, toJS } from "mobx";


class Translate {

    languages = [];
    currentLanguage = "";

    constructor() {
        makeAutoObservable(this);
    }

    loadLanguages () {
        fetch('https://gist.githubusercontent.com/AliakseiMalinouski/4e15397f931d9aa01cbbf46ac8fcc966/raw/556883d0ea331b1eff75372fde7c15bec7944b1c/lngConverter')
        .then(response => response.ok ? response.json() : this.createError('download data'))
        .then(data => this.languages = data)
        .catch(error => this.createError('parse data'));
    }

    createError(type) {
        alert(`Error with ${type}`);
    }

    setLanguage (language) {
        this.currentLanguage = language;
    }

    getCurrentLanguage () {
        if(this.currentLanguage !== "") {
            return this.currentLanguage;
        } else {
            this.setLanguage('en');
            return 'en';
        }
    }
}

export default new Translate();