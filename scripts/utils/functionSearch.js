


/**
 *
 * @param {String} search
 * @returns array
 */
export function  onSearch(search,recipes,options={}){

    // recipes.forEach(elt => {
    //     console.log(elt);
      
    // })
    const result = [];
   const test = recipes.filter(elt => elt.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
   
   result.push(test);

   const toto = recipes.filter(elt => elt.description.toLowerCase().indexOf(search.toLowerCase()) !== -1);
 
   result.push(toto);
   
   result.sort((a,b) => {
        return a.length - b.length;
   } );
   console.log(result[result.length - 1]);

    recipes.forEach(elt => {
        const ingredient = elt.ingredients;
  
        const resultSearch = ingredient.filter(elt => elt.ingredient.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        console.log(resultSearch );
        if(resultSearch.length > 0) {
            result.push(elt);
            
        }
      
        })
        console.log(result);
    
   

    const tab =new Set();
    let recipe = {};


    for(let i = 0; i < recipes.length; i++) {

        recipe = recipes[i];


        for (const key in recipe) {
            if (Object.hasOwnProperty.call(recipe, key)) {
                const element = recipe[key];

                if(options.hasFilter){
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


