document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    heroTimeline
        .from('.hero__title-line', { y: 50, opacity: 0, stagger: 0.2 })
        .from('.hero__subheadline', { y: 30, opacity: 0 }, '-=0.4')
        .from('.hero__cta', { y: 20, opacity: 0 }, '-=0.5')
        .from('.hero__stats', { opacity: 0 }, '-=0.6')
        .from('.hero__floating-card', { scale: 0.5, opacity: 0, stagger: 0.2 }, '-=0.5');

        // --- SECTIONS ---
    const sections = document.querySelectorAll('section:not(.hero)');

    sections.forEach(section => {
        const sectionTag = section.querySelector('.section__tag');
        const sectionTitle = section.querySelector('.section__title');
        const sectionContent = section.querySelectorAll('.solution__video-player, .solution__text-content, .accordion__item, .testimonial__item, .faq__item, .cta__container');

        const sectionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        if (sectionTag) {
            sectionTimeline.from(sectionTag, { y: 30, opacity: 0, duration: 0.6 });
        }
        if (sectionTitle) {
            sectionTimeline.from(sectionTitle, { y: 40, opacity: 0, duration: 0.8 }, '-=0.4');
        }
        if (sectionContent.length > 0) {
            sectionTimeline.from(sectionContent, { y: 50, opacity: 0, stagger: 0.2, duration: 0.8 }, '-=0.5');
        }
    });

    // SERVICES
    if (document.querySelector('.services__container')) {
        ScrollTrigger.create({
            trigger: '.services__container',
            start: 'top top',
            end: '+=100%', // Pin for the height of the container
            pin: '.services__image-container',
            pinSpacing: true
        });
    }

    // ACCORDIONS
    const accordionItems = document.querySelectorAll('.accordion__item, .faq__item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion__header, .faq__question');
        header.addEventListener('click', () => {
            // Optional: Close other open items
            // item.parentElement.querySelectorAll('.active').forEach(activeItem => {
            //     if (activeItem !== item) activeItem.classList.remove('active');
            // });
            item.classList.toggle('accordion__item--active'); // Or 'faq__item--active'
        });
    });

});