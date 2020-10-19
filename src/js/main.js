document.addEventListener('DOMContentLoaded', () => {
  //Header dark
  function headerDark() {
    let page = document.title;
    if (page != 'Shelter') {
      document.querySelector('.header').classList.add('header--dark');
    } else {
      document.querySelector('.header').classList.remove('header--dark');
    }
  }

  //Active link
  function activeLink() {
    let links = document.querySelectorAll('.header__menu-link');

    if (document.title == 'Shelter') {
      links[0].classList.add('header__menu-link--active');
      TITLE.setAttribute('onclick', 'return false');
    } else if (document.title == 'Shelter - Our pets') {
      links[1].classList.add('header__menu-link--active');
      TITLE.removeAttribute('onclick');
    }
  }

  //JSON parse


  let dataFile = require('../json/pets.json');
  const parseJson = (json) => {
    return JSON.parse(JSON.stringify(json));
  };

  //Pet-item dynamic creation
  const SLIDER_TRACK = document.querySelector('.slider__track');
  const PETS_WRAPPER = document.querySelector('.pets__wrapper');

  const shuffleArray = (arr)=> {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  let pets = shuffleArray(parseJson(dataFile));
  const PETS_LENGTH = pets.length;
  console.log(pets);

  const createPetItem = (className, parent, isSliderRand = false) => {
    isSliderRand ? pets = shuffleArray(pets) : false;
    if (isSliderRand) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }

    for (let i = 0; i < PETS_LENGTH; i++) {
      const PET_ITEM =
        `<div class="${className}__item">
        <div class="${className}__img-wrp"><img class="${className}__img undefined" src="${pets[i].img}"
            alt="homeless pet"></div>
        <div class="${className}__content">
          <p class="${className}__name">${pets[i].name}</p><button class="btn ${className}__link" data-modal-btn id=${pets[i].id}>Learn
            more</button>
        </div>`;

      parent.insertAdjacentHTML('beforeend', PET_ITEM);
    }
  };

  SLIDER_TRACK ? createPetItem('slider', SLIDER_TRACK) : false;
  PETS_WRAPPER ? createPetItem('pets', PETS_WRAPPER) : false;

  //Modal dynamic creation
  const BODY = document.querySelector('body');
  let modal;

  const modalCreate = (id) => {
    for (let i = 0; i < PETS_LENGTH; i++) {
      if (pets[i].inoculations.length > 1) pets[i].inoculations = pets[i].inoculations.join(', ').split();
      if (pets[i].diseases.length > 1) pets[i].diseases = pets[i].diseases.join(', ').split();
      if (pets[i].parasites.length > 1) pets[i].parasites = pets[i].parasites.join(', ').split();
    }
    const PET_ID = pets.find((el) => el.id === id);
    modal =
      `<div class="modal-bg">
      <div class="modal"><button class="btn modal__close" data-modal-close><svg class="modal__icon">
            <use xlink:href="assets/img/sprite.svg#close-button"></use>
          </svg></button>
        <div class="modal__inner">
          <div class="modal__img-wrapper"><img class="modal__img" src="${PET_ID.img}"
              alt="homeless pet" data-modal-img></div>
          <div class="modal__content">
            <p class="modal__name" data-modal-name>${PET_ID.name}</p>
            <div class="modal__type-breed">
              <p class="modal__type" data-modal-type>${PET_ID.type}</p><span class="modal__dash">-</span>
              <p class="modal__breed" data-modal-breed>${PET_ID.breed}</p>
            </div>
            <p class="modal__txt" data-modal-txt>${PET_ID.description}</p>
            <ul class="modal__info">
              <li class="modal__info-item"><span class="modal__info-key">Age:</span><span
                  class="modal__info-value" data-modal-age>${PET_ID.age}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Inoculations:</span><span
                  class="modal__info-value" data-modal-inoculations>${PET_ID.inoculations}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Diseases:</span><span
                  class="modal__info-value" data-modal-diseases>${PET_ID.diseases}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Parasites:</span><span
                  class="modal__info-value" data-modal-parasites>${PET_ID.parasites}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>`;
    BODY.insertAdjacentHTML('beforeend', modal);
  };

  const MODAL_OPEN = document.querySelectorAll('[data-modal-btn]');
  let modalCloseBtn;
  let modalBg;

  const modalOpen = () => {
    BODY.classList.add('scroll-hidden');
    modalCloseBtn = document.querySelector('[data-modal-close]');
    modalCloseBtn.addEventListener('click', modalClose);
    modalBg = document.querySelector('.modal-bg');
  };

  const modalClose = () => {
    BODY.classList.remove('scroll-hidden');
    document.querySelector('.modal-bg').remove();
  };

  MODAL_OPEN.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalCreate(parseInt(btn.getAttribute('id')));
      modalOpen();
    });
  });

  //Burger-menu
  const BURGER_BTN = document.querySelector('[data-burger]');
  const MENU = document.querySelector('[data-menu]');
  const PAGE = document.querySelector('.page');
  const HEADER = document.querySelector('.header');
  const HEADER_INNER = document.querySelector('.header__inner');
  const TITLE = document.querySelector('.header__title');

  const slideOut = () => {
    HEADER.classList.toggle('slide-out');
    setTimeout(removeBurgerClasses, 300);
  }

  const toggleBurgerClasses = () => {
    const IS_OPEN = HEADER.classList.contains('slide-in');

    if (!IS_OPEN) {
      MENU.classList.toggle('header__menu--burger');
      BURGER_BTN.classList.toggle('header__burger-btn--revert');
      HEADER.classList.add('header--burger');
      HEADER_INNER.classList.toggle('header__inner--burger');
      PAGE.classList.toggle('page--dark');
      BODY.classList.toggle('scroll-hidden');
      HEADER.classList.remove('slide-out');
      HEADER.classList.toggle('slide-in');
    } else {
      slideOut();
    }
  };

  const removeBurgerClasses = () => {
    MENU.classList.remove('header__menu--burger');
    BURGER_BTN.classList.remove('header__burger-btn--revert');
    HEADER.classList.remove('header--burger');
    HEADER_INNER.classList.remove('header__inner--burger');
    PAGE.classList.remove('page--dark');
    HEADER.classList.remove('slide-in');
    BODY.classList.remove('scroll-hidden');
  };

  BURGER_BTN.addEventListener('click', toggleBurgerClasses);

  //Blackout
  document.addEventListener('click', (e) => {
    const TARGET = e.target;
    TARGET === PAGE ? slideOut() : false;
    TARGET === modalBg ? modalClose() : false;
  });

  //Slider
  if (document.querySelector('.slider')) {
    let items = document.querySelectorAll('.slider__item');
    const TRACK = document.querySelector('.slider__track');
    const BTN_PREV = document.querySelector('.slider__btn--prev');
    const BTN_NEXT = document.querySelector('.slider__btn--next');
    let slidesToScroll;

    var sliderWidthCheck = () => {
      if (TRACK.clientWidth === 990) {
        slidesToScroll = 3;
      } else if (TRACK.clientWidth === 580) {
        slidesToScroll = 2;
      } else {
        slidesToScroll = 1;
      }
    };

    const sliderAddAnime = () => {
      TRACK.classList.add('slider__anime');
    };

    const sliderRemoveAnime = () => {
      TRACK.classList.remove('slider__anime');
    };

    const SET_POSITION = () => {
      sliderRemoveAnime();
      setTimeout(sliderAddAnime, 100);
    }

    BTN_NEXT.addEventListener('click', () => {
      items = document.querySelectorAll('.slider__item');
      createPetItem('slider', SLIDER_TRACK, true);
      // for (let i = 0; i < slidesToScroll; i++) {
      //   TRACK.append(items[i]);
      // }
      SET_POSITION(true);
    });

    BTN_PREV.addEventListener('click', () => {
      items = document.querySelectorAll('.slider__item');
      createPetItem('slider', SLIDER_TRACK, true);
      // for (let i = 0; i < slidesToScroll; i++) {
      //   TRACK.prepend(items[items.length - 1 - i]);
      // }
      SET_POSITION(false);
    });
  }

  window.addEventListener('orientationchange', () => {
    const afterOrientationChange = () => {
      if (document.documentElement.clientWidth > 767) {
        removeBurgerClasses();
      }
      sliderWidthCheck();
      window.removeEventListener('resize', afterOrientationChange);
    };
    window.addEventListener('resize', afterOrientationChange);
  });

  activeLink();
  headerDark();
  shuffleArray(pets);
  sliderWidthCheck();
});
