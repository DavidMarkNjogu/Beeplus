document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. HERO
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTl
        .from('.hero__title-line', { y: 60, opacity: 0, stagger: 0.2 })
        .from('.hero__subheadline', { y: 40, opacity: 0 }, '-=0.6')
        .from('.hero__cta', { y: 20, opacity: 0 }, '-=0.7')
        .from('.hero__stats', { opacity: 0 }, '-=0.8')
        .from('.hero__floating-card', { scale: 0.5, opacity: 0, stagger: 0.15, force3D: true }, '-=0.7')
        .from('.hero__image-wrapper', { y: 50, opacity: 0 }, '-=1');

 
    const animatedElements = document.querySelectorAll(
        '.section__tag, .section__headline, .section__title, .solution__text-content, .accordion__item, .testimonial__item, .faq__item, .advantages__container > .button--primary, .faq__header'
    );

    animatedElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse' 
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });



    // // SERVICES
    // if (document.querySelector('.services__container') && window.innerWidth > 768) {
    //     ScrollTrigger.create({
    //         trigger: '.services__content',
    //         start: 'top 10%', 
    //         end: 'bottom bottom',
    //         pin: '.services__image-container',
    //         pinSpacing: 'margin' // Use margin to prevent content jump
    //     });
    // }

    // ADVANTAGES SECTION: Circular entrance effect (desktop only)
    if (window.innerWidth > 1024) {
        gsap.from('.advantages__item', {
            scrollTrigger: {
                trigger: '.advantages__grid-wrapper',
                start: 'top 70%'
            },
            opacity: 0,
            scale: 0.5,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out'
        });
    }

    // CTA SECTION: Staggered entrance for the phone mockups
    gsap.from('.cta__image', {
        scrollTrigger: {
            trigger: '.cta__container',
            start: 'top 75%'
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
    });
});