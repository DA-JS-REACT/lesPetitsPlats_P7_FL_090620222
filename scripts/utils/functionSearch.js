import {recipes} from '../data/recipes.js';


let tab =new Set();
let data = [ ]

/**
 *
 * @param {String} search
 * @returns array
 */
export function  onSearch(search,data){

    // tab =new Set();
    let recipe = {};
    data = recipes;

    for(let i = 0; i < data.length; i++) {

        recipe = data[i];

        for (const key in recipe) {
            if (Object.hasOwnProperty.call(recipe, key)) {
                const element = recipe[key];
                if(key === 'name' || key === 'description'){
                    // recherche dans tout les éléments des recettes et convertit tout en string
                    if(element.toString().toLowerCase().includes(search.toLowerCase())) {
                            // si ok stock dans le tableau
                            tab.add(recipe);
                        }
                }
                if(key === 'ingredients') {
                    onSearchIngredients(recipe,search);
                }

            }

        }

    }
  

    return [...tab];

}

export function onSearchIngredients(recipe,search,options={}){
    if(options.hasFilter){
        tab =new Set();
    }
   
    for(let i = 0; i < recipe['ingredients'].length; i++){
        const ingredients= recipe['ingredients'][i];

         for(const key in ingredients) {
            if (Object.hasOwnProperty.call(tab, key)) {}
                const elt = ingredients[key];

                if(elt.toString().toLowerCase().includes(search.toLowerCase())){
                    tab.add(recipe);

                }

         }

    }
    // return [...tab];
}

 


