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
  const PETS = parseJson(dataFile);

  //Pet-item dynamic creation
  const SLIDER_TRACK = document.querySelector('.slider__track');
  const PETS_WRAPPER = document.querySelector('.pets__wrapper');
  const PETS_LENGTH = PETS.length;

  const createPetItem = (className, parent) => {
    for (let i = 0; i < PETS_LENGTH; i++) {
      const PET_ITEM =
        `<div class="${className}__item">
        <div class="${className}__img-wrp"><img class="${className}__img undefined" src="${PETS[i].img}"
            alt="homeless pet"></div>
        <div class="${className}__content">
          <p class="${className}__name">${PETS[i].name}</p><button class="btn ${className}__link" data-modal-btn id=${i}>Learn
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
    // const PET_ID = PETS.find((el) => el.id === id);
    modal =
      `<div class="modal-bg">
      <div class="modal"><button class="btn modal__close" data-modal-close><svg class="modal__icon">
            <use xlink:href="assets/img/sprite.svg#close-button"></use>
          </svg></button>
        <div class="modal__inner">
          <div class="modal__img-wrapper"><img class="modal__img" src="${PETS[id].img}"
              alt="homeless pet" data-modal-img></div>
          <div class="modal__content">
            <p class="modal__name" data-modal-name>${PETS[id].name}</p>
            <div class="modal__type-breed">
              <p class="modal__type" data-modal-type>${PETS[id].type}</p><span class="modal__dash">-</span>
              <p class="modal__breed" data-modal-breed>${PETS[id].breed}</p>
            </div>
            <p class="modal__txt" data-modal-txt>${PETS[id].description}</p>
            <ul class="modal__info">
              <li class="modal__info-item"><span class="modal__info-key">Age:</span><span
                  class="modal__info-value" data-modal-age>${PETS[id].age}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Inoculations:</span><span
                  class="modal__info-value" data-modal-inoculations>${PETS[id].inoculations}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Diseases:</span><span
                  class="modal__info-value" data-modal-diseases>${PETS[id].diseases}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Parasites:</span><span
                  class="modal__info-value" data-modal-parasites>${PETS[id].parasites}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>`;

    BODY.insertAdjacentHTML('beforeend', modal);
  };

  let modalCloseBtn;
  const MODAL_OPEN = document.querySelectorAll('[data-modal-btn]');
  // const MODAL_IMG = document.querySelector('[data-modal-img]');
  // const MODAL_NAME = document.querySelector('[data-modal-name]');
  // const MODAL_TYPE = document.querySelector('[data-modal-type]');
  // const MODAL_BREED = document.querySelector('[data-modal-breed]');
  // const MODAL_TXT = document.querySelector('[data-modal-txt]');
  // const MODAL_AGE = document.querySelector('[data-modal-age]');
  // const MODAL_INOCULATIONS = document.querySelector('[data-modal-inoculations]');
  // const MODAL_DISEASES = document.querySelector('[data-modal-diseases]');
  // const MODAL_PARASITES = document.querySelector('[data-modal-parasites]');
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

  window.addEventListener('orientationchange', () => {
    const afterOrientationChange = () => {
      if (document.documentElement.clientWidth > 767) {
        removeBurgerClasses();
      }
      window.removeEventListener('resize', afterOrientationChange);
    };
    window.addEventListener('resize', afterOrientationChange);
  });

  BURGER_BTN.addEventListener('click', toggleBurgerClasses);

  //Blackout
  document.addEventListener('click', (e) => {
    const TARGET = e.target;
    TARGET === PAGE ? slideOut() : false;
    TARGET === modalBg ? modalClose() : false;
  });


  //Slider
  if (document.querySelector('.slider')) {
    let position = 0;
    const SLIDES_TO_SHOW = 3;
    const SLIDES_TO_SCROLL = 1;
    const CONTAINER = document.querySelector('.slider');
    const TRACK = document.querySelector('.slider__track');
    const ITEMS = document.querySelectorAll('.slider__item');
    const ITEMS_COUNT = ITEMS.length;
    const BTN_PREV = document.querySelector('.slider__btn--prev');
    const BTN_NEXT = document.querySelector('.slider__btn--next');
    const ITEM_WIDTH = TRACK.clientWidth / SLIDES_TO_SHOW;
    const MOVE_POSITION = SLIDES_TO_SCROLL * ITEM_WIDTH + 30;

    // ITEMS.forEach((item) => {
    //   if (SLIDES_TO_SHOW === 1) {
    //     item.style.minWidth = `${ITEM_WIDTH}` + 'px';
    //   } else {
    //     item.style.minWidth = `${ITEM_WIDTH}` -90 + 'px';
    //   }
    // });

    BTN_NEXT.addEventListener('click', () => {
      const ITEMS_LEFT = ITEMS_COUNT - (Math.abs(position) + SLIDES_TO_SHOW * ITEM_WIDTH) / ITEM_WIDTH;

      position -= ITEMS_LEFT >= SLIDES_TO_SCROLL ? MOVE_POSITION : ITEMS_LEFT * ITEM_WIDTH;


      SET_POSITION();
    });

    BTN_PREV.addEventListener('click', () => {
      const ITEMS_LEFT = Math.abs(position) / ITEM_WIDTH;

      position += ITEMS_LEFT >= SLIDES_TO_SCROLL ? MOVE_POSITION : ITEMS_LEFT * ITEM_WIDTH;


      SET_POSITION();
    });

    const SET_POSITION = () => {
      TRACK.style.transform = `translateX(${position}px)`;
      CHECK_BTNS();
    }

    const CHECK_BTNS = () => {
      function disabler(btnName, bool) {
        btnName.disabled = bool;
        bool ? btnName.classList.add('slider__btn--inactive') : btnName.classList.remove('slider__btn--inactive');
      }

      if (position === 0) {
        disabler(BTN_PREV, true);
      } else {
        disabler(BTN_PREV, false);
      }

      if (position <= -(ITEMS_COUNT - SLIDES_TO_SHOW) * ITEM_WIDTH) {
        disabler(BTN_NEXT, true);
      } else {
        disabler(BTN_NEXT, false);
      }
    }
    CHECK_BTNS();
  }

  activeLink();
  headerDark();
});
