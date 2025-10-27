// ========================================
// BEECLUB DELIVERY LANDING PAGE
// Pure Vanilla JavaScript - No Frameworks
// ========================================

// ========================================
// 1. MOBILE NAVIGATION
// ========================================

const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');
const backdrop = document.querySelector('.nav__backdrop');
const closeBtn = document.querySelector('.nav__close');
const body = document.body;

function openMobileMenu() {
    body.classList.add('menu-open');
    mobileMenu.classList.add('active');
    backdrop.classList.add('active');
}

function closeMobileMenu() {
    body.classList.remove('menu-open');
    mobileMenu.classList.remove('active');
    backdrop.classList.remove('active');
}

if (hamburger) {
    hamburger.addEventListener('click', openMobileMenu);
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
}

if (backdrop) {
    backdrop.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking nav links
const mobileLinks = document.querySelectorAll('.nav__mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ========================================
// 2. HEADER SCROLL EFFECT
// ========================================

const header = document.querySelector('.header');

function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ========================================
// 3. SERVICE ACCORDION
// ========================================

const serviceAccordionItems = document.querySelectorAll('.services .accordion__item');

function closeAllServiceAccordions() {
    serviceAccordionItems.forEach(item => {
        item.classList.remove('accordion__item--active');
        const content = item.querySelector('.accordion__content');
        if (content) {
            content.style.maxHeight = '0';
        }
    });
}

function toggleServiceAccordion(item) {
    const isActive = item.classList.contains('accordion__item--active');
    const content = item.querySelector('.accordion__content');

    closeAllServiceAccordions();

    if (!isActive && content) {
        item.classList.add('accordion__item--active');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

serviceAccordionItems.forEach(item => {
    const accordionHeader = item.querySelector('.accordion__header');
    if (accordionHeader) {
        accordionHeader.addEventListener('click', () => toggleServiceAccordion(item));
    }
});

// Set default active (Bike Courier - 2nd item)
if (serviceAccordionItems[1]) {
    const defaultContent = serviceAccordionItems[1].querySelector('.accordion__content');
    if (defaultContent) {
        serviceAccordionItems[1].classList.add('accordion__item--active');
        defaultContent.style.maxHeight = defaultContent.scrollHeight + 'px';
    }
}

// ========================================
// 4. FAQ ACCORDION
// ========================================

const faqItems = document.querySelectorAll('.faq__item');

function closeAllFAQs() {
    faqItems.forEach(item => {
        item.classList.remove('faq__item-active');
        const answer = item.querySelector('.faq__answer');
        if (answer) {
            answer.style.maxHeight = '0';
        }
    });
}

function toggleFAQ(item) {
    const isActive = item.classList.contains('faq__item-active');
    const answer = item.querySelector('.faq__answer');

    closeAllFAQs();

    if (!isActive && answer) {
        item.classList.add('faq__item-active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    if (question) {
        question.addEventListener('click', () => toggleFAQ(item));
    }
});

// ========================================
// 5. TESTIMONIAL CAROUSEL
// ========================================

const testimonialItems = document.querySelectorAll('.testimonial__item');
const prevArrow = document.querySelector('.nav-arrow-prev');
const nextArrow = document.querySelector('.nav-arrow-next');
const testimonialContainer = document.querySelector('.testimonial');

let currentTestimonialIndex = 0;
let autoPlayInterval = null;

function showTestimonial(index) {
    testimonialItems.forEach(item => item.classList.remove('testimonial__item--active'));
    if (testimonialItems[index]) {
        testimonialItems[index].classList.add('testimonial__item--active');
    }
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
    showTestimonial(currentTestimonialIndex);
}

function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentTestimonialIndex);
}

function startAutoPlay() {
    stopAutoPlay();
    if (testimonialItems.length > 1) {
        autoPlayInterval = setInterval(nextTestimonial, 5000);
    }
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

if (prevArrow) {
    prevArrow.addEventListener('click', () => {
        prevTestimonial();
        startAutoPlay();
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', () => {
        nextTestimonial();
        startAutoPlay();
    });
}

if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', stopAutoPlay);
    testimonialContainer.addEventListener('mouseleave', startAutoPlay);

    // Mobile: pause on touch
    testimonialContainer.addEventListener('touchstart', stopAutoPlay);
}

// Initialize carousel
if (testimonialItems.length > 0) {
    showTestimonial(0);
    startAutoPlay();
}

// ========================================
// 6. VIDEO PLAYER
// ========================================

const videoPlayButton = document.querySelector('.video-player__play-button');
const videoContainer = document.querySelector('.solution__video-player');

if (videoPlayButton && videoContainer) {
    videoPlayButton.addEventListener('click', function() {
        const videoUrl = this.getAttribute('data-video-url');

        if (videoUrl) {
            // Replace with iframe (YouTube/Vimeo)
            videoContainer.innerHTML = `
                <iframe
                    src="${videoUrl}?autoplay=1"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                </iframe>
            `;
        }
    });
}

// ========================================
// 7. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 70;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// 8. UTILITY FUNCTIONS
// ========================================

// Throttle function for performance optimization
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;

    return function(...args) {
        const currentTime = Date.now();
        const timeSinceLastExec = currentTime - lastExecTime;

        if (timeSinceLastExec > delay) {
            lastExecTime = currentTime;
            func.apply(this, args);
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = Date.now();
                func.apply(this, args);
            }, delay - timeSinceLastExec);
        }
    };
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('BeeClub Landing Page - All systems ready! =');
});
