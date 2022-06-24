import {recipes} from '../data/recipes.js';
import {FilterData} from '../utils/filterData.js';
import {FilterFactory} from '../factories/filterFactory.js';


let tab =new Set();
let filterData = new FilterData();
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
                if(key === 'name'){
                      // recherche dans tout les éléments des recettes et convertit tout en string
                if(element.toString().toLowerCase().includes(search.toLowerCase())) {
                    // si ok stock dans le tableau
                    tab.add(recipe);
                }
                }

            }
            if(key === 'ingredients') {
                onSearchIngredients(recipe,search);
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
                console.log('loop ok',elt);


            }

         }

    }
    return [...tab];
}

 /**
     * 
     * @param {array} tab 
     * @returns HTML element
     */
 export function displayFilter(tab){
    const ul = document.querySelectorAll('.list-inline');
    ul.forEach(element => {
        element.innerHTML = '';
    })


    const FilterIngredients = document.getElementById('ingredients');
    const ulIngredients = FilterIngredients.querySelector('.list-inline');

    const FilterAppliances = document.getElementById('appliance');
    const ulAppliances = FilterAppliances.querySelector('.list-inline');

    const FilterUstensils = document.getElementById('ustensils');
    const ulUstensils = FilterUstensils.querySelector('.list-inline');


    const ingredientsData = filterData.getIngredient(tab);
    const applianceData = filterData.getAppliance(tab);
    const ustensilsData = filterData.getUstensils(tab);


    const ingredients = new FilterFactory(ingredientsData).displayLiFilter(ulIngredients);
    const appliance = new FilterFactory(applianceData).displayLiFilter(ulAppliances);
    const ustensils = new FilterFactory(ustensilsData).displayLiFilter(ulUstensils);

}


