class StateSearch {
    constructor(key= 0,value= []){

        this._key = key;
        this._value = value;
        this.cache =  new Map();
    }



    get key() {
        return this._key;
    }
    get value() {
        return this._value;
    }

    set key(key) {
        this._key = key;
    }

    set value(value) {
        this._value = value;
    }

    getcache(key,value) {

        const cacheData = this.cache.set(this._key,this._value);
        return cacheData;
    }


}
export {StateSearch}