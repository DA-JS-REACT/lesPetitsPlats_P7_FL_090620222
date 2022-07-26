import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {FilterData} from '../utils/filterData.js';

import {onSearch,onSearchAppliance} from '../utils/functionSearch.js';
import {displayFilter} from '../utils/functionFilter.js';
import {refreshArticle, deleteArticle} from '../utils/articleForSearch.js';
import {StateSearch} from '../models/StateSearch.js';


class  SearchBar {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');
        this.divError = document.querySelector('.error');
        this.filterData = new FilterData();
     
        // this.state = new StateSearch();
        // this.cacheData = new Map();
        // this.cacheValue = new Map();
        // this.cacheSearchData = this.cacheData.set(this.state.key,this.state.value);

    }




    initializeSearch() {

        const input = document.getElementById('mainSearch');
        // input.addEventListener('change',(evt) => {
        //     this.onSearchMain(evt);
        // });
        input.addEventListener('keyup',(evt) => {
            this.onSearchMain(evt);

        });
        // const dropdownInput = document.querySelectorAll('.dropdown-input');
        // dropdownInput.forEach(el => el.addEventListener('keyup',(event) => {
        //     this.onSearchFilter(event);
        // }));
        // dropdownInput.forEach(el => el.addEventListener('click',(event) => {
        //     this.onSearchFilter(event);
        // }));

        
    }

    // onSearchMain(evt) {

    //     evt.preventDefault();
    //     const search = evt.target.value.toLowerCase();


    //     // for  the main search

    //     // recherche si  article d'erreur existe
    //     const searchError = this.divError.childElementCount;
    //     const lastElement = this.divError.lastChild;
    //     // si oui delete the last child
    //     if(searchError > 0){
    //         this.divError.removeChild(lastElement);
    //     }

    //     let newtab = [];

    //     if (search.length >= 3 ){
    //         newtab = onSearch(search,recipes);
    //         state(newtab);

    //         if(newtab.length > 0){

    //             displayFilter(newtab);
    //             refreshArticle(newtab);



    //         }else if(newtab.length === 0){
    //             deleteArticle();

    //             this.displayErrorCard();
    //             // delete the last element , limmit 1
    //             if(searchError === 1) {
    //                 this.divError.removeChild(lastElement);
    //             }
    //             newtab= [];
    //             displayFilter(recipes);

    //         }


    //     }else if(search.length === 0 || search.length < 3 ) {

    //         newtab = [];
    //         displayFilter(recipes);
    //         refreshArticle(recipes);

    //     }

        
     
    // }

    // onSearchFilter(event){


    //     const value = event.target.value;

    //     const parent = event.target.closest('.dropdown');

    //     const ul = parent.querySelector('.list-inline');

    //     if(event.type === 'click'){
    //         ul.innerHTML = '';
    //     }

    //     const newTab = onSearch(value,recipes,{hasFilter:true});

    //     let tab = [];
    //     let suggestions = '';

    //     const nameOnFilter = parent.className.toString().toLowerCase();
    //     const nameOfFilter = nameOnFilter.split('dropdown--');

    //     const name = nameOfFilter[1];

    //     if(value.length > 0){

    //         for (const item of newTab) {

    //             if (name === "appliance"){
    //                 if(onSearchAppliance(item,value)){
    //                     tab.push(item[name].toLowerCase());
    //                 }
    //             }
    //             // if(name != "appliance"){
    //                  for(const element of item[name]) {

    //                     const elt = name === "ingredients" ? element.ingredient: element;


    //                     if(elt.toString().toLowerCase().includes(value.toLowerCase())) {

    //                         tab.push(elt.toLowerCase());


    //                     }

    //                  }

    //             //}

    //         }


    //        const uniqueData = this.filterData.gettingDataForFilter(tab);
    //        console.log(tab);

    //         if(tab.length > 0) {
    //             for (const iterator of [...uniqueData]) {

    //                 suggestions += `<li class="list-inline-item filter__list--li text-white"><button class="li-button" type="button"> ${iterator.charAt(0).toUpperCase() + iterator.substring(1).toLowerCase() }</button></li>`;
    //             }
    //         }else {
    //             suggestions += `<li class="list-inline-item text-white"> Aucune correspondance</li>`;
    //         }

    //     }
    //     ul.innerHTML = suggestions ;
    //     console.log(newTab);
    //     refreshArticle(newTab);
    //     this.state.value = newTab;
    //     this.cacheSearchData = this.cacheData.set(this.state.key,this.state.value);



    // }


    displayErrorCard() {
       const articleError = new CardFactory().getCardError();
       this.divError.appendChild(articleError);

    }



    refreshPage(){
        location.reload(true);


        const input = document.getElementById('mainSearch');
        input.value=  ' ';
    }

}

export {SearchBar};

export function state(newtab = []){
    const tab = [];
    tab.push(newtab);
  
    return tab;

}