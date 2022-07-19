import {TagFactory} from '../factories/tagFactory.js';
import {onSearch, onSearchIngredients} from '../utils/functionSearch.js';
import {displayFilter,refreshList} from '../utils/functionFilter.js';
import {displayCard,refreshArticle, deleteArticle} from '../utils/articleForSearch.js';
import {StateSearch} from '../models/StateSearch.js';
import { StateTag } from '../models/StateTag.js';
import {recipes} from '../data/recipes.js';

import {FilterFactory} from '../factories/filterFactory.js';
import {FilterData} from '../utils/filterData.js';

class FilterEvent {
    constructor () {
        this.tag = new TagFactory();
        this.state = new StateSearch();
        this.stateTag = new StateTag();
        this.cacheData = new Map();
        this.cacheValue = new Map();
        this.cacheTag = [];
        this.cacheNumberOfTag = this.cacheTag.push(this.stateTag.numberTag);
        this.cacheSearchData = this.cacheData.set(this.state.key,this.state.value);
        this.cacheSearchValue = this.cacheValue.set(this.state.key,this.state.value);
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

        const tagClose = document.querySelector('.search__tag');
        tagClose.addEventListener('click',(evt) => {
            this.hasCloseTag(evt);
        })



    }


    onClicklist(evt) {

        const li = evt.target;

        const value = li.textContent;
        //récupère le parent ul
        const parent = evt.currentTarget;

        this.displayTag(parent,value);

      // effectuer une recherche
      this.search(value);
     


        const  buttonLi = document.querySelectorAll('.li-button');
        buttonLi.forEach(button => {
          for (const iterator of this.cacheSearchValue) {

             if(iterator.includes(button.textContent)){
              button.classList.add('disabled');
              button.setAttribute('disabled','');
              button.setAttribute('title','vous l\'avez déjà séléctionner');
             }
          }

        })

    
        // console.log('data',this.cacheSearchData);
        // console.log('value',this.cacheSearchValue);

    }
    displayTag(parent,value) {


        // cherche le nom de la classe du  filtre cliquer
        const nameOnFilter = parent.className.toString().toLowerCase();

        const nameOfFilter = nameOnFilter.split('list--');


        const name = nameOfFilter[2];


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
        const tag  = this.tag.tag(value,this.cacheTag,options);

        divTag.appendChild(tag);


        //! test
        // ajoute que 2 tag
        // const firstChild = divTag.firstChild;
        // if(divTag.childElementCount > 2){
        //     divTag.removeChild(lastChild);
        //     // refreshArticle(newtab);
        //     // displayFilter(newtab);

        // }

        // console.log('data',this.cacheSearchData);
        // console.log('value',this.cacheSearchValue);
        this.stateTag.numberTag++;
    
        this.cacheNumberOfTag = this.cacheTag.push(this.stateTag.numberTag);
        console.log('tag',this.cacheTag);

    }

    whenCloseTag(button) {


        this.cacheNumberOfTag = this.cacheTag.pop();
        console.log('end',this.cacheTag);
        const idButton = button.getAttribute('id');

        const id =  parseInt(idButton);

         const valueButton = button.textContent;
         const  buttonLi = document.querySelectorAll('.li-button');
         buttonLi.forEach(button => {
           for (const iterator of this.cacheSearchValue) {

              if(iterator.includes(valueButton)){
                if(button.textContent === valueButton){
                    button.classList.remove('disabled');
                    button.removeAttribute('disabled','');
                    button.removeAttribute('title','vous l\'avez déjà séléctionner');
                }

              }
           }

         });


        // fermeture d'un tag retour à la derniére recherche

        let toto = [];
        if(this.cacheTag.length === 0){
            this.cacheSearchValue.clear();
           this.cacheSearchData.clear();
           this.cacheTag = [];
            this.search(valueButton);
        }

        console.log('before', this.cacheSearchData);
        // @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
        // permet de récuperer la clé dans le cache des valeurs afin de pouvoir supprimer dans les data 
         const key = this.cacheSearchValue[Symbol.iterator]();
         for (const iterator of key) {
              if(iterator.includes(valueButton)){
                  console.log(iterator[0]);
                  this.cacheSearchData.delete(iterator[0]);
                  this.cacheSearchValue.delete(iterator[0]);
                  console.log('delete data', this.cacheSearchData);
                  console.log('delete', this.cacheSearchValue);
              }
        }
        const iteratorOfvalue = this.cacheSearchValue.entries();
        const defaultValue = iteratorOfvalue.next().value;


        if(this.cacheTag.length === 1){
           toto = recipes;


        }else if(this.cacheTag.length === 2){
            const firstValue = iteratorOfvalue.next().value;
            toto = onSearch(firstValue[1] ,recipes,{hasFilter:true});

        }else if (this.cacheTag.length >= 2){


        }

      
        // for(let i = 0; i < this.cacheSearchData.size;i++){
        //     console.log(this.cacheSearchData.get(i+1));
        // }
      
        // const test = this.cacheSearchData.entries();
        // console.log(test.next().value);
        // console.log(test.next().value);
       
        console.log('del', this.cacheSearchData);
        console.log(toto);
        refreshArticle(toto);
        displayFilter(toto);
      

    }

    search(value) {
         // effectuer une recherche
      const newtab = onSearch(value,recipes,{hasFilter:true});
      // actualiser les filtres et articles

          //stocker la recherche
          this.state.value = newtab;
          this.state.key++;
          this.cacheSearchData = this.cacheData.set(this.state.key,this.state.value);
          this.cacheSearchValue = this.cacheValue.set(this.state.key,value);

      // effectuer une autre recherche à partir de la precedente
      const key = this.state.key === 1  ? this.state.key  : this.state.key -1;
      const nextSearch = onSearch(value,this.cacheSearchData.get(key),{hasFilter:true});
      this.state.value = nextSearch;
      this.cacheSearchData = this.cacheData.set(this.state.key,this.state.value);

      // actualiser les filtres et articles
      refreshArticle(nextSearch);
      displayFilter(nextSearch);

    }

    hasCloseTag(evt){
        const tag = evt.target;
        const button = tag.closest('.tag');
        this.whenCloseTag(button);

        button.remove();

    }

}


export {FilterEvent};