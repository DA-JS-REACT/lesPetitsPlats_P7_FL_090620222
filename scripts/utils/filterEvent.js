import {TagFactory} from '../factories/tagFactory.js';
import {onSearch, onSearchIngredients} from '../utils/functionSearch.js';
import {displayFilter} from '../utils/functionFilter.js';
import {displayCard,refreshArticle, deleteArticle} from '../utils/articleForSearch.js';
import {StateSearch} from '../models/StateSearch.js';
import {recipes} from '../data/recipes.js';

class FilterEvent {
    constructor () {
        this.tag = new TagFactory();
        this.state = new StateSearch();
        this.cash = new Map();
        this.cashSearch = this.cash.set(this.state.status,this.state.value);
        this.test =[];

    }

    initializeFilterEvents(){
        
        const  launchDropdown = document.querySelectorAll('.launch');

        launchDropdown.forEach(btn => btn.addEventListener('click',(evt) => {
            this.toggleDropdown(evt);
        }));

        const list = document.querySelectorAll('.filter__list--li');

        list.forEach(item => item.addEventListener('click',(evt) => {
            console.log('object');
            this.onClicklist(evt);
        }))

    }

    onClicklist(evt) {

        const li = evt.currentTarget;
        const value = li.textContent;
        const parent = li.parentElement;
        const parentDiv =document.querySelector('.testing');
        const nbrChild = parentDiv.childElementCount;
        const child = nbrChild + 1;

        this.displayTag(parent,value);


        const newtab = onSearch(value,recipes,{hasFilter:true});
        this.state.value = newtab;
        this.test.push(newtab);
        console.log('test',this.test);
        this.state.status ++;


   
       
       
        if(child === 1) {

            refreshArticle(newtab);
            displayFilter(newtab);
        }

        this.cashSearch = this.cash.set(this.state.status,this.state.value);
        console.log('cash',this.cashSearch);
        const key = this.state.status === 1  ? this.state.status  : this.state.status -1;
        // const key = this.state.status;
        // console.log('key',key);
        // console.log('status',this.state.status);
        // console.log('cash key',this.cashSearch.get(key));
        const secondSearch =  onSearch(value,this.test[0],{hasFilter:true});
       
        //     console.log(toto);
        refreshArticle(secondSearch);
        // displayFilter(secondSearch);
        
   


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




       const tagClose = document.querySelectorAll('.tag-close');
        tagClose.forEach(elt => elt.addEventListener('click',(evt) => {

            const tag = evt.currentTarget;
            const button = tag.parentElement;
            const div = button.parentElement;
            div.removeChild(button);
            displayFilter(recipes);
            refreshArticle(recipes);


        }))

    }


 
}


export {FilterEvent};