// // MOBILE NAV

const hamburger = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__list");
const body = document.body;

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
  navList.classList.toggle("active");
  body.style.overflow = navList.classList.contains("active") ? "hidden" : "";
});

// HEADER SCROLL EFFECT
const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("header--scrolled", window.scrollY > 50);
    });


// ACCORDIONS 
const accordions = document.querySelectorAll(".accordion__item, .faq__item");
    accordions.forEach(accordion => {
        const header = accordion.querySelector(".accordion__header, .faq__question");
        header.addEventListener("click", () => {
            const isActive = accordion.classList.contains("accordion__item--active") || accordion.classList.contains("faq__item--active");
            accordion.parentElement.querySelectorAll(".accordion__item--active, .faq__item--active").forEach(activeAcc => {
                activeAcc.classList.remove("accordion__item--active", "faq__item--active");
            });
            if (!isActive) {
                accordion.classList.add("accordion__item--active", "faq__item--active");
            }
        });
    });

    const defaultActiveService = document.querySelector('.services .accordion__item:nth-child(2)');
    if (defaultActiveService) {
        defaultActiveService.classList.add("accordion__item--active");
    }

// TESTIMONIAL
    const testimonials = document.querySelectorAll(".testimonial__item");
    if (testimonials.length > 0) {
        let currentIndex = 0;
        let autoPlayInterval = setInterval(showNext, 5000);

        function updateTestimonials() {
            testimonials.forEach((item, index) => {
                item.classList.remove("testimonial__item--active");
                if (index === currentIndex) {
                    item.classList.add("testimonial__item--active");
                }
            });
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonials();
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonials();
        }

        document.querySelectorAll('.nav-arrow-next').forEach(btn => btn.addEventListener('click', () => {
            showNext();
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(showNext, 5000);
        }));

        document.querySelectorAll('.nav-arrow-prev').forEach(btn => btn.addEventListener('click', () => {
            showPrev();
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(showNext, 5000);
        }));

        updateTestimonials();
    }

    
// VIDEO PLAYER
const videoPlayBtn = document.querySelector(".video-player__play-button");
const videoContainer = document.querySelector(".video-container");
const videoThumbnail = document.querySelector(".solution__video-player img");

if (videoPlayBtn && videoContainer) {
  videoPlayBtn.addEventListener("click", function () {
    let videoUrl = this.getAttribute("data-video-url");

    if (videoUrl && !videoUrl.includes("mute=1")) {
      videoUrl += (videoUrl.includes("?") ? "&" : "?") + "mute=1";
    }
    if (videoUrl) {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", videoUrl);
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("allow", "autoplay; encrypted-media;");
      videoContainer.innerHTML = "";
      videoContainer.appendChild(iframe);
      this.style.display = "none";
      if(videoThumbnail){ 
        videoThumbnail.style.display = "none";
      }
    }
  });
}

// ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach((alink) => {
  alink.addEventListener("click", (e) => {
    const targetId = this.getAttribute("href");

    if (targetId === "#" || targetId === "") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 70;
      const targetPos = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPos,
        behavior: "smooth",
      });
    }
  });
});
