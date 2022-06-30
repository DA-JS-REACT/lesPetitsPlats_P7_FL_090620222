import {recipes} from '../data/recipes.js';



// || key === 'description'

/**
 *
 * @param {String} search
 * @returns array
 */
export function  onSearch(search,options={}){

    const tab =new Set();
    let recipe = {};
   

    for(let i = 0; i < recipes.length; i++) {

        recipe = recipes[i];
       

        for (const key in recipe) {
            if (Object.hasOwnProperty.call(recipe, key)) {
                const element = recipe[key];
              
                if(options.hasInputFilter){
                    if(key === 'ingredients') {
                        if(onSearchIngredients(recipe,search)){
                            tab.add(recipe);
                        }

                    }
                    if(key === 'ustensils') {
                        if(onSearchUstensils(recipe,search)){
                            tab.add(recipe);
                        }

                    }
                    if(key === 'appliance') {
                        if(onSearchAppliance(recipe,search)){
                            tab.add(recipe);
                        }

                    }
                }else{
                    if(key === 'name'|| key === 'description' ){
                        // recherche dans tout les éléments des recettes et convertit tout en string
                        if(element.toString().toLowerCase().includes(search.toLowerCase())) {
                                // si ok stock dans le tableau
                                tab.add(recipe);
                            }
                    }
                    if(key === 'ingredients') {
                        if(onSearchIngredients(recipe,search)){
                            tab.add(recipe);
                        }
    
                    }

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
    const tab = new Set();

    for(let i = 0; i < recipe['ingredients'].length; i++){
        const ingredients= recipe['ingredients'][i];

         for(const key in ingredients) {
            if (Object.hasOwnProperty.call(tab, key)) {}
                const elt = ingredients[key];

                if(elt.toString().toLowerCase().includes(search.toLowerCase())){
                   return true;

                }

         }

    }
    return false;
}

export function onSearchUstensils(recipe,search){
    for(let i=0;i<recipe['ustensils'].length;i++){

        const ustensils = recipe['ustensils'][i];

        if(ustensils.toLowerCase().includes(search.toLowerCase())){
            return true;
        }

    }
    return false;
}

export function onSearchAppliance(recipe, search) {

    const appliance = recipe['appliance'];
    if(appliance.toLowerCase().includes(search.toLowerCase())){
        return true;
    }

    return false;

}


