class TagFactory {


    tag(value = '',cacheTag,options={}) {


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

        for (let i = 0; i < cacheTag.length; i++) {

                button.setAttribute('id',i);

        }
        const id =parseInt(button.id);
        if(!cacheTag.includes(id) ){
            button.setAttribute('id',id + 1);
        }
        console.log(cacheTag);
        // console.log(button.id);
        // for (const number of cacheTag) {
        //     console.log('number',number);
        //     if(number.includes(button.id)) {
        //         button.setAttribute('id',number + 1);
        //     }
            
        // }


        button.classList.add('tag--'+ choice);
        return button;

    }
}

export {TagFactory};