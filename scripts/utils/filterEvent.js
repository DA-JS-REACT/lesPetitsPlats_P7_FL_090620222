class FilterEvent {


    initializeFilterEvents(){
        const  launchDropdown = document.querySelectorAll('.launch');

        launchDropdown.forEach(btn => btn.addEventListener('click',(evt) => {
            this.toggleDropdown(evt);
        }));
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