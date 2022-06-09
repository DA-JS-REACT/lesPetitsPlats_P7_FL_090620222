import {Recipes} from '../models/Recipes.js';

class  FilterData {

    constructor() {
        this.dataIngredients = new Set();
        this.dataAppliance = new Set();
        this.dataUstensils = new Set();
    }


/**
 *
 * @param {array} recipes
 * @returns Objects with Set();
 */
getIngredient(recipes) {

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

    for (const element of recipes) {
        for (const result of element['ustensils']) {
            this.dataUstensils.add(result);

        }
    }

    return this.dataUstensils;
 }


}

export {FilterData};