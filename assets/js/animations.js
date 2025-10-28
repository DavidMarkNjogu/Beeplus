document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. HERO SECTION ENTRANCE ANIMATION ---
    // This timeline runs once on page load for a polished introduction.
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTl
        .from('.hero__title-line', { y: 60, opacity: 0, stagger: 0.2 })
        .from('.hero__subheadline', { y: 40, opacity: 0 }, '-=0.6')
        .from('.hero__cta', { y: 20, opacity: 0 }, '-=0.7')
        .from('.hero__stats', { opacity: 0 }, '-=0.8')
        .from('.hero__floating-card', { scale: 0.5, opacity: 0, stagger: 0.15, force3D: true }, '-=0.7')
        .from('.hero__image-wrapper', { y: 50, opacity: 0 }, '-=1');

    // --- 2. UNIFIED SCROLL-TRIGGERED ANIMATIONS ---
    // This single, efficient loop handles the fade-in effect for all designated elements.
    const animatedElements = document.querySelectorAll(
        '.section__tag, .section__headline, .section__title, .solution__text-content, .accordion__item, .testimonial__item, .faq__item, .advantages__container > .button--primary, .faq__header'
    );

    animatedElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse' // Play on enter, reverse on scroll up
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // --- 3. SPECIFIC COMPONENT ANIMATIONS ---

    // SERVICES SECTION: Pin the image on scroll (desktop only)
    if (document.querySelector('.services__container') && window.innerWidth > 768) {
        ScrollTrigger.create({
            trigger: '.services__content',
            start: 'top 10%', // Start pinning when the top of the content hits 10% from the top of the viewport
            end: 'bottom bottom',
            pin: '.services__image-container',
            pinSpacing: 'margin' // Use margin to prevent content jump
        });
    }

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