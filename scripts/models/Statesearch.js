class StateSearch {
    constructor(status = 0,value= []){

        this._status = status;
        this._value = value;
    }



    get status() {
        return this._status;
    }
    get value() {
        return this._value;
    }

    set status(status) {
        this._status = status;
    }

    set value(value) {
        this._value = value;
    }


}
export {StateSearch}