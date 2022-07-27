


/**
 *
 * @param {String} search
 * @returns array
 */
export function  onSearch(search,recipes,options={}){


    const tab = new Set();

    if(options.hasFilter){
        // By Ingredient
        recipes.forEach(recipe => {
            const ingredient = recipe.ingredients;

            const serachByIngredient = ingredient.filter(elt => elt.ingredient.toLowerCase().indexOf(search.toLowerCase()) !== -1);

            if(serachByIngredient.length > 0){

                tab.add(recipe);
            }

        });

        // By Appliance
        const searchByAppliance = recipes.filter(elt => elt.appliance.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        searchByAppliance.forEach(recipe => {
            tab.add(recipe);
        });

        // By Ustensils
        recipes.forEach(recipe => {
            const ustensils = recipe.ustensils;
            const searchByUstensils = ustensils.filter(elt => elt.toLowerCase().indexOf(search.toLowerCase()) !== -1);
            if(searchByUstensils.length > 0){
                tab.add(recipe);
            }

        });



    }else {


        // By name
        const searchByName = recipes.filter(elt => elt.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);

        searchByName.forEach(recipe => {
            tab.add(recipe);
        });


        // By description
        const searchByDescription = recipes.filter(elt => elt.description.toLowerCase().indexOf(search.toLowerCase()) !== -1);

        searchByDescription.forEach(recipe => {
            tab.add(recipe);
        });

        // by Ingredient
        recipes.forEach(recipe => {
            const ingredient = recipe.ingredients;

            const serachByIngredient = ingredient.filter(elt => elt.ingredient.toLowerCase().indexOf(search.toLowerCase()) !== -1);

            if(serachByIngredient.length > 0){

                tab.add(recipe);
            }

        });

    }


   


    // const tab =new Set();
    // let recipe = {};


    // for(let i = 0; i < recipes.length; i++) {

    //     recipe = recipes[i];


    //     for (const key in recipe) {
    //         if (Object.hasOwnProperty.call(recipe, key)) {
    //             const element = recipe[key];

    //             if(options.hasFilter){
    //                 if(key === 'ingredients') {
    //                     if(onSearchIngredients(recipe,search)){
    //                         tab.add(recipe);
    //                     }

    //                 }
    //                 if(key === 'ustensils') {
    //                     if(onSearchUstensils(recipe,search)){
    //                         tab.add(recipe);
    //                     }

    //                 }
    //                 if(key === 'appliance') {
    //                     if(onSearchAppliance(recipe,search)){
    //                         tab.add(recipe);
    //                     }

    //                 }
    //             }else{
    //                 if(key === 'name'|| key === 'description' ){
    //                     // recherche dans tout les éléments des recettes et convertit tout en string
    //                     if(element.toString().toLowerCase().includes(search.toLowerCase())) {
    //                             // si ok stock dans le tableau
    //                             tab.add(recipe);
    //                         }
    //                 }
    //                 if(key === 'ingredients') {
    //                     if(onSearchIngredients(recipe,search)){
    //                         tab.add(recipe);
    //                     }
    
    //                 }

    //             }


    //         }

    //     }

    // }

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


