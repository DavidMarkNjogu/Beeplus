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
  if (window.scrollY > 50) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }
});

// SERVICES ACCORDION
const serviceAccordionItems = document.querySelectorAll(
  ".services .accordion__item"
);

function closeAllServAccordions() {
  serviceAccordionItems.forEach((item) => {
    item.classList.remove("accordion__item--active");
    const content = item.querySelector(".accordion__content");
    if (content) {
      content.style.maxHeight = "0";
    }
  });
}

function toggleServAccordion(service) {
  const isActive = service.classList.contains("accordion__item--active");
  const content = service.querySelector(".accordion__content");

  closeAllServAccordions();
  if (!isActive && content) {
    service.classList.add("accordion__item--active");
    content.style.maxHeight = content.scrollHeight + 50 + "px";
  }
}

serviceAccordionItems.forEach((service) => {
  const accordionHeader = service.querySelector(".accordion__header");
  if (accordionHeader) {
    accordionHeader.addEventListener("click", () =>
      toggleServAccordion(service)
    );
  }
});

// default active accordion item will be  (Bike Courier - or rather, the 2nd item)
if (serviceAccordionItems) {
  const defaultContent = serviceAccordionItems[1].querySelector(
    ".accordion__content"
  );
  if (defaultContent) {
    serviceAccordionItems[1].classList.add("accordion__item--active");
    defaultContent.style.maxHeight = defaultContent.scrollHeight + 50 + "px"; //the +50 is coz the first accordion failed to wrap, even though set, so I removed .jcsb and added gap plus jcfs
  }
}

// FAQ ACCORDION
const faqItems = document.querySelectorAll(".faq__item");

function closeFAQs() {
  faqItems.forEach((faq) => {
    faq.classList.remove("faq__item--active");
    const answer = faq.querySelector(".faq__answer");
    if (answer) {
      answer.style.maxHeight = "0";
    }
  });
}

function toggleFAQ(faq) {
  const isActive = faq.classList.contains("faq__item--active");
  const answer = faq.querySelector(".faq__answer");

  closeFAQs();

  if (!isActive && answer) {
    faq.classList.add("faq__item--active");
    answer.style.maxHeight = answer.scrollHeight + 50 + "px";
  }
}
faqItems.forEach((faq) => {
  const question = faq.querySelector(".faq__question");
  if (question) {
    question.addEventListener("click", () => toggleFAQ(faq));
  }
});

// TESTIMONIAL
const testimonialItems = document.querySelectorAll(".testimonial__item");
const prevArrow = document.querySelector(".nav-arrow-prev");
const nextArrow = document.querySelector(".nav-arrow-next");
const testimonialContainer = document.querySelector(".testimonial");

let currentTestimonialIndex = 0;
let autoPlayInterval = null;

function showTestimonial(index) {
  testimonialItems.forEach((testimonial) =>
    testimonial.classList.remove("testimonial__item--active")
  );
  if (testimonialItems[index]) {
    testimonialItems[index].classList.add("testimonial__item--active");
  }
}

function NextTestimonial() {
  currentTestimonialIndex =
    (currentTestimonialIndex + 1) % testimonialItems.length;
  showTestimonial(currentTestimonialIndex);
}

function PrevTestimonial() {
  currentTestimonialIndex =
    (currentTestimonialIndex - 1 + testimonialItems.length) %
    testimonialItems.length;
  showTestimonial(currentTestimonialIndex);
}

function startAutoPlay() {
  stopAutoPlay();
  if (testimonialItems.length > 1) {
    autoPlayInterval = setInterval(NextTestimonial, 5000);
  }
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

if (prevArrow) {
  prevArrow.addEventListener("click", () => {
    prevTestimonial();
    startAutoPlay();
  });
}

if (nextArrow) {
  nextArrow.addEventListener("click", () => {
    NextTestimonial();
    startAutoPlay();
  });
}

if (testimonialContainer) {
  testimonialContainer.addEventListener("mouseenter", stopAutoPlay);
  testimonialContainer.addEventListener("mouseleave", startAutoPlay);

  testimonialContainer.addEventListener("touchstart", stopAutoPlay);
}

if (testimonialItems.length > 0) {
  showTestimonial(0);
  startAutoPlay();
}

// VIDEO PLAYER
const videoPlayBtn = document.querySelector(".video-player__play-button");
const videoContainer = document.querySelector(".video-container");

if (videoPlayBtn && videoContainer) {
  videoPlayBtn.addEventListener("click", function () {
    let videoUrl = this.getAttribute("data-video-url");
    // add mute param for autoplay to work reliably
    if (videoUrl && !videoUrl.includes("mute=1")) {
      videoUrl += (videoUrl.includes("?") ? "&" : "?") + "mute=1";
    }
    if (videoUrl) {
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", videoUrl);
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
      videoContainer.innerHTML = "";
      videoContainer.appendChild(iframe);
      this.style.display = "none";
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
