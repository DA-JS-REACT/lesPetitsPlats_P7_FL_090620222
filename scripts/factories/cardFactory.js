class CardFactory {

    constructor (id, name, servings,ingredients,time,decription) {

        this.id = id;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.decription = decription;
    }
    /**
     * 
     * @returns  {HtmlElement}
     */
    getCard() {

        const article = document.createElement('article');
        article.classList.add('card');
        /* div for img  */
        const divImg = document.createElement('div');
        divImg.classList.add('card-img');
        divImg.setAttribute('title', this.name);
        article.appendChild(divImg);
        /* div for main recipes */
        const divBody = document.createElement('div');
        divBody.classList.add('card-body');
        /* div header of card Body */
        const divTitle = document.createElement('div');
        divTitle.classList.add('card-title');

        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        divTitle.appendChild(h2);

        const divTime = document.createElement('div');
        divTime.classList.add('card-title__time');

        const i = document.createElement('i');
        i.classList.add('fa-regular','fa-clock');
        divTime.appendChild(i);

        const span = document.createElement('span');
        span.textContent = this.time +' ' + 'min';
        divTime.appendChild(span);

        divTitle.appendChild(divTime);

        /* div for list and derscription */
        const divDescribe = document.createElement('div');
        divDescribe.classList.add('card-describe');

        const ul = document.createElement('ul');
        ul.classList.add('describe-ul');

        for (let i = 0; i < this.ingredients.length; i++) {
            const li = document.createElement('li');
            li.classList.add('describe-ul__li');

            const spanLi = document.createElement('span');
            if(this.ingredients[i].hasOwnProperty('unit')){
                switch(this.ingredients[i]['unit']){
                    case 'grammes':
                        this.ingredients[i]['unit']= 'g';
                        break;
                    case 'cuillères à soupe':
                        this.ingredients[i]['unit']= 'c.à.soupes';
                       break;
                    case 'cuillère à soupe':
                        this.ingredients[i]['unit']= 'c.à.s';
                       break;
                    case 'cuillères à café':
                        this.ingredients[i]['unit']= 'c.à.café';
                       break;
                }
                spanLi.textContent= this.ingredients[i]['quantity'] +' '+ this.ingredients[i]['unit'];
            }else {
                spanLi.textContent= this.ingredients[i]['quantity'];
            }


            li.textContent = this.ingredients[i]['ingredient'] +': ';
            li.appendChild(spanLi);

            ul.appendChild(li);
        }

        divDescribe.appendChild(ul);

        const p = document.createElement('p');
        p.textContent= this.decription;

        divDescribe.appendChild(p);



        divBody.appendChild(divTitle);
        divBody.appendChild(divDescribe);





        article.appendChild(divBody);
        return article;
    }
    getCardError(){



        const article = document.createElement('article');
        article.classList.add('card-error');
        const h3 = document.createElement('h3');
        h3.textContent = 'Désolé nous n\'avons pas trouver de recette ....';
        h3.classList.add('card-error__title');
        article.appendChild(h3);
        const p = document.createElement('p');
        p.textContent= 'mais nous allons y remedier , en attendant consulter celles déjà présente';
        p.classList.add('card-error__text');
        article.appendChild(p);

        return article;



    }
}

export {CardFactory};