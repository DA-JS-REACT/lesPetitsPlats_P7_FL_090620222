import {CardFactory} from '../factories/cardFactory.js';
import {Recipes} from '../models/Recipes.js';

const articleDiv = document.querySelector('.recipes');

/**
 * Display
 * @param {array} tab
 */
 export function displayCard(tab) {
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
    articleDiv.appendChild(newcardDom);

}

export function   deleteArticle() {

    // efface les articles par défault
    const article = articleDiv.querySelectorAll('.card');
    article.forEach(element => {
        articleDiv.removeChild(element);
    })
}

export function refreshArticle(data) {
    // efface les articles par défault
    deleteArticle();
    for(let i = 0; i < data.length; i++) {
        const card = new Recipes(data[i]);
        displayCard(card);
    }

}