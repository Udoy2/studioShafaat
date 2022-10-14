/**
 * references
 */

const cards      = document.querySelectorAll('.card_column--card');
/**
 * callback functions
 */
// project page gallery popup controller function
const gallery_toggle = (e) => {
    
    gallery.classList.toggle('open')
}


/**
 * Event listeners
 */

cards.forEach((card)=>{
    card.addEventListener('click',gallery_toggle);
});

