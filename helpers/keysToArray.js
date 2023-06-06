export const keysToArray = (object) => {
    let arrayOfKeys = [];

    for(let key in object) {
        arrayOfKeys.push(key);
    }

    let resultArray = arrayOfKeys.map(function(elem, index) {
        return {
            id: index,
            currency: elem
        }
    });

    return resultArray;

}