import {TagFactory} from '../factories/tagFactory.js';
import {onSearch} from './functionSearch.js';
import {displayFilter} from './functionFilter.js';
import {refreshArticle, deleteArticle} from './articleForSearch.js';
import { StateTag } from '../models/StateTag.js';
import {recipes} from '../data/recipes.js';
import {state} from './searchBar.js';
import {CardFactory} from '../factories/cardFactory.js';
import{StateSearch} from '../models/StateSearch.js';


import {FilterData} from './filterData.js';

class SearchEvent {
    constructor () {
        this.tag = new TagFactory();
        this.stateTag = new StateTag();
        this.cacheData = new Set();
        this.cacheValue = new Set();
        this.cacheTag = [];
        this.cacheNumberOfTag = this.cacheTag.push(this.stateTag.numberTag);
        this.filterData = new FilterData();
        this.articleDiv = document.querySelector('.recipes');
        this.divError = document.querySelector('.error');
        this.eventsController = new StateSearch();
        this.Events = new Map();
        this.cacheEvents = this.Events.set(this.eventsController.key, this.eventsController.value);


 
    }

    initializeSearchEvents(){

        const  launchDropdown = document.querySelectorAll('.launch');

        launchDropdown.forEach(btn => btn.addEventListener('click',(evt) => {
            this.toggleDropdown(evt);
        }));

        // event by delegation @see https://davidwalsh.name/event-delegate
        const ul = document.querySelectorAll('.list-inline');
        ul.forEach(li => li.addEventListener('click',(evt) => {

           this.onClicklist(evt);
        }))

        const tagClose = document.querySelector('.search__tag');
        tagClose.addEventListener('click',(evt) => {
            this.hasCloseTag(evt);
        })
        const dropdownInput = document.querySelectorAll('.dropdown-input');
        dropdownInput.forEach(el => el.addEventListener('keyup',(event) => {
            this.onSearchFilter(event);
        }));
        dropdownInput.forEach(el => el.addEventListener('click',(event) => {
            this.onSearchFilter(event);
        }));


        const input = document.getElementById('mainSearch');
        // input.addEventListener('change',(evt) => {
        //     this.onSearchMain(evt);
        // });
        input.addEventListener('keyup',(evt) => {
            this.onSearchMain(evt);

        });

        
    }
    /**
     * search  with main searchBar
     * @param {event} evt
     */
    onSearchMain(evt) {

        this.eventsController.key = evt.type;
        
       
       
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
            newtab = onSearch(search,recipes);
            this.eventsController.value = true;


            if(newtab.length > 0){

                displayFilter(newtab);
                refreshArticle(newtab);
                this.cacheData.add(newtab);
                this.cacheValue.add(search);


            }else if(newtab.length === 0){
                deleteArticle();

                this.displayErrorCard();
                // delete the last element , limmit 1
                if(searchError === 1) {
                    this.divError.removeChild(lastElement);
                }
                newtab= [];
                displayFilter(recipes);
                this.eventsController.value = false;

            }


        }else if(search.length === 0 || search.length < 3 ) {

            newtab = [];
            displayFilter(recipes);
            refreshArticle(recipes);
            if(this.cacheEvents.has('click') === false || this.cacheEvents.get('click')){
                this.cacheData.clear();
                this.cacheValue.clear();
            }

            this.eventsController.value = false;

        }


        this.cacheEvents = this.Events.set(this.eventsController.key, this.eventsController.value);
      

      
    }

    /**
     * only with main search
     */
    displayErrorCard() {
        const articleError = new CardFactory().getCardError();
        this.divError.appendChild(articleError);
 
     }

    /**
     * event when click on the filter
     * @param {Event} evt
     */
    onClicklist(evt) {


        const li = evt.target;

        const value = li.textContent;

        //récupère le parent ul
        const parent = evt.currentTarget;
        this.eventsController.key = evt.type;
        this.eventsController.value= true;
        this.cacheEvents = this.Events.set(this.eventsController.key, this.eventsController.value);

        this.displayTag(parent,value);

        // effectuer une recherche
        this.search(value);


        console.log(this.cacheEvents);



    }
    /**
     * use input on the filter
     * @param {event} event
     */
    onSearchFilter(event){
        // this.cacheData.clear();


        const value = event.target.value;

        const parent = event.target.closest('.dropdown');

        const ul = parent.querySelector('.list-inline');

        if(event.type === 'click'){
            ul.innerHTML = '';
        }

        const newTab = onSearch(value,recipes,{hasFilter:true});

        let tab = [];
        let suggestions = '';

        const nameOnFilter = parent.className.toString().toLowerCase();
        const nameOfFilter = nameOnFilter.split('dropdown--');

        const name = nameOfFilter[1];

        if(value.length > 0){

            for (const item of newTab) {

                if (name === "appliance"){
                    if(onSearchAppliance(item,value)){
                        tab.push(item[name].toLowerCase());
                    }
                }
                // if(name != "appliance"){
                     for(const element of item[name]) {

                        const elt = name === "ingredients" ? element.ingredient: element;


                        if(elt.toString().toLowerCase().includes(value.toLowerCase())) {

                            tab.push(elt.toLowerCase());


                        }

                     }

                //}

            }


           const uniqueData = this.filterData.gettingDataForFilter(tab);


            if(tab.length > 0) {
                for (const iterator of [...uniqueData]) {

                    suggestions += `<li class="list-inline-item filter__list--li text-white"><button class="li-button" type="button">${iterator.charAt(0).toUpperCase() + iterator.substring(1).toLowerCase() }</button></li>`;
                }
            }else {
                suggestions += `<li class="list-inline-item text-white"> Aucune correspondance</li>`;
            }

        }
        ul.innerHTML = suggestions ;
        // console.log(newTab);
        refreshArticle(newTab);




    }

    /**
     *
     * @param {HtmlElement} parent
     * @param {string} value
     */
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
        const tag  = this.tag.tag(value,options);

        divTag.appendChild(tag);




        this.stateTag.numberTag++;
        this.cacheNumberOfTag = this.cacheTag.push(this.stateTag.numberTag);
        // console.log('add',this.cacheTag);

    }

    /**
     *
     * @param {HtmlElement} button
     */
    whenCloseTag(button) {


        this.cacheNumberOfTag = this.cacheTag.pop();
        // console.log('end',this.cacheTag);

         const valueButton = button.textContent;
         const  buttonLi = document.querySelectorAll('.li-button');
         buttonLi.forEach(button => {
           for (const iterator of this.cacheValue) {

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

        let newData = [];
        if(this.cacheTag.length === 1){

            if(this.cacheEvents.get('keyup')){
                newData= [...this.cacheData][0];

            }else {
                newData = recipes;
            }

        };

        const iteratorOfvalue = this.cacheValue.entries();

        for(let i =0 ; i < this.cacheValue.size;i++){
            const value = iteratorOfvalue.next().value;

            if(value[0].includes(valueButton)){
                this.cacheValue.delete(value[0]);

                const cacheSearch = [...this.cacheData][i];

                this.cacheData.delete(cacheSearch);


            }

      }
      console.log('delete',this.cacheData);

      for(let value of this.cacheValue){
        for(let j = 0; j <[...this.cacheData].length -1 ; j++) {
           const data  = [...this.cacheData][j];

            // recherche dans les tableaux obtenus  à partir des valeurs des tag cliqués
            newData= onSearch(value,data,{hasFilter:true});
            if(this.cacheEvents.get('keyup')){
                newData= onSearch(value,data);
            }

        }


        if(this.cacheTag.length === 2){

            newData= [...this.cacheData][0];
            if(this.cacheEvents.get('keyup')){
                newData= [...this.cacheData][this.cacheData.size -1];
            }

        }

    }



        refreshArticle(newData);
        displayFilter(newData);
        // desactive le bouton dans la liste
        this.hasListClicked();

    }
    /**
     *
     * @param {string} value
     */

    search(value) {
        let newtab = [];
        if(this.cacheEvents.get('click') && this.cacheEvents.has('keyup') === false || !this.cacheEvents.get('keyup')){
               // effectuer une recherche
             newtab = onSearch(value,recipes,{hasFilter:true});

        };
        if(newtab.length > 0){

            //stocke la recherche
            this.cacheData.add(newtab);
        }
 
      // actualiser les filtres et articles

    this.cacheValue.add(value);

    let nextSearch = [];

    // array intermédiaire permettant la manipulation des résultats
    let tab = [];
    for(let value of this.cacheValue){

        if(this.cacheEvents.get('click') && this.cacheEvents.has('keyup') === false || !this.cacheEvents.get('keyup')){
             // nouvelle recherche et stock dans un tableau intermédiaire
            nextSearch = onSearch(value,recipes,{hasFilter:true});

        }else if(this.cacheEvents.get('keyup')) {
            nextSearch = onSearch(value,[...this.cacheData][0],{hasFilter:true});

        }


        // boucle en excluant le dernier élément
        for(let j = 0; j < this.cacheData.size-1  ; j++) {
            let data = [];
            if(this.cacheEvents.get('keyup')){
                data = [...this.cacheData][this.cacheData.size-1];

            }else if(this.cacheEvents.has('keyup') === false || !this.cacheEvents.get('keyup')) {
                data = [...this.cacheData][j];
            }



            //recherche dans les tableaux obtenus  à partir des valeurs des tag cliqués
            let  overSearch = onSearch(value,data,{hasFilter:true});

            tab.push(overSearch);


            // trie des arrays en fonction de leur longueur
            tab.sort((a,b) => {

                return b.length - a.length;
            })


            if(tab[tab.length-1].length === 0){
                tab.pop(tab[tab.length-1]);
            }

            nextSearch = tab[tab.length - 1];



        }

    }
  
    if(this.cacheEvents.get('keyup')){
        this.cacheData.add(nextSearch);
    };

      // actualiser les filtres et articles
      refreshArticle(nextSearch);
      displayFilter(nextSearch);
      // desactive le bouton dans la liste
      this.hasListClicked();
      console.log('search',this.cacheData);

    }

    hasCloseTag(evt){
        const tag = evt.target;
        const button = tag.closest('.tag');
        this.whenCloseTag(button);

        button.remove();
        // console.log(this.cacheEvents);

    }
    hasListClicked(){
        const  buttonLi = document.querySelectorAll('.li-button');

        buttonLi.forEach(button => {
          for (const iterator of this.cacheValue) {

             if(iterator.includes(button.textContent)){

              button.classList.add('disabled');
              button.setAttribute('disabled',true);
              button.setAttribute('title','vous l\'avez déjà séléctionner');
             }
          }

        })
    }


}


export {SearchEvent};

