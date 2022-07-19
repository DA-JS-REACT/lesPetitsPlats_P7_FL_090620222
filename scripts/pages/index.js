import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';
import {FilterFactory} from '../factories/filterFactory.js';
import {FilterData} from '../utils/filterData.js';
import {SearchBar} from '../utils/searchBar.js';
import {FilterEvent} from '../utils/filterEvent.js';
import {TagFactory} from '../factories/tagFactory.js'
import {test} from '../utils/tag.js';

class Home {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');
        this.filterData = new FilterData();
        this.searchBar = new SearchBar();
        this.filterEvents = new FilterEvent();
        this.tag = new TagFactory();
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
    displayFilterHome(){
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
        
        recipes.sort((a,b) => {
          return  a.name.toLowerCase().localeCompare(b.name);
        });
        for(let i = 0; i < recipes.length; i++) {
            const card = new Recipes(recipes[i]);
            this.displayCard(card);
        }

        this.displayFilterHome();
        this.searchBar.initializeSearch();
        this.filterEvents.initializeFilterEvents();
   
       

    }
}

const home = new Home();
home.init();