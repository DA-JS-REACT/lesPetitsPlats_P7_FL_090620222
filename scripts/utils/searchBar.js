import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {FilterData} from '../utils/filterData.js';
import {FilterEvent} from '../utils/filterEvent.js';
import {onSearch,onSearchIngredients} from '../utils/functionSearch.js';
import {displayFilter} from '../utils/functionFilter.js';
import {displayCard,refreshArticle, deleteArticle} from '../utils/articleForSearch.js';

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

        // this.filterEvents.initializeFilterEvents();
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

                displayFilter(newtab);
                refreshArticle(newtab);



            }else if(newtab.length === 0){
                deleteArticle();

                this.displayErrorCard();
                // delete the last element , limmit 1
                if(searchError === 1) {
                    this.divError.removeChild(lastElement);
                }
                newtab= [];
                displayFilter(recipes);

            }


        }else if(search.length === 0 || search.length < 3 ) {

            newtab = [];
            displayFilter(recipes);

            refreshArticle(recipes);

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

        }
        ul.innerHTML = suggestions ;
        this.filterEvents.initializeFilterEvents();


    }


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