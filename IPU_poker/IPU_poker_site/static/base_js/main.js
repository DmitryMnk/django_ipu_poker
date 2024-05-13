import { openModal, openModalLink } from "./functons.js";
import Swiper from '../package/swiper-bundle.min.mjs'

function toggle(burger, nav, animation) {
    if (!animation) {
        nav.style.transition = 'transform 300ms ease-in-out';
        burger.classList.toggle('burger--active');
        nav.classList.toggle('header-nav--active');
        animationStop = true;
        setTimeout(() => {
            animationStop = false;
        }, 200)
    }
}

const linkModal = document.querySelectorAll('.modal-link-footer')
const swiperBlock = document.querySelector('.swiper__swiper');
const headerBurgerButton = document.querySelector('.header__burger');
const burgerNav = document.querySelector('.header__nav');
const burgerNavLink = document.querySelectorAll('.header__nav-link');
let animationStop = false;
let slides = 0;

if (screen.availWidth > 1200) {
    slides = 5;
} else if (screen.availWidth > 768) {
    slides = 4;
} else if (screen.availWidth > 576) {
    slides = 2;
} else {
    slides = 1;
}

document.addEventListener('click', (e) => {
    if (headerBurgerButton.classList.contains('burger--active') && !animationStop) {
        if (!burgerNav.contains(e.target)) {
            toggle(headerBurgerButton, burgerNav, animationStop);
        }
    }
});

headerBurgerButton.addEventListener('click', () => {
    toggle(headerBurgerButton, burgerNav, animationStop);
})

burgerNav.addEventListener('transitionend', () => {
    burgerNav.style.transition = '';
})

burgerNavLink.forEach(elem => elem.addEventListener('click', () => {
    if (headerBurgerButton.classList.contains('burger--active')) {
        toggle(headerBurgerButton, burgerNav, animationStop);
    }
}))

linkModal.forEach(elem => elem.addEventListener('click', (e) => {
    e.preventDefault();
    openModalLink();
    console.log()
}))

var swiper = new Swiper(swiperBlock, {
    spaceBetween: 5,
    slidesPerView: slides,
    loop: true,
    freeMode: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  