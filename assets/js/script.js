// MOBILE NAV


const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');
const mobileLinks = document.querySelectorAll('.nav__mobile-link');
const backdrop = document.querySelector('.nav__backdrop');
const closeBtn = document.querySelector('.nav__close');
const body = document.body;

function openMobileMenu() {
    body.style.overflow = 'hidden';
    mobileMenu.classList.add('active');
    backdrop.classList.add('active');
    body.classList.add('menu-open');
    mobileMenu.classList.add('active');
    backdrop.classList.add('active');
}

function closeMobileMenu(){
     body.style.overflow = '';
    body.classList.remove('menu-open');
    mobileMenu.classList.remove('active');
    backdrop.classList.remove('active');   
}

if (!hamburger) console.error('Hamburger button missing');
if (!mobileMenu) console.error('Mobile menu container missing');
if (!backdrop) console.error('Backdrop missing');

if(hamburger){
    console.log("Ham clicked!!")
    hamburger.addEventListener('click', openMobileMenu);
}
if(closeBtn){
    closeBtn.addEventListener('click', closeMobileMenu);
}
if(backdrop){
    backdrop.addEventListener('click', closeMobileMenu);
}

//closes if i click on any link
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

body.addEventListener('click', () =>{
    console.log("BODY CLICKED!!!!")
})