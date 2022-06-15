import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';
import {FilterData} from '../utils/filterData.js';
import {FilterFactory} from '../factories/filterFactory.js';
import {FilterEvent} from '../utils/filterEvent.js';

class  SearchBar {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');
        this.divError = document.querySelector('.error');
        this.filterData = new FilterData();
        this.filterEvents = new FilterEvent();

    }




    initializeSearch() {

        const input = document.getElementById('mainSearch');
        input.addEventListener('change',(evt) => {
            this.onSearchChange(evt);
        });
        input.addEventListener('keyup',(evt) => {
            this.onSearchChange(evt);

        });
        this.filterEvents.initializeFilterEvents();
    }

    onSearchChange(evt) {
        const search = evt.target.value.toLowerCase();


        // for  the main search

        // recherche si  article d'erreur existe
        const searchError = this.divError.childElementCount;
        const lastElement = this.divError.lastChild;
        // si oui delete the last child
        if(searchError > 0){
            this.divError.removeChild(lastElement);
        }

        let tab = [];
        this.onSearch(tab,search);
        // this.deleteList();
        if (search.length >= 3 && tab.length > 0 ){

            // efface les articles par défault
            this.deleteArticle();

            // this.deleteList();
            this.displayFilter(tab);
                // parcour le tableau des resultats
                for(let j = 0; j < tab.length; j++) {
                    const card = new Recipes(tab[j]);
                    this.displayNewCard(card);
                }
        //     if (tab.length > 0) {
        //         // parcour le tableau des resultats
        //        for(let j = 0; j < tab.length; j++) {
        //            const card = new Recipes(tab[j]);
        //            this.displayNewCard(card);
        //        }
        //        // met à jour les filtres
        //        this.deleteList();
        //        this.displayFilter(tab);
        //        console.log(tab);


        //    }else if (tab.length === 0) {
        //        this.displayFilter(recipes);
        //        this.displayErrorCard();
        //        // delete the last element , limmit 1
        //        if(searchError === 1) {
        //            this.divError.removeChild(lastElement);

        //        }

        //    }
        }else if(search.length >= 3 && tab.length === 0){
            this.deleteArticle();
            // this.displayFilter(recipes);
            this.displayErrorCard();
            // delete the last element , limmit 1
            if(searchError === 1) {
                this.divError.removeChild(lastElement);

            }

        }else if(search.length === 0 || search.length < 3 && search.length > 0) {
            tab.length = 0 ;
            this.displayFilter(recipes);
             // efface les articles par défault
             const article = this.articleDiv.querySelectorAll('.card');
             article.forEach(element => {
                 this.articleDiv.removeChild(element);
             })
 

            // restore default article
            for(let i = 0; i < recipes.length; i++) {
                const card = new Recipes(recipes[i]);
                this.displayNewCard(card);
            }

        }


    }

    /**
     * 
     * @param {String} search
     * @returns
     */
    onSearch(tab,search){
        
        let recipe = '';
        for(let i = 0; i < recipes.length; i++) {

            recipe = recipes[i];
            for (const key in recipe) {
                if (Object.hasOwnProperty.call(recipe, key)) {
                    const element = recipe[key];
                    // recherche dans tout les éléments des recettes et convertit tout en string
                    if(element.toString().toLowerCase().includes(search)) {
                        // si ok stock dans le tableau
                        tab.push(recipe);
                        // const input = document.getElementById('mainSearch');
                        // input.value='';

                    }
                }
            }

        }

        return tab;

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
       this.divError.appendChild(articleError);

    }


    displayFilter(tab){
        this.deleteList();
        const FilterIngredients = document.getElementById('ingredients');
        const ulIngredients = FilterIngredients.querySelector('.list-inline');
        console.log('1',ulIngredients);
        console.log(ulIngredients);

        const childUl = ulIngredients.childElementCount;


        const FilterAppliances = document.getElementById('appareils');
        const ulAppliances = FilterAppliances.querySelector('.list-inline');
        ulAppliances.innerHTML='';

        const FilterUstensils = document.getElementById('ustensils');
        const ulUstensils = FilterUstensils.querySelector('.list-inline');
        // ulUstensils.innerHTML='';

        const ingredientsData = this.filterData.getIngredient(tab);
        const applianceData = this.filterData.getAppliance(tab);
        const ustensilsData = this.filterData.getUstensils(tab);


        const ingredients = new FilterFactory(ingredientsData).displaysearchFilter(ulIngredients);

        const appliance = new FilterFactory(applianceData).displaysearchFilter(ulAppliances);
        const ustensils = new FilterFactory(ustensilsData).displaysearchFilter(ulUstensils);
        console.log(ingredients);

        this.filterEvents.initializeFilterEvents();
        return [ingredients,appliance,ustensils];
    }


    deleteList(){
        const ul = document.querySelectorAll('.list-inline');
        ul.forEach(element => {
            element.innerHTML = '';
        })
    }

    deleteArticle() {
          // efface les articles par défault
          const article = this.articleDiv.querySelectorAll('.card');
          article.forEach(element => {
              this.articleDiv.removeChild(element);
          })
    }

}

export {SearchBar};