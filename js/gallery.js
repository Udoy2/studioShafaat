const gallery_icon_cross            = document.getElementById('gallery_icon_cross');
const fullscreen_icon               = document.getElementById('fullscreen_icon');
const gallery                       = document.getElementById('gallery');
const gallery_thumbnails            = document.querySelectorAll('.image_thumbnail');
const gallery_main_image            = document.getElementById('gallery_main_image');
const main_image                    = document.getElementById('main_image');
const gallery_zoom_in               = document.getElementById('gallery_zoom_in')
const gallery_zoom_out              = document.getElementById('gallery_zoom_out')
const gallery_share                 = document.getElementById('gallery_share');
const share_container               = document.getElementById('share_container');
const gallery_share_facebook        = document.getElementById('gallery_share_facebook');
const gallery_share_instagram       = document.getElementById('gallery_share_instagram');
const gallery_share_linkendin       = document.getElementById('gallery_share_linkendin');

// variables
let zoom_percent = 1;
let zoom_step    = 0.2;

/**
 * functions
 */
const element_style_remove = (elements, ...styles) => {
    console.log(NodeList.prototype.isPrototypeOf(elements));
    
    if(NodeList.prototype.isPrototypeOf(elements)){
        styles.forEach(styleName => {
            elements.forEach((currElem)=>{
                currElem.style[styleName] = '';
            })
        });
    }else{
        styles.forEach((styleName)=> {
            elements.style[styleName] = '';
        })
    }
    
    
}

const fullscreen_toggle = () => {
    const fullscreenElement = document.fullscreenElement || document.webkitfullscreenElement;
    if(!fullscreenElement){
        if(gallery_main_image.requestFullscreen){

            gallery_main_image.requestFullscreen();
        }else if(gallery_main_image.webkitRequestFullscreen){
            gallery_main_image.webkitRequestFullscreen();

        }
    }else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }
    }
    
}



const gallery_main_image_toggle = (e) => {
    const mainImageLink = e.target.getAttribute('data-mainImage');

    var image = new Image();
    image.onload = function(){

        
        main_image.src = this.src
        // removes scale and outline style from other thumbnails
        element_style_remove(gallery_thumbnails,'transform','outline');
        // removing scale from main image
        element_style_remove(main_image,'transform');
        zoom_percent = 1;
        // adding selected style in thumbnail
        e.target.style.transform = `scale(0.8)`;
        e.target.style.outline = `5px solid #707070`; //#707070 is secondary color in css
    }
    image.src = mainImageLink;
    
}

const gallery_zoom_toggle = (state) => {
    if(state == "zoom_in"){
        if(zoom_percent <= 3){
            zoom_percent += zoom_step
            main_image.style.transform = `scale(${zoom_percent})`;
        }
    }else{
        if(zoom_percent >= 1){
            zoom_percent -= zoom_step
            main_image.style.transform = `scale(${zoom_percent})`;
        }
    }
}

const gallery_share_toggle = (e) => {
    console.log(e.target);
    
    if(e.target.classList.contains('share_wrapper')){
        share_container.classList.remove('open');
        return;
    }
    share_container.classList.add('open');
}

const gallery_social_share = (share_type) => {
    let post_link = main_image.src;
    let post_title = "Title";
    if(share_type == 'facebook'){
        let post_url = `https://www.facebook.com/sharer/sharer.php?u=${post_link}`;
        window.open(post_url);
    }
    if(share_type == 'instagram'){

    }
    if(share_type == 'linkendin'){
        let post_url = `https://www.linkedin.com/shareArticle?url=${post_link}&title=${post_title}`;
        window.open(post_url);
    }
}

// event listener
gallery_icon_cross.addEventListener('click',gallery_toggle);
fullscreen_icon.addEventListener('click',fullscreen_toggle);
gallery_thumbnails.forEach((thumbnail)=>{
    thumbnail.addEventListener('click',gallery_main_image_toggle)
});
gallery_zoom_in.addEventListener('click',()=>gallery_zoom_toggle('zoom_in'));
gallery_zoom_out.addEventListener('click',()=>gallery_zoom_toggle('zoom_out'));
gallery_main_image.addEventListener('doubleclick',fullscreen_toggle);
gallery_share.addEventListener('click',gallery_share_toggle);
share_container.addEventListener('click',gallery_share_toggle)
gallery_share_facebook.addEventListener('click',()=>gallery_social_share('facebook'))
gallery_share_instagram.addEventListener('click',()=>gallery_social_share('instagram'))
gallery_share_linkendin.addEventListener('click',()=>gallery_social_share('linkendin'))
