class FilterEvent {


    initializeFilterEvents(){
        const  launchDropdown = document.querySelectorAll('.launch');

        launchDropdown.forEach(btn => btn.addEventListener('click',(evt) => {
            this.toggleDropdown(evt);
        }));
    }


    toggleDropdown(evt){

        const dropdown = evt.target;
        dropdown.classList.toggle('animate');
        const parentElement = dropdown.closest('.dropdown');
        parentElement.classList.toggle('active');
        
        const input = dropdown.previousElementSibling;
        input.classList.toggle('dropdown-inputHidden');
        input.classList.toggle('dropdown-inputLaunch');

        const span = input.previousElementSibling;
        span.classList.toggle('dropdown-span');

        parentElement.classList.toggle('dropdown-open');

        parentElement.lastChild.classList.toggle('toggle');

        // const divContain = parentElement.parentNode;

        // const allChild = divContain.querySelectorAll('.dropdown');
        // allChild.forEach(element => {
        //     if(element.classList.contains('active')){
        //         console.log(element);
        //         element.classList.add('dropdown-open');
        //         element.lastChild.classList.add('toggle');
        //         const input = element.querySelector('.dropdown-input');
        //         input.classList.remove('dropdown-inputHidden');
        //         input.classList.add('dropdown-inputLaunch');
        //         const span = input.previousElementSibling;
        //         span.classList.add('dropdown-span');
        //     }else {
        //         element.classList.remove('dropdown-open');
        //         element.lastChild.classList.remove('toggle');
        //         const input = element.querySelector('.dropdown-input');
        //         input.classList.add('dropdown-inputHidden');
        //         input.classList.remove('dropdown-inputLaunch');
        //         const span = input.previousElementSibling;
        //         span.classList.remove('dropdown-span');
        //     }
        // })
       


    }
}

export {FilterEvent};