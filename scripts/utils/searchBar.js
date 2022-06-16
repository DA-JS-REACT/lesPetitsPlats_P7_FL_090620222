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
        this.filterEvents.initializeFilterEvents();
        const input = document.getElementById('mainSearch');
        input.addEventListener('change',(evt) => {
            this.onSearchChange(evt);
        });
        input.addEventListener('keyup',(evt) => {
            this.onSearchChange(evt);

        });
        const dropdownInput = document.querySelectorAll('.dropdown-input');
        dropdownInput.forEach(el => el.addEventListener('keyup',(event) => {
            this.searchOnFilter(event);
        }));
    }

    onSearchChange(evt) {
        evt.preventDefault();
        const search = evt.target.value.toLowerCase();


        // for  the main search

        // recherche si  article d'erreur existe
        const searchError = this.divError.childElementCount;
        const lastElement = this.divError.lastChild;
        // si oui delete the last child
        if(searchError > 0){
            this.divError.removeChild(lastElement);
        }
        let test = false;
        let newtab = this.onSearch(search);
        console.log(newtab);
        
        if(test){
            console.log('yes');
        }
        if (search.length >= 3 ){

            if(newtab.length > 0){
                test = true;
                 // efface les articles par défault
                this.deleteArticle();
                this.refreshList();
                this.displayFilter(newtab);
                // parcour le tableau des resultats
                for(let j = 0; j < newtab.length; j++) {
                    const card = new Recipes(newtab[j]);
                    this.displayNewCard(card);
                }
            }else if(newtab.length === 0){
                this.deleteArticle();
                // this.refreshList();
                // this.displayFilter(recipes);
                this.displayErrorCard();
                // delete the last element , limmit 1
                if(searchError === 1) {
                    this.divError.removeChild(lastElement);
    
                }

            }


     
           

        }else if(search.length === 0 || search.length < 3 && search.length > 0) {
            newtab.length = 0;
            // this.refreshList();
            // this.displayFilter(recipes);
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
        const input = document.getElementById('mainSearch');

        // if(test) {
        //     input.value=  ' ';
        // }
        console.log(test);
    }

    searchOnFilter(event){

        const value = event.target.value;

        const parent = event.target.closest('.dropdown');
        const ul = parent.querySelector('.list-inline');

        if(value.length > 0){
            ul.innerHTML = '';
        }
       
        console.log(value);
        const newtab = this.onSearch(value);
        const Data = this.filterData.getIngredient(newtab);
        const ingredients = new FilterFactory(Data).displaysearchFilter(ul);
       console.log( Data);
       
        
       
        // if(value.length > 0){
           
        //     li.textContent = value;
        // }
      

    }

    /**
     *
     * @param {String} search
     * @returns
     */
    onSearch(search){
        let tab = [];
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
        this.refreshList();

        const FilterIngredients = document.getElementById('ingredients');
        const ulIngredients = FilterIngredients.querySelector('.list-inline');
       

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
        this.filterEvents.initializeFilterEvents();
        return [ingredients,appliance,ustensils];
    }


    refreshList(){
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

    refreshPage(){
        location.reload(true);

      
        const input = document.getElementById('mainSearch');
        input.value=  ' ';
    }

}

export {SearchBar};