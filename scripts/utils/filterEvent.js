import {TagFactory} from '../factories/tagFactory.js';
import {onSearch} from '../utils/functionSearch.js';
import {displayFilter} from '../utils/functionFilter.js';
import {refreshArticle} from '../utils/articleForSearch.js';
import {StateSearch} from '../models/StateSearch.js';
import { StateTag } from '../models/StateTag.js';
import {recipes} from '../data/recipes.js';


import {FilterData} from '../utils/filterData.js';

class FilterEvent {
    constructor () {
        this.tag = new TagFactory();
        this.state = new StateSearch();
        this.stateTag = new StateTag();
        this.cacheData = new Set();
        this.cacheValue = new Set();
        this.cacheTag = [];
        this.cacheNumberOfTag = this.cacheTag.push(this.stateTag.numberTag);
        this.filterData = new FilterData();

  
    }

    initializeFilterEvents(){

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


    }

    /**
     *
     * @param {Event} evt
     */
    onClicklist(evt) {


        const li = evt.target;

        const value = li.textContent;

        //récupère le parent ul
        const parent = evt.currentTarget;

        this.displayTag(parent,value);

        // effectuer une recherche
        this.search(value);

    }

    onSearchFilter(event){


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
           console.log(tab);

            if(tab.length > 0) {
                for (const iterator of [...uniqueData]) {

                    suggestions += `<li class="list-inline-item filter__list--li text-white"><button class="li-button" type="button"> ${iterator.charAt(0).toUpperCase() + iterator.substring(1).toLowerCase() }</button></li>`;
                }
            }else {
                suggestions += `<li class="list-inline-item text-white"> Aucune correspondance</li>`;
            }

        }
        ul.innerHTML = suggestions ;
        console.log(newTab);
        refreshArticle(newTab);
        this.search(value);



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
        const tag  = this.tag.tag(value,this.cacheTag,options);

        divTag.appendChild(tag);




        this.stateTag.numberTag++;
        this.cacheNumberOfTag = this.cacheTag.push(this.stateTag.numberTag);

    }

    /**
     *
     * @param {HtmlElement} button
     */
    whenCloseTag(button) {


        this.cacheNumberOfTag = this.cacheTag.pop();
        console.log('end',this.cacheTag);
      
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
            newData = recipes;
        };

        // @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator
        // permet de récuperer la clé dans le cache des valeurs afin de pouvoir supprimer dans les data 
        //  const key = this.cacheValue[Symbol.iterator]();
        //  for (const iterator of key) {
        //       if(iterator.includes(valueButton)){

        //           this.cacheSearchData.delete(iterator[0]);
        //           this.cacheValue.delete(iterator[0]);

        //         //   console.log(' data before clear', this.cacheSearchData.size);
        //         //   console.log('delete value', this.cacheSearchValue);
        //         // décremente la clé pour cliquer plusieurs fois
        //         // this.state.key--;
        //         console.log('delete data', this.cacheSearchData);
        //         console.log('delete value', this.cacheSearchValue);
        //         // if(this.cacheSearchData.size === 1){

        //         //     this.state.key=0;
        //         // }
        //         //   console.log('length tag close',this.cacheTag.length);
        //       }
        // }
        const iteratorOfvalue = this.cacheValue.entries();
       
      for(let i =0 ; i < this.cacheValue.size;i++){
        const value = iteratorOfvalue.next().value;
        
        if(value[0].includes(valueButton)){
            this.cacheValue.delete(value[0]);
           
            const cachcheSearch = [...this.cacheData][i];
           
            this.cacheData.delete(cachcheSearch);
        }
       
      }
      console.log('delete data', this.cacheData);
      console.log('delete value', this.cacheValue);
      for(let value of this.cacheValue){
        for(let j = 0; j <[...this.cacheData].length -1 ; j++) {
           const data  = [...this.cacheData][j];
         
         
            // recherche dans les tableaux obtenus  à partir des valeurs des tag cliqués
            newData= onSearch(value,data,{hasFilter:true});
          
            
            console.log(newData);

        }
   


        if(this.cacheTag.length === 1){
           newData = recipes;
           console.log(newData,this.cacheTag.length);
        //    this.cacheSearchData.clear();
        //    this.state = new StateSearch();
        //    this.cacheSearchData = this.cacheData.set(this.state.key,this.state.value);


        }else if(this.cacheTag.length === 2){
            // récupère la première insertion
            // const firstValue = iteratorOfvalue.next().value;
            // // nouvelle recherche lorsqu'il n'y a plus qu'un tag
            // // newData = onSearch(firstValue ,recipes,{hasFilter:true});
            // this.state.key--;
            // this.cacheSearchData = this.cacheData.set(this.state.key,newData);
            // console.log('delete data', this.cacheSearchData);
            // this.cacheSearchValue = this.cacheValue.set(this.state.key,firstValue);
            // for(let value of this.cacheValue){
            //     for(let j = 0; j < this.cacheValue.size   ; j++) {
            //         // recherche dans les tableaux obtenus  à partir des valeurs des tag cliqués
            //         newData= onSearch(value,this.cacheSearchData.get(j),{hasFilter:true});
                    
            //         console.log(newData);

            //     }
            // }
            newData= [...this.cacheData][0];

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
     
         // effectuer une recherche
      const newtab = onSearch(value,recipes,{hasFilter:true});
      // actualiser les filtres et articles

          //stocker la recherche

        this.cacheData.add(newtab);
        this.cacheValue.add(value);

    let nextSearch = [];

    // array intermédiaire permettant la manipulation des résultats
    let tab = [];
    for(let value of this.cacheValue){


        // nouvelle recherche et stock dans un tableau intermédiaire
        nextSearch = onSearch(value,recipes,{hasFilter:true});

        // boucle en excluant le dernier élément
        for(let j = 0; j < this.cacheData.size-1  ; j++) {

            const data = [...this.cacheData][j];
            //recherche dans les tableaux obtenus  à partir des valeurs des tag cliqués
            const  overSearch = onSearch(value,data,{hasFilter:true});

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
   
      

     
      // actualiser les filtres et articles
      refreshArticle(nextSearch);
      displayFilter(nextSearch);
      // desactive le bouton dans la liste
      this.hasListClicked();

    }

    hasCloseTag(evt){
        const tag = evt.target;
        const button = tag.closest('.tag');
        this.whenCloseTag(button);

        button.remove();

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


export {FilterEvent};

