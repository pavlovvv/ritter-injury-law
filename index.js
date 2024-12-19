//swiper inizialization
let swiperLoaded = false;

function loadSwiper() {
  if (!swiperLoaded) {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    script.onload = () => {
      new Swiper(".reviews-swiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: 1.08,
        spaceBetween: 16,
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          1240: {
            slidesPerView: 3,
            spaceBetween: 40,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        },
      });

      new Swiper(".portfolio-swiper", {
        navigation: {
          nextEl: ".swiper-button-next-1",
          prevEl: ".swiper-button-prev-1",
        },
        pagination: {
          el: ".swiper-pagination-1",
          clickable: true,
        },
        slidesPerView: 1.08,
        spaceBetween: 16,
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        autoplay: {
          delay: 5000,
        },
        breakpoints: {
          1240: {
            slidesPerView: 3,
            spaceBetween: 40,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        },
      });
    };
    document.body.appendChild(script);
    swiperLoaded = true;
  }
}

// Загрузка Swiper при скролле
window.addEventListener("scroll", loadSwiper, { once: true });

// drawer
const burgerIcon = document.querySelector(".burger__icon");
const burgerMenu = document.querySelector(".burger__menu");

if (burgerIcon && burgerMenu) {
  burgerIcon.addEventListener("click", () => {
    burgerIcon.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    document.body.style.overflow = burgerMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  document.addEventListener("click", (event) => {
    if (
      !burgerMenu.contains(event.target) &&
      !burgerIcon.contains(event.target)
    ) {
      burgerIcon.classList.remove("active");
      burgerMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

//form-validation
const form = document.getElementById("myForm");
if (form) form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const phoneInput = form.querySelector('input[name="phone_number"]');
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  clearErrors();

  let isValid = true;

  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError, "Full Name is required.");
    isValid = false;
  } else if (nameInput.value.trim().length < 2) {
    showError(nameInput, nameError, "Name must be at least 2 characters.");
    isValid = false;
  }

  if (phoneInput.value.trim() === "") {
    showError(phoneInput, null, "Phone is required");
    isValid = false;
  }

  if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    isValid = false;
  }

  if (messageInput.value.trim() === "") {
    showError(messageInput, messageError, "Message is required");
    isValid = false;
  }

  if (isValid) {
    alert("Form submitted successfully!");
    form.submit();
  }
});

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => (error.textContent = ""));
  const inputs = form.querySelectorAll(".error");
  inputs.forEach((input) => input.classList.remove("error"));
}

function showError(input, errorBlock, message) {
  input.classList.add("error");
  if (errorBlock) {
    errorBlock.textContent = message;
  } else {
    const error = document.createElement("div");
    error.className = "error-message";
    error.textContent = message;
    input.parentNode.appendChild(error);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

//currentYear
const yearElement = document.getElementById("currentYear");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;

//animations
const fadeInElements = document.querySelectorAll(".fade-in");

const handleScroll = () => {
  fadeInElements.forEach(function (element) {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      element.classList.add("visible");
    }
  });
};

handleScroll();

window.addEventListener("scroll", handleScroll);

const parallaxElement = document.querySelector(".parallax");

function applyParallax() {
  const scrollPosition = window.scrollY;
  const offset = scrollPosition * 0.08;

  parallaxElement.style.transform = `translateY(-${offset}px)`;
}

if (parallaxElement) window.addEventListener("scroll", applyParallax);

const parallaxElement2 = document.querySelector(".parallax-2");

function apply2Parallax() {
  const scrollPosition = window.scrollY;
  const offset = scrollPosition * 0.1;

  parallaxElement2.style.transform = `translateY(-${offset}px)`;
}

if (parallaxElement2) window.addEventListener("scroll", apply2Parallax);

//accordions

const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const header = accordion.querySelector(".accordion-header");
  header.addEventListener("click", () => {
    accordion.classList.toggle("open");

    const content = accordion.querySelector(".accordion-content");
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 24 + "px";
    }
  });
});

const headerAccordions = document.querySelectorAll(".header-accordion");

headerAccordions.forEach((headerAccordion) => {
  const header = headerAccordion.querySelector(".header-accordion__top");
  const arrow = headerAccordion.querySelector(".accordion__arrow");
  header.addEventListener("click", () => {
    headerAccordion.classList.toggle("open");
    arrow.classList.toggle("open");

    const content = headerAccordion.querySelector(".header-accordion__content");
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 24 + "px";
    }
  });
});

//scroll events
window.addEventListener("scroll", function () {
  var header = document.querySelector(".header-wrapper");
  if (window.scrollY > 150) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
