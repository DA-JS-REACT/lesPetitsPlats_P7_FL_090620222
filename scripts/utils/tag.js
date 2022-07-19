export function test () {
    const tagClose = document.querySelectorAll('.tag-close');
    console.log(tagClose);
        tagClose.forEach(elt => elt.addEventListener('click',(evt) => {
            console.log('close');

            const tag = evt.target;
            console.log(tag);
           
            // const button = tag.closest('.tag--' + name);
            // console.log(button);

        
            // // suppression du tag

            // button.remove();
          
    


        }))

}