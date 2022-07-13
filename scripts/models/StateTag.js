class StateTag {
    constructor(key = 0,numberTag = 0){
        this._numberTag = numberTag;
        this._key = key;
    }

    get numberTag(){
        return this._numberTag;
    }


    get key() {
        return this._key;
    }

    set numberTag(numberTag ){
        this._numberTag = numberTag;
    }

    set key(key) {
        this._key = key;
    }

}

export {StateTag};