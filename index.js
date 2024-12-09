document.addEventListener("DOMContentLoaded", function () {
  //swiper inizialization
  let swiperLoaded = false;

  function loadSwiper() {
    if (!swiperLoaded) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
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

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const phoneInput = form.querySelector('input[name="phone_number"]');
    const emailInput = document.getElementById("email");
    const generalErrorsContainer = document.getElementById("generalErrors");

    clearErrors();

    let isValid = true;
    const errors = []; // Массив для сбора ошибок

    // Проверка имени
    if (nameInput.value.trim() === "") {
      showInputError(nameInput);
      errors.push("Please fill the name field");
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showInputError(nameInput);
      errors.push("Name must be at least 2 characters.");
      isValid = false;
    }

    // Проверка телефона
    if (phoneInput.value.trim() === "") {
      showInputError(phoneInput);
      errors.push("Please fill the phone field");
      isValid = false;
    }

    // Проверка email
    if (!validateEmail(emailInput.value.trim())) {
      showInputError(emailInput);
      errors.push("Please enter a valid email address.");
      isValid = false;
    }

    // Генерация сообщений на основе комбинаций ошибок
    if (errors.length > 0) {
      const uniqueErrors = [...new Set(errors)]; // Убираем дубли
      if (errors.length === 3) {
        generalErrorsContainer.textContent =
          "Please fill in name, phone and email fields";
      } else {
        generalErrorsContainer.textContent = uniqueErrors.join(" ");
      }
    } else {
      generalErrorsContainer.textContent = "";
      alert("Form submitted successfully!");
      form.submit();
    }
  });

  // Функция для очистки ошибок
  function clearErrors() {
    const generalErrorsContainer = document.getElementById("generalErrors");
    generalErrorsContainer.textContent = ""; // Очищаем общий блок ошибок

    const inputs = form.querySelectorAll(".error");
    inputs.forEach((input) => input.classList.remove("error"));
  }

  // Добавление класса ошибки для полей
  function showInputError(input) {
    input.classList.add("error"); // Красная рамка для поля
  }

  // Проверка email с помощью регулярного выражения
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

  window.addEventListener("scroll", applyParallax);

  const parallaxElement2 = document.querySelector(".parallax-2");

  function apply2Parallax() {
    const scrollPosition = window.scrollY;
    const offset = scrollPosition * 0.1;

    parallaxElement2.style.transform = `translateY(-${offset}px)`;
  }

  window.addEventListener("scroll", apply2Parallax);
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
