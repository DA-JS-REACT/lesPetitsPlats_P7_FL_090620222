import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';

class  SearchBar {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');

    }




    initializeSearch() {

        const input = document.getElementById('mainSearch');
        input.addEventListener('change',(evt) => {
            this.onSearchChange(evt);
        });
    }

    onSearchChange(evt) {
        const search = evt.target.value.toLowerCase();
        let tab = [];
        let recipe = '';
        for(let i = 0; i < recipes.length; i++) {

            recipe =recipes[i];
            for (const key in recipe) {
                if (Object.hasOwnProperty.call(recipe, key)) {
                    const element = recipe[key];
                    // if(recipe[key].toLowerCase().includes(search)) {
                    //     tab.push(recipe);
        
                    // }else {
                    //     console.log('nope');
                    // }
                    console.log( element.toString());
                    if(element.toString().toLowerCase().includes(search)) {
                        tab.push(recipe);
        
                    }else {
                        console.log('nope');
                    }
                
                }
                
                // const element = recipe[key];
                // const test = new String(element);
               
            
            }
      
          

        }
        const article = this.articleDiv.querySelectorAll('.card');
        article.forEach(element => {
            this.articleDiv.removeChild(element);
        })


        for(let j = 0; j < tab.length; j++) {
            console.log('tab',tab[j]);
            const card = new Recipes(tab[j]);
            this.displayNewCard(card);
        }


    }
    displayNewCard(tab) {
        const articleModel = new CardFactory(
            tab.id,
            tab.name,
            tab.servings,
            tab.ingredients,
            tab.time,
            tab.description,
            tab.appliance,
            tab.ustensils
        );

        const newcardDom = articleModel.getCard();
        this.articleDiv.appendChild(newcardDom);

    }
}

export {SearchBar};