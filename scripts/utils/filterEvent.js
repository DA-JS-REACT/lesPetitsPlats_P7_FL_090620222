import {TagFactory} from '../factories/tagFactory.js';
import {onSearch, onSearchIngredients} from '../utils/functionSearch.js';
import {displayFilter} from '../utils/functionFilter.js';
import {displayCard,refreshArticle, deleteArticle} from '../utils/articleForSearch.js';
import {Recipes} from '../models/Recipes.js';
import {recipes} from '../data/recipes.js';

class FilterEvent {
    constructor () {
        this.tag = new TagFactory();
    }

    initializeFilterEvents(){
        const  launchDropdown = document.querySelectorAll('.launch');

        launchDropdown.forEach(btn => btn.addEventListener('click',(evt) => {
            this.toggleDropdown(evt);
        }));

        const list = document.querySelectorAll('.filter__list--li');

        list.forEach(item => item.addEventListener('click',(evt) => {

            this.onClicklist(evt);
        }))

    }

    onClicklist(evt) {
       console.log(evt);
        const li = evt.currentTarget;
        const value = li.textContent;
        const parent = li.parentElement;
      
        
      
       
        this.displayTag(parent,value);
      
       

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
        if(divTag.childElementCount > 2){
            divTag.removeChild(lastChild);
            // refreshArticle(newtab);
            // displayFilter(newtab);

        }
        let test = divTag.childElementCount;
        console.log(test);
        let toto = [];
        // let newtab = [];
        const newtab = onSearch(value);
        switch(divTag.childElementCount){
            case 1:
                
               
                refreshArticle(newtab);
                displayFilter(newtab);
                console.log('case 0',newtab);
                break;

            case 2:
                
              
                
                toto = onSearch(value,newtab);
                console.log('case 1',toto);
                refreshArticle(toto);
                displayFilter(toto);

        }



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


    toggleDropdown(evt){
        // on balise i
        const dropdown = evt.target;

        const parentElement = dropdown.closest('.dropdown');
        parentElement.classList.toggle('active');
        dropdown.classList.toggle('active__i');

        // parentElement.lastChild.classList.toggle('active__child');

        // const input = dropdown.previousElementSibling;
        // input.classList.toggle('input-hidden');
        // input.classList.toggle('input-visible');

        // const span = input.previousElementSibling;
        // span.classList.toggle('active__span');



        const divContain = parentElement.parentNode;

        const allChild = divContain.querySelectorAll('.dropdown');
        allChild.forEach(element => {
            if(element.classList.contains('active')){
                console.log(element);

                element.lastChild.classList.add('active__child');
                const input = element.querySelector('.dropdown-input');
                input.classList.remove('input-hidden');
                input.classList.add('input-visible');
                const span = input.previousElementSibling;
                span.classList.add('active__span');
            }else {

                element.lastChild.classList.remove('active__child');
                const input = element.querySelector('.dropdown-input');
                input.classList.add('input-hidden');
                input.classList.remove('input-visible');
                const span = input.previousElementSibling;
                span.classList.remove('active__span');
            }
        })



    }

    secondsearch(newtab, value){
        console.log('start Newtab',newtab);
        let tab =new Set();
        let recipe = {};
    
        for(let i = 0; i < newtab.length; i++) {
    
            recipe = newtab[i];
    
            for (const key in recipe) {
                if (Object.hasOwnProperty.call(recipe, key)) {

                    if(key === 'ingredients') {
                       tab = onSearchIngredients(recipe,value,{hasFilter:true});
                    }
    
                }
    
            }
    
        }
        console.log('end Newtab',newtab);
        return [...tab];

    }
}

export {FilterEvent};