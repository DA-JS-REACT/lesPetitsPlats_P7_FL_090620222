class TagFactory {


    tag(value = '',options={}) {


        const button = document.createElement('button');
        button.classList.add('btn','me-2','tag');
        button.setAttribute('type', 'button');
        button.textContent = value;

        const span = document.createElement('span');
        span.classList.add('tag-close');
        const i = document.createElement('i');
        i.classList.add('fa-regular', 'fa-circle-xmark', 'fa-lg');
        span.appendChild(i);
        button.appendChild(span);


        let choice = '';

        if(options.hasIngredients) {
             choice = 'ingredients';
        }else if (options.hasAppareils){
            choice = 'appliance';
        }else if (options.hasUstensils){
            choice = 'ustensils';
        }
        const nbrChild = document.querySelector('.search__tag--' + choice).childElementCount;
        for (let i = 0; i <= nbrChild; i++) {
            button.setAttribute('id',i+1);
        }


        button.classList.add('tag--'+ choice);
        return button;

    }
}

export {TagFactory};