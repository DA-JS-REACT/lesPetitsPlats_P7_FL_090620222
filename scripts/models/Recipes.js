class Recipes {
    constructor(data) {

        this._id = data.id;
        this._name = data.name;
        this._servings= data.servings;
        this._ingredients = data.ingredients;
        this._time = data.time;
        this._description = data.description;
        this._appliances = data.appliances;
        this._ustensils = data.ustensils;


    }

    get id() {
        return this._id;
    }

    get name() {
        if(this._name.length > 35) {
            return this._name.slice(0, 30) + ' ...';
        }else {
             return this._name;
        }

    }

    get servings() {
        return this._servings;
    }

    get ingredients() {
        // this._ingredients.forEach(element => {
        //     console.log('yes',element);
        // });
        // for(let i=0; i < this._ingredients.length; i++){
        //     if (this._ingredients[i].hasOwnProperty('unit')) {
        //         this._ingredients = this._ingredients[i];

        //     }
        // }   
        // console.log(this._ingredients);
        return this._ingredients;


    }

    get time() {
        return this._time;
    }
    get description() {
        if(this._description.length >200){
            return this._description.slice(0,180) + ' ...';
        }
        return this._description;
    }

    get appliances() {
        return this._appliances;
    }
    get ustensils() {
        return this._ustensils;
    }
}

export { Recipes };