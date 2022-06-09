class FilterFactory {


    constructor (data) {
        this.data =  data;
        // this.appliance = appliance;
        // this.ustensils = ustensils;
    }

    getFilter(options={}) {

        const divMain = document.createElement('div');

        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('btn','dropdown-btn')

        const span = document.createElement('span');
        button.appendChild(span);

        const input = document.createElement('input');
        input.classList.add('border-0','text-white','dropdown-input');
        input.setAttribute('type', 'search');

        const i = document.createElement('i');
        i.classList.add('fa-solid','fa-angle-down');

        button.appendChild(input);
        button.appendChild(i);

        divMain.appendChild(button);

        const divChild = document.createElement('div');
        divChild.classList.add('dropdown__child','filter');
        const ul = document.createElement('ul');
        ul.classList.add('list-inline','filter__list','filter__list--ul');

        // loop for generic li
        // [...this.data] convert Set  in a array
        for(let i=0; i<[...this.data].length; i++) {

            const li = document.createElement('li');
            li.classList.add('list-inline-item','filter__list--li');
            li.textContent = [...this.data][i];
            ul.appendChild(li);
        }

        divChild.appendChild(ul);

        divMain.appendChild(divChild);



        let choice = '';
        if(options.hasIngredients) {
             choice = 'ingredients';
        }else if (options.hasAppareils){
            choice = 'appareils';
        }else if (options.hasUstensils){
            choice = 'ustensils';
        }


        divMain.classList.add('dropdown','dropdown--'+ choice);
        span.textContent = choice;
        input.setAttribute('placeholder','Rechercher un '+ choice);
        input.classList.add('dropdown-input--' + choice)
        divChild.classList.add('dropdown__child--'+ choice);

        return divMain;
    }
}

export {FilterFactory};