/**
 * references
 */
const preloader                     = document.getElementById('preloader');
const navbar_toggler                = document.getElementById('navbar-toggler');
const navbar_dark_overlay           = document.querySelector('.dark-overlay');
const navbarcollapse                = document.getElementById('navbarcollapse');
/**
 * Variables 
 */


const document_loading_start_time = Date.now();
let animation_loading_time = 2500; //3000 milisec -> 3sec

/**
 * functions ------------------------------------------------------------------------------------------------------------------------------------>
 */

/**
 * Normal functions
 */






/**
 * callback functions
 */

const preloader_toggle = ()=>{
    const document_loaded_done_time = Date.now();
    let loading_passed_time = (document_loaded_done_time - document_loading_start_time);
    
    
    if(loading_passed_time < animation_loading_time){
        let needed_time_to_complete_animation = animation_loading_time-loading_passed_time
        
        // setting timeout if its loaded to fast
        setTimeout(()=>{
            preloader.classList.add('close');
            
        },needed_time_to_complete_animation)
        return;
    }else{
        preloader.classList.add('close');

    }
    
    
    
}

// navbar toggle controller function
const navbar_toggle = () => {
    navbar_toggler.classList.toggle('open');
    navbarcollapse.classList.toggle('navbar-collapse-toggle');
    if(navbarcollapse.classList.contains('navbar-collapse-toggle')){
        navbarcollapse.style.opacity = '1';
        navbarcollapse.style.pointerEvents = 'all';
        
    }else{
        navbarcollapse.style.opacity = '0';
        navbarcollapse.style.pointerEvents = 'none';

    }
    setTimeout(() => {
        navbar_dark_overlay.classList.toggle('navbar_darkOverlay_toggle');
    }, 200);
}




/**
 * Event listeners
 */

window.addEventListener('load',preloader_toggle);
navbar_toggler.addEventListener('click',navbar_toggle);
