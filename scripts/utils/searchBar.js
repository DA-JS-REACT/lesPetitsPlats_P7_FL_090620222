import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';
import {FilterData} from '../utils/filterData.js';
import {FilterFactory} from '../factories/filterFactory.js';
import {FilterEvent} from '../utils/filterEvent.js';
import {onSearch,onSearchIngredients} from '../utils/functionSearch.js';
import {displayCard , deleteArticle} from '../utils/articleForSearch.js';

class  SearchBar {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');
        this.divError = document.querySelector('.error');
        this.filterData = new FilterData();
        this.filterEvents = new FilterEvent();

    }




    initializeSearch() {
        
        const input = document.getElementById('mainSearch');
        // input.addEventListener('change',(evt) => {
        //     this.onSearchMain(evt);
        // });
        input.addEventListener('keyup',(evt) => {
            this.onSearchMain(evt);

        });
        const dropdownInput = document.querySelectorAll('.dropdown-input');
        dropdownInput.forEach(el => el.addEventListener('keyup',(event) => {
            this.onSearchFilter(event);
        }));
        dropdownInput.forEach(el => el.addEventListener('click',(event) => {
            this.onSearchFilter(event);
        }));

        this.filterEvents.initializeFilterEvents();
    }

    onSearchMain(evt) {
        
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
       
        let newtab = [];

        if (search.length >= 3 ){
            newtab = onSearch(search);
            // console.log(newtab);
            if(newtab.length > 0){

                 // efface les articles par défault
                deleteArticle();

                this.displayFilter(newtab);
                // parcour le tableau des resultats
                for(let j = 0; j < newtab.length; j++) {
                    const card = new Recipes(newtab[j]);
                    displayCard(card);
                }



            }else if(newtab.length === 0){
                deleteArticle();

                this.displayErrorCard();
                // delete the last element , limmit 1
                if(searchError === 1) {
                    this.divError.removeChild(lastElement);
                }
                newtab= [];
                this.displayFilter(recipes);

            }


        }else if(search.length === 0 || search.length < 3 ) {

            newtab = [];
            deleteArticle();
            this.displayFilter(recipes);

            // restore default article
            for(let i = 0; i < recipes.length; i++) {
                const card = new Recipes(recipes[i]);
                displayCard(card);
            }

        }


    }

    onSearchFilter(event){
        
        if(event.type === 'click'){
            console.log(event);
        }
        const value = event.target.value;

        const parent = event.target.closest('.dropdown');

        const ul = parent.querySelector('.list-inline');

        if(event.type === 'click'){
            ul.innerHTML = '';
        }
        const newTab = onSearch(value);
        let tab = [];
        let suggestions = '';

        const nameOnFilter = parent.className.toString().toLowerCase();
        const nameOfFilter = nameOnFilter.split('dropdown--');

        const name = nameOfFilter[1];

        if(value.length > 0){
            newTab.forEach(item => {
                console.log(item);
               if(name != "appliance"){

                for (const element of item[name]) {
                    // const el = name === "ingredients" ? name.split('s')[0] : name.split(' ')[0];

                    const elt = name === "ingredients" ? element.ingredient: element;
                    if(elt.toString().toLowerCase().includes(value)) {

                      tab.push(elt.toLowerCase());

                    }

                }

               }else if (name === "appliance"){
                
                if(item[name].toLowerCase() === value ) {

                    tab.push(item[name].toLowerCase());

                  }
               }

                return tab;
            })

           const uniqueData = this.filterData.gettingDataForFilter(tab);

            if(tab.length > 0) {
                for (const iterator of [...uniqueData]) {

                    suggestions += `<li class="list-inline-item filter__list--li"> ${iterator}</li>`;
                }
            }else {
                suggestions += `<li class="list-inline-item text-white"> Aucune correspondance</li>`;
            }

        }else{
            this.displayFilter(recipes);
        }
        ul.innerHTML = suggestions ;
        this.filterEvents.initializeFilterEvents();


    }


    displayErrorCard() {
       const articleError = new CardFactory().getCardError();
       this.divError.appendChild(articleError);

    }

 

    /**
     * 
     * @param {array} tab 
     * @returns HTML element
     */
    displayFilter(tab){
        this.refreshList();

        const FilterIngredients = document.getElementById('ingredients');
        const ulIngredients = FilterIngredients.querySelector('.list-inline');

        const FilterAppliances = document.getElementById('appliance');
        const ulAppliances = FilterAppliances.querySelector('.list-inline');

        const FilterUstensils = document.getElementById('ustensils');
        const ulUstensils = FilterUstensils.querySelector('.list-inline');


        const ingredientsData = this.filterData.getIngredient(tab);
        const applianceData = this.filterData.getAppliance(tab);
        const ustensilsData = this.filterData.getUstensils(tab);


        const ingredients = new FilterFactory(ingredientsData).displayLiFilter(ulIngredients);
        const appliance = new FilterFactory(applianceData).displayLiFilter(ulAppliances);
        const ustensils = new FilterFactory(ustensilsData).displayLiFilter(ulUstensils);

        // this.filterEvents.initializeFilterEvents();
        console.log(tab);
        let recipe = '';
        // for(let i = 0; i < tab.length; i++){
        //    recipe = tab[i];
       

        // }
       
        console.log(recipe);
        const list = document.querySelectorAll('.filter__list--li');

        list.forEach(item => item.addEventListener('click',(evt) => {

            const li = evt.currentTarget;
            const value = li.textContent.toLowerCase();
            const parent = li.parentElement;

            
            let result = [];
            for (const key in tab) {
                if (Object.hasOwnProperty.call(tab, key)) {
                    const element = tab[key];
                    result = onSearchIngredients(element,value,{hasFilter: true});
                   console.log(element);
                   console.log('result',result);
                }
            }
        
         
            

            deleteArticle();

            // parcour le tableau des resultats
            for(let j = 0; j < result.length; j++) {
                const card = new Recipes(result[j]);
                displayCard(card);
            }
            this.displayFilter(result);

        }))

    }


    refreshList(){
        const ul = document.querySelectorAll('.list-inline');
        ul.forEach(element => {
            element.innerHTML = '';
        })

    }


    refreshPage(){
        location.reload(true);

      
        const input = document.getElementById('mainSearch');
        input.value=  ' ';
    }

}

export {SearchBar};