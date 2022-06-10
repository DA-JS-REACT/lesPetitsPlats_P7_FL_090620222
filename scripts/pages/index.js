import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';
import {FilterFactory} from '../factories/filterFactory.js';
import {FilterData} from '../utils/filterData.js';
import {SearchBar} from '../utils/searchBar.js';

class Home {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');
        this.filterData = new FilterData();
        this.searchBar = new SearchBar();
    }


    displayCard(recipes) {
        const articleModel = new CardFactory(
            recipes.id,
            recipes.name,
            recipes.servings,
            recipes.ingredients,
            recipes.time,
            recipes.description,
            recipes.appliance,
            recipes.ustensils
        );
        const cardDom = articleModel.getCard();
        this.articleDiv.appendChild(cardDom);

    }

    displayFilter(){
        const filter = document.querySelector('.search__filter');
        const ingredientsData = this.filterData.getIngredient(recipes);
        const applianceData = this.filterData.getAppliance(recipes);
        const ustensilsData = this.filterData.getUstensils(recipes);
   

        const ingredients= new FilterFactory(ingredientsData).getFilter({hasIngredients:true});
        const appliance = new FilterFactory(applianceData).getFilter({hasAppareils:true});
        const ustensils = new FilterFactory(ustensilsData).getFilter({hasUstensils:true});
        filter.appendChild(ingredients);
        filter.appendChild(appliance);
        filter.appendChild(ustensils);
    }

    init() {
        for(let i = 0; i < recipes.length; i++) {
            const card = new Recipes(recipes[i]);
            this.displayCard(card);
        }

        this.displayFilter();
        this.searchBar.initializeSearch();
    }
}

const home = new Home();
home.init();