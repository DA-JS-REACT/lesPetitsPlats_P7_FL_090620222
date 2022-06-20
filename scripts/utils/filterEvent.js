import {TagFactory} from '../factories/tagFactory.js'

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

        this.displayTag(parent,value);

    }
    displayTag(parent,value) {
        const divTag = document.querySelector('.search__tag');

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
        // appel de la tagFactory
        const tag  = this.tag.tag(value,options);
        tag.style.display ='block';
        divTag.appendChild(tag);
        //! test
        // ajoute que 3 tag
        const lastChild = divTag.lastChild;
        if(divTag.childElementCount > 3){
            divTag.removeChild(lastChild);
        }
        // remplace le tag existant
        if(tag.classList.contains('search__tag--'+ name)){
            console.log(tag);
            const old = divTag.firstChild;

            divTag.replaceChild(tag,old);
        }


       const tagClose = document.querySelector('.tag-close');
        tagClose.addEventListener('click',(evt) => {
            const tag = evt.currentTarget;

            const button = tag.parentElement;
            button.style.display = 'none';

        })
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