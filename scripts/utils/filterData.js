

class  FilterData {

    constructor() {
        this.dataIngredients = new Set();
        this.dataAppliance = new Set();
        this.dataUstensils = new Set();
        // this.ingredient = new Set();
    }


gettingDataForFilter(data) {

    const filter  = new Set(data);
    for (const item of [...filter]) {
       
    }
   return filter ;
}


/**
 *
 * @param {array} recipes
 * @returns Objects with Set();
 */
getIngredient(recipes) {

    this.dataIngredients = new Set();
    for (const element of recipes) {
        for (const result of element['ingredients']) {
            this.dataIngredients.add(result['ingredient'])
        }
    }

    return this.dataIngredients;


}

/**
 *
 * @param {array} recipes
 * @returns Objects with Set();
 */
getAppliance(recipes) {
    this.dataAppliance = new Set();
    for (const element of recipes) {
        const result = element['appliance'];
        this.dataAppliance.add(result);
    }

    return this.dataAppliance;

 }

/**
 *
 * @param {array} recipes
 * @returns Objects with Set();
 */
getUstensils(recipes) {
    this.dataUstensils = new Set();
    for (const element of recipes) {
        for (const result of element['ustensils']) {
            this.dataUstensils.add(result);

        }
    }

    return this.dataUstensils;
 }


}

export {FilterData};