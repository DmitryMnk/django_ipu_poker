import { openModal } from "./functons.js";
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

let english = false;

const DICT = {
    'Белый список клубов': 'White list',
    'Черный список клубов': 'Black list',
    'Белый список': 'White list',
    'Черный список': 'Black list',
    'Главная': 'Home',
    'Обучение': 'Learn',
    'О нас': 'About us',
    'Контакты': 'Контакты',
    'Почему нас выбирают?': 'Why Choose Us?',
    'Надёжность': 'Reliability',
    'Лучшие сделки': 'Best deals',
    'Индивидуальный подход':' Individual approach',
    'Обучение': 'Training',
    'Компетентность': 'Competence',
    'Наши услуги': 'What services we provide',
    'Доступ в крупные, приватные и эксклюзивные клубы, союзы, румы.': 'Access to large, private and exclusive clubs, unions, and rooms.',
    'Не знаешь где начать играть? Пиши мы подберём место индивидуально для тебя.': 'Undecided where to start playing? Write to us and we will choose a place individually for you.',
    'Обучение для новичков в индустрии. Создай с нами свой покерный клуб.': 'Training for beginners in the industry. Create your own poker club with us.',
    'Если у игрока возникают проблемы с покер-румом или клубом мы прикладываем все усилия для их решения.': 'If a player has problems with a poker room or a club, we make every effort to solve them.',
    'Мы поможем разобраться в любом спорном вопросе с покерными клубами из нашего белого списка в независимости от того через кого вы играли': 'We will help you sort out any controversial issue with poker clubs from our white list, regardless of who you played through',
    'Наша команда работает более 10 лет в сфере онлайн покера, мобильных покерных приложений и покерных сетей. \
        Обеспечиваем нашим игрокам и партнёрам высокий уровень сервиса. Быстрая и надёжная поддержка гарантирует \
        удобство игры.': 'Our team has been working for more than 10 years in the field of online poker, mobile poker \
        applications and poker networks. We provide our players and partners with a high level of service. Fast and \
        reliable support guarantees the convenience of the game.',
    'Отслеживая актуальные тенденции в мире онлайн покера, мы предлагаем самые выгодные условия и высокий доход. Так \
        же, у нас вы можете найти большое количество приватных клубов, с превосходным полем.' : 'By keeping up with current \
        trends in the world of online poker, we can be the first to know about important news and developments. We can help you \
        make informed decisions about where to go next in the industry and provide you with the best possible conditions and highest possible income.',
    'Персональный подход к каждому игроку. Помощь для новичков и раскрытие тонкостей индустрии для профессионалов, которые помогут \
        увеличить доход': "A personalized approach to each client. Assistance for beginners and a deeper understanding of the \
        industry's complexities for professionals, which will help increase their earnings.",
    'Сети, румы и приложения': ' Networks, rooms and applications ',
    'Остались вопросы?': 'Do you have any other questions?',
    'Свяжись с нами любым удобным способом и начни зарабатывать вместе с нами': 'Write to us, we will help you make a choice and offer the best conditions',
    'Игрокам': 'For players',
    'Лучшие покерные приложения': 'The Best Poker Apps',
    'Подборка клубов': 'A selection of clubs',
    'Где скачать покер': 'Where to download poker',
    'Программы для покера': 'Poker Programs',
    'Обучение': 'Learn',
    'Как создать покерный клуб': 'How to create a poker club',
    'Выбор приложения': 'Application Selection',
    'Покерные расчёты': 'Poker calculations',
    'Рейкбэк': 'Rakeback',
    'Новости': 'News',
    'Лучшие румы': 'Best poker rooms and apps',
    'Полезное о покере': 'Useful information',
    'Список покерных мошенников': 'List of poker scammers',
    'Список надёжных клубов': 'List of reliable clubs',
    'Бонусы покер-румов': 'Poker Room Bonuses',
    'Где начать играть': 'Where to start playing poker',
    'Мы поможем с решением любых вопросов возникших с клубами из белого списка. \
        Данный список создан с целью помочь игрокам столкнувшимся с отсутствием коммуникации \
        с клубами или мошенничеством со стороны агентов работающих с клубами из списка.': 'We will assist you in resolving any issues that \
        may arise with clubs from our white list. This list has been created to help players who experience communication difficulties with \
        clubs or fraudulent behavior on the part of agents who work with clubs on the list.',
    'Клубы, агенты, контакты добавленные в чёрный список по нашему мнению несут вред \
        индустрии и мы считаем нашим долгом предупредить игроков и коллег о опасности. Если \
        вы столкнулись с нечестным поведением со стороны представителей индустрии вы можете \
        связать с нами, при наличии достаточных доказательств они попадут в публичный чёрный список.' : 'Clubs, agents, and contacts added to the \
        blacklist are, in our opinion, harmful to the industry. We consider it our duty to warn players and colleagues about this danger. If you \
        encounter dishonest behavior from industry representatives, please contact us. If there is sufficient evidence, we will place them on a public blacklist.',
    'Напишите нам, поможем сделать выбор и предложим лучшие условия': 'Write to us, we will help you choose and offer the best conditions.',
    'Игры на деньги могут вызывать игровую зависимость. Относитесь к покеру, как к досугу, а не источнику дохода. Контролируйте расходы и \
        придерживайтесь принципов Ответственной игры. Если замечаете признаки зависимости, обратитесь за помощью к специалистам.': ''
}

const deleteRowButtons = document.querySelectorAll('.list-item-delete-link')
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
  