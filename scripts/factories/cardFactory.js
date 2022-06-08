class CardFactory {

    constructor (id, name, servings,ingredients,time,decription,appliance,ustensils) {

        this.id = id;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.decription = decription;
        this.appliance = appliance;
        this.ustensils = ustensils;
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
            spanLi.textContent= this.ingredients[i]['quantity'] + this.ingredients[i]['unit'];

            li.textContent = this.ingredients[i]['ingredient'] +': ';
            li.appendChild(spanLi);

            ul.appendChild(li);
        }
        console.log(this.ingredients.length);

        divDescribe.appendChild(ul);

        const p = document.createElement('p');
        p.textContent= this.decription;

        divDescribe.appendChild(p);



        divBody.appendChild(divTitle);
        divBody.appendChild(divDescribe);





        article.appendChild(divBody);
        return article;
    }
}

export {CardFactory};