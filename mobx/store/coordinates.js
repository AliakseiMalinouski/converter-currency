const { makeAutoObservable } = require("mobx");

class Coordinates {

    coordinates = undefined;

    constructor () {
        makeAutoObservable(this);
    }

    setCoordinates (coordinates) {
        this.coordinates = coordinates;
    }

    getCoordinates () {
        if(this.coordinates !== undefined) {
            return this.coordinates;
        }
    }
}

export default new Coordinates();