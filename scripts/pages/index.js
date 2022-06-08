import {recipes} from '../data/recipes.js';
import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';

class Home {

    constructor () {
        this.articleDiv = document.querySelector('.recipes');
    }


    displayCard(recipes) {
        const articleModel = new CardFactory(
            recipes.id,
            recipes.name,
            recipes.servings,
            recipes.ingredients,
            recipes.time,
            recipes.description,
            recipes.appliance,
            recipes.ustensils
        );
        const cardDom = articleModel.getCard();
        this.articleDiv.appendChild(cardDom);

    }

    init() {
        for(let i = 0; i < recipes.length; i++) {
            const test = new Recipes(recipes[i]);
            this.displayCard(test);
        }
    }
}

const home = new Home();
home.init();