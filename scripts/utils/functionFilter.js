import {FilterData} from '../utils/filterData.js';
import {FilterFactory} from '../factories/filterFactory.js';



const filterData = new FilterData();


/**
     * 
     * @param {array} tab 
     * @returns HTML element
     */
 export function displayFilter(tab){


    refreshList();


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

export function refreshList(){
        const ul = document.querySelectorAll('.list-inline');
        ul.forEach(element => {
            element.innerHTML = '';
        })

    }
