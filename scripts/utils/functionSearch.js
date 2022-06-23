import {recipes} from '../data/recipes.js';


let tab =new Set();
/**
 *
 * @param {String} search
 * @returns array
 */
export function  onSearch(search,options={}){

    tab =new Set();
    let recipe = {};

    for(let i = 0; i < recipes.length; i++) {

        recipe = recipes[i];

        for (const key in recipe) {
            if (Object.hasOwnProperty.call(recipe, key)) {
                const element = recipe[key];

                // recherche dans tout les éléments des recettes et convertit tout en string
                if(element.toString().toLowerCase().includes(search.toLowerCase())) {
                    // si ok stock dans le tableau
                    tab.add(recipe);
                }
            }
            if(key === 'ingredients') {
                onSearchIngredients(recipe,search);
                // for(let i = 0; i < recipe['ingredients'].length; i++){
                //     const ingredients= recipe['ingredients'][i];
            
                //      for(const item in ingredients) {
                //         const elt = ingredients[item];
                //         if(elt.toString().toLowerCase().includes(search.toLowerCase())){
                //             console.log('yes');
                //             tab.add(recipe);
                //         }
                //      }

                // }
            }

        }

    }

    return [...tab];

}

export function onSearchIngredients(recipe,search){
    for(let i = 0; i < recipe['ingredients'].length; i++){
        const ingredients= recipe['ingredients'][i];

         for(const item in ingredients) {
            const elt = ingredients[item];
            if(elt.toString().toLowerCase().includes(search.toLowerCase())){
                tab.add(recipe);
            }
         }

      return [...tab];
    }
}
