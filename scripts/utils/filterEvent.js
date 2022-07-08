import {TagFactory} from '../factories/tagFactory.js';
import {onSearch, onSearchIngredients} from '../utils/functionSearch.js';
import {displayFilter,refreshList} from '../utils/functionFilter.js';
import {displayCard,refreshArticle, deleteArticle} from '../utils/articleForSearch.js';
import {StateSearch} from '../models/StateSearch.js';
import {recipes} from '../data/recipes.js';

import {FilterFactory} from '../factories/filterFactory.js';
import {FilterData} from '../utils/filterData.js';

class FilterEvent {
    constructor () {
        this.tag = new TagFactory();
        this.state = new StateSearch();
        this.cashData = new Map();
        this.cashValue = new Map();
        this.cashSearchData = this.cashData.set(this.state.key,this.state.value);
        this.cashSearchValue = this.cashValue .set(this.state.key,this.state.value);
        this.filterData = new FilterData();

  
    }

    initializeFilterEvents(){
        
        const  launchDropdown = document.querySelectorAll('.launch');

        launchDropdown.forEach(btn => btn.addEventListener('click',(evt) => {
            this.toggleDropdown(evt);
        }));

        const list = document.querySelectorAll('.filter__list--li');

        // list.forEach(item => item.addEventListener('click',(evt) => {

        //     this.onClicklist(evt);
        // }))
        // event by delegation @see https://davidwalsh.name/event-delegate
        const ul = document.querySelectorAll('.list-inline');
        ul.forEach(li => li.addEventListener('click',(evt) => {

           this.onClicklist(evt);
        }))

    }


    onClicklist(evt) {
        // evt.preventDefault();
        const li = evt.target;
        console.log(li);
        const value = li.textContent;
        const parent = li.parentElement;

        // const parentDiv =parent.parentElement;




        // const nameOnFilter =  parentDiv.className.toString().toLowerCase();
        // const nameOfFilter = nameOnFilter.split('dropdown__child--');

        // const name = nameOfFilter[1];
        // const nbrChild = document.querySelector('.search__tag--' + name).childElementCount;

        // const child = nbrChild + 1;
        // console.log('click', nbrChild);

        // refreshList();
    
      // effectuer une recherche
      const newtab = onSearch(value,recipes,{hasFilter:true});
        // actualiser les filtres et articles
       
            //stocker la recherche
            this.state.value = newtab;
            this.state.key++;
            this.cashSearchData = this.cashData.set(this.state.key,this.state.value);
            this.cashSearchValue = this.cashValue.set(this.state.key,value);
      // effectuer une autre recherche à partir de la precedente
      const key = this.state.key === 1  ? this.state.key  : this.state.key -1;
      const nextSearch =  onSearch(value,this.cashSearchData.get(key),{hasFilter:true});
        // actualiser les filtres et articles
        refreshArticle(nextSearch);
        displayFilter(nextSearch);
        // this.newFilter(nextSearch);

      // fermeture d'un tag retour à la derniére recherche



      this.displayTag(parent,value);
   

        console.log('data',this.cashSearchData);
        console.log('value',this.cashSearchValue);
      
    }
    displayTag(parent,value) {


        const parentContainer = parent.parentElement;
        // cherche le nom de la classe du  filtre cliquer
        const nameOnFilter = parentContainer.className.toString().toLowerCase();
        const nameOfFilter = nameOnFilter.split('dropdown__child--');

        const name = nameOfFilter[1];

        let options = '';
        if( name === 'ingredients'){
            options = {hasIngredients:true};
        }else if (name ==='ustensils'){
            options = {hasUstensils:true};
        }else if (name === 'appliance'){
            options = {hasAppareils:true};
        }

        const divTag = document.querySelector('.search__tag--' + name);
        // appel de la tagFactory
        const tag  = this.tag.tag(value,options);

        divTag.appendChild(tag);

        //! test
        // ajoute que 2 tag
        const lastChild = divTag.lastChild;
        // if(divTag.childElementCount > 2){
        //     divTag.removeChild(lastChild);
        //     // refreshArticle(newtab);
        //     // displayFilter(newtab);

        // }

        console.log(this.cashSearchData);
        const nbrChild = document.querySelector('.search__tag--' + name).childElementCount;



       const tagClose = document.querySelectorAll('.tag-close');
        tagClose.forEach(elt => elt.addEventListener('click',(evt) => {

            const tag = evt.currentTarget;
            const button = tag.parentElement;
            console.log(button);
            const div = button.parentElement;
            div.removeChild(button);
            // displayFilter(recipes);
            // refreshArticle(recipes);
            console.log(nbrChild);
            if(nbrChild === 1) {

                displayFilter(recipes);
                refreshArticle(recipes);
            }else if(nbrChild === 2) {
               
                const test = onSearch(this.cashSearchValue.get(1),recipes,{hasFilter:true});
                displayFilter(test);
                refreshArticle(test);
            }


        }))

    }

    newFilter(recipes){

        const filter = document.querySelector('.search__filter');
        
        filter.innerHTML = '';
        const ingredientsData = this.filterData.getIngredient(recipes);
        const applianceData = this.filterData.getAppliance(recipes);
        const ustensilsData = this.filterData.getUstensils(recipes);


        const ingredients= new FilterFactory(ingredientsData).getFilter({hasIngredients:true});

        const appliance = new FilterFactory(applianceData).getFilter({hasAppareils:true});
        const ustensils = new FilterFactory(ustensilsData).getFilter({hasUstensils:true});
        filter.appendChild(ingredients);
        filter.appendChild(appliance);
        filter.appendChild(ustensils);
        const filterEvents = new FilterEvent();
        filterEvents.initializeFilterEvents();
    
        
    }


 
}


export {FilterEvent};