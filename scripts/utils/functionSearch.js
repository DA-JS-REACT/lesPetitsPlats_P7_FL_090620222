import {recipes} from '../data/recipes.js';



/**
 *
 * @param {String} search
 * @returns array
 */
export function  onSearch(search){

    let tab = [];
    let recipe = '';
    for(let i = 0; i < recipes.length; i++) {

        recipe = recipes[i];
        for (const key in recipe) {
            if (Object.hasOwnProperty.call(recipe, key)) {
                const element = recipe[key];
                // recherche dans tout les éléments des recettes et convertit tout en string
                if(element.toString().toLowerCase().includes(search.toLowerCase())) {
                    // si ok stock dans le tableau
                    tab.push(recipe);
                }
            }
        }

    }

    return tab;

}
