import {TagFactory} from '../factories/tagFactory.js';
import {onSearch} from '../utils/functionSearch.js';
import {displayCard , deleteArticle} from '../utils/articleForSearch.js';
import {Recipes} from '../models/Recipes.js';

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

        const li = evt.currentTarget;
        const value = li.textContent;
        const parent = li.parentElement;
        const newtab = onSearch(value);
        console.log(value);
        deleteArticle();

           // parcour le tableau des resultats
           for(let j = 0; j < newtab.length; j++) {
            const card = new Recipes(newtab[j]);
            displayCard(card);
        }

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
        

        }



       const tagClose = document.querySelectorAll('.tag-close');
        tagClose.forEach(elt => elt.addEventListener('click',(evt) => {

            const tag = evt.currentTarget;
            const button = tag.parentElement;
            const div = button.parentElement;
            div.removeChild(button);

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
}

export {FilterEvent};