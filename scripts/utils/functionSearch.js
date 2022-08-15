


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



    return [...tab];

}


