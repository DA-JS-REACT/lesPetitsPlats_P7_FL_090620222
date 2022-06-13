import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';
import {FilterData} from '../utils/filterData.js';
import {FilterFactory} from '../factories/filterFactory.js';
import {FilterEvent} from '../utils/filterEvent.js';

class  SearchBar {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');
        this.filterData = new FilterData();
        this.filterEvents = new FilterEvent();

    }




    initializeSearch() {

        const input = document.getElementById('mainSearch');
        input.addEventListener('change',(evt) => {
            this.onSearchChange(evt,input);
        });
        this.filterEvents.initializeFilterEvents();
    }

    onSearchChange(evt,input) {
        const search = evt.target.value.toLowerCase();

        let tab = [];
        let recipe = '';
        let checkRecipes = true;
        for(let i = 0; i < recipes.length; i++) {

            recipe =recipes[i];
            for (const key in recipe) {
                if (Object.hasOwnProperty.call(recipe, key)) {
                    const element = recipe[key];
                    // recherche dans tout les éléments des recettes et convertit tout en string
                    if(element.toString().toLowerCase().includes(search)) {
                        // si ok stock dans le tableau
                        tab.push(recipe);
                        checkRecipes = true;
                    }
                }


            }

        }
       
       console.log(checkRecipes);
        // efface les articles par défault
        const article = this.articleDiv.querySelectorAll('.card');
        article.forEach(element => {
            this.articleDiv.removeChild(element);
        })

        const filter = document.querySelector('.search__filter');

        const dropdown = filter.querySelectorAll('.dropdown');
        dropdown.forEach(elment => {
            filter.removeChild(elment);
        })



      
              // parcour le tableau des resultats
        for(let j = 0; j < tab.length; j++) {
            const card = new Recipes(tab[j]);
            this.displayNewCard(card);
        }
        this.displayNewFilter(tab,filter);

        if(tab.length === 0) {
            this.displayErrorCard();
        }
        

    }

    displayNewCard(tab) {
        const articleModel = new CardFactory(
            tab.id,
            tab.name,
            tab.servings,
            tab.ingredients,
            tab.time,
            tab.description,
            tab.appliance,
            tab.ustensils
        );

        const newcardDom = articleModel.getCard();
        this.articleDiv.appendChild(newcardDom);

    }

    displayErrorCard() {
       const articleError = new CardFactory().getCardError();
       this.articleDiv.appendChild(articleError);

    }
    displayNewFilter(tab,filter){
        console.log(tab);
      

        const ingredientsData = this.filterData.getIngredient(tab);
        const applianceData = this.filterData.getAppliance(tab);
        const ustensilsData = this.filterData.getUstensils(tab);
   

        const ingredients= new FilterFactory(ingredientsData).getFilter({hasIngredients:true});
        const appliance = new FilterFactory(applianceData).getFilter({hasAppareils:true});
        const ustensils = new FilterFactory(ustensilsData).getFilter({hasUstensils:true});
        filter.appendChild(ingredients);
        filter.appendChild(appliance);
        filter.appendChild(ustensils);
        this.filterEvents.initializeFilterEvents();
    }

}

export {SearchBar};