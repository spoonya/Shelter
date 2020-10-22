document.addEventListener('DOMContentLoaded', () => {
  /*****JSON parse*****/
  const DATA_FILE = require('../json/pets.json');
  const parseJson = (json) => {
    return JSON.parse(JSON.stringify(json));
  };

  /*****Pet-item dynamic creation*****/
  const SLIDER_TRACK = document.querySelector('.slider__track');
  const PETS_WRAPPER = document.querySelector('.pets__wrapper');

  //CLick event add
  const modalOpenBtnEventAdd = () => document.querySelectorAll('[data-modal-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      modalCreate(parseInt(btn.getAttribute('id')));
      modalOpen();
    });
  });

  //Shuffle array
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  let pets = shuffleArray(parseJson(DATA_FILE));
  let petsLength = pets.length;

  //Create pagination items
  const PAG_FIRST_BTN = document.querySelector('[data-pag-first]');
  const PAG_PREV_BTN = document.querySelector('[data-pag-prev]');
  const PAG_PAGE = document.querySelector('[data-pag-page]');
  const PAG_NEXT_BTN = document.querySelector('[data-pag-next]');
  const PAG_LAST_BTN = document.querySelector('[data-pag-last]');

  let petsExtended = [];

  const createPetItemPaginationArray = () => {
    const MULTIPLIER = 6;

    for (let i = 0; i < MULTIPLIER; i++) {
      petsExtended.push(shuffleArray(pets.slice()));
    }

    petsExtended = petsExtended.flat();
    console.log(petsExtended);
    displayPetItemPagination(false);
  };

  //Pagination btns check
  const checkPagBtnDisabling = () => {
    const PETS_EXTENDED_LENGTH = petsExtended.length;

    if (PETS_EXTENDED_LENGTH > itemsMaxDisplayCount()) {
      if (lastDisplayed - itemsMaxDisplayCount() <= 0) {
        PAG_NEXT_BTN.removeAttribute('disabled');
        PAG_LAST_BTN.removeAttribute('disabled');
        PAG_PREV_BTN.setAttribute('disabled', 'true');
        PAG_FIRST_BTN.setAttribute('disabled', 'true');
      } else if (lastDisplayed === PETS_EXTENDED_LENGTH - 1) {
        PAG_NEXT_BTN.setAttribute('disabled', 'true');
        PAG_LAST_BTN.setAttribute('disabled', 'true');
        PAG_PREV_BTN.removeAttribute('disabled');
        PAG_FIRST_BTN.removeAttribute('disabled');
      } else {
        PAG_NEXT_BTN.removeAttribute('disabled');
        PAG_LAST_BTN.removeAttribute('disabled');
        PAG_PREV_BTN.removeAttribute('disabled');
        PAG_FIRST_BTN.removeAttribute('disabled');
      }
    } else {
      PAG_NEXT_BTN.setAttribute('disabled', 'true');
      PAG_LAST_BTN.setAttribute('disabled', 'true');
      PAG_PREV_BTN.setAttribute('disabled', 'true');
      PAG_FIRST_BTN.setAttribute('disabled', 'true');
    }
  };

  //Display pagination items
  let startIdx = 0;
  let curPage = 1;
  let lastDisplayed;

  const itemsMaxDisplayCount = () => {
    let itemsToDisplay;
    if (document.documentElement.clientWidth <= 767) {
      itemsToDisplay = 3;
    } else if (document.documentElement.clientWidth <= 1279) {
      itemsToDisplay = 6;
    } else if (document.documentElement.clientWidth) {
      itemsToDisplay = 8;
    }

    return itemsToDisplay;
  };

  const displayPetItemPagination = (onResize, idx = 0) => {
    while (PETS_WRAPPER.firstChild) {
      PETS_WRAPPER.removeChild(PETS_WRAPPER.firstChild);
    }

    let displayCount = 0;
    let maxCount = itemsMaxDisplayCount();
    if (petsExtended.length - idx >= maxCount) {
      displayCount = maxCount;
    } else {
      displayCount = petsExtended.length - idx;
    }

    for (let i = idx; i < idx + displayCount; i++) {
      const PET_ITEM =
        `<div class="pets__item" data-modal-btn id=${petsExtended[i].id}>
          <div class="pets__img-wrp">
            <img class="pets__img" src="${petsExtended[i].img}" alt="homeless pet">
          </div>
          <div class="pets__content">
            <p class="pets__name">${petsExtended[i].name}</p>
            <button class="btn pets__link">Learn more</button>
          </div>
        </div>`;

      PETS_WRAPPER.insertAdjacentHTML('beforeend', PET_ITEM);
    }

    !onResize ? itemsAnime(PETS_WRAPPER, 'pets', 0) : false;

    if (onResize) {
      startIdx = 0;
      PAG_PAGE.innerHTML = curPage = 1;
    }
    lastDisplayed = displayCount + idx - 1;

    console.log(lastDisplayed);
    modalOpenBtnEventAdd();
    checkPagBtnDisabling();
  };

  //Pagination buttons
  if (document.querySelector('.pets__pag')) {
    PAG_NEXT_BTN.addEventListener('click', () => {
      displayPetItemPagination(false, startIdx += itemsMaxDisplayCount());
      PAG_PAGE.innerHTML = ++curPage;
    });

    PAG_PREV_BTN.addEventListener('click', () => {
      displayPetItemPagination(false, startIdx -= itemsMaxDisplayCount());
      PAG_PAGE.innerHTML = --curPage;
    });

    PAG_FIRST_BTN.addEventListener('click', () => {
      displayPetItemPagination(false, startIdx = 0);
      PAG_PAGE.innerHTML = curPage = 1;
    });

    PAG_LAST_BTN.addEventListener('click', () => {
      PAG_PAGE.innerHTML = curPage = Math.ceil(petsExtended.length / itemsMaxDisplayCount());
      displayPetItemPagination(false, startIdx = (curPage - 1) * itemsMaxDisplayCount());
    });
  }

  //Animation
  const itemsAnime = (parent, className, delay) => {
    parent.classList.remove(`${className}__anime`);

    setTimeout(() => {
      parent.classList.add(`${className}__anime`);
    }, delay);
  };

  //Create and dislpay slider items
  const createPetItemSlider = (isSliderRand = false) => {
    if (isSliderRand) {
      while (SLIDER_TRACK.firstChild) {
        SLIDER_TRACK.removeChild(SLIDER_TRACK.firstChild);
      }

      pets = shuffleArray(pets)
    }

    for (let i = 0; i < petsLength; i++) {
      const PET_ITEM =
        `<div class="slider__item" data-modal-btn id=${pets[i].id}>
          <div class="slider__img-wrp">
            <img class="slider__img" src="${pets[i].img}" alt="homeless pet">
          </div>
          <div class="slider__content">
            <p class="slider__name">${pets[i].name}</p>
            <button class="btn slider__link">Learn more</button>
          </div>
        </div>`;

      SLIDER_TRACK.insertAdjacentHTML('beforeend', PET_ITEM);

      itemsAnime(SLIDER_TRACK, 'slider', 100);
    }
    modalOpenBtnEventAdd();
  };

  //Modal dynamic creation
  const BODY = document.querySelector('body');
  let modal;

  const modalCreate = (id) => {
    for (let i = 0; i < petsLength; i++) {
      if (pets[i].inoculations.length > 1) pets[i].inoculations = pets[i].inoculations.join(', ').split();
      if (pets[i].diseases.length > 1) pets[i].diseases = pets[i].diseases.join(', ').split();
      if (pets[i].parasites.length > 1) pets[i].parasites = pets[i].parasites.join(', ').split();
    }
    const PET = pets.find((el) => el.id === id);
    modal =
      `<div class="modal-bg">
      <div class="modal"><button class="btn modal__close" data-modal-close><svg class="modal__icon">
            <use xlink:href="assets/img/sprite.svg#close-button"></use>
          </svg></button>
        <div class="modal__inner">
          <div class="modal__img-wrapper"><img class="modal__img" src="${PET.img}"
              alt="homeless pet" data-modal-img></div>
          <div class="modal__content">
            <p class="modal__name" data-modal-name>${PET.name}</p>
            <div class="modal__type-breed">
              <p class="modal__type" data-modal-type>${PET.type}</p><span class="modal__dash">-</span>
              <p class="modal__breed" data-modal-breed>${PET.breed}</p>
            </div>
            <p class="modal__txt" data-modal-txt>${PET.description}</p>
            <ul class="modal__info">
              <li class="modal__info-item"><span class="modal__info-key">Age:</span><span
                  class="modal__info-value" data-modal-age>${PET.age}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Inoculations:</span><span
                  class="modal__info-value" data-modal-inoculations>${PET.inoculations}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Diseases:</span><span
                  class="modal__info-value" data-modal-diseases>${PET.diseases}</span></li>
              <li class="modal__info-item"><span class="modal__info-key">Parasites:</span><span
                  class="modal__info-value" data-modal-parasites>${PET.parasites}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>`;
    BODY.insertAdjacentHTML('beforeend', modal);
  };

  let modalCloseBtn;
  let modalBg;

  const modalOpen = () => {
    BODY.classList.add('scroll-hidden');
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      BODY.style.paddingRight = 15 + 'px';
    }

    modalCloseBtn = document.querySelector('[data-modal-close]');
    modalCloseBtn.addEventListener('click', modalClose);
    modalBg = document.querySelector('.modal-bg');
  };

  const modalClose = () => {
    BODY.classList.remove('scroll-hidden');
    BODY.style.paddingRight = 0;
    document.querySelector('.modal-bg').remove();
  };

  /*****Burger-menu*****/
  const BURGER_BTN = document.querySelector('[data-burger]');
  const MENU = document.querySelector('[data-menu]');
  const PAGE = document.querySelector('.page');
  const HEADER = document.querySelector('.header');
  const HEADER_INNER = document.querySelector('.header__inner');
  const TITLE = document.querySelector('.header__title');

  const slideOut = () => {
    HEADER.classList.toggle('slide-out');
    setTimeout(removeBurgerClasses, 300);
  };

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

  /*****Blackout*****/
  document.addEventListener('click', (e) => {
    const TARGET = e.target;
    TARGET === PAGE ? slideOut() : false;
    TARGET === modalBg ? modalClose() : false;
  });

  /*****Slider*****/
  const sliderWidthCheck = () => {
    if (!SLIDER_TRACK) return;
    if (SLIDER_TRACK.clientWidth === 990) {
      slidesToScroll = 3;
    } else if (SLIDER_TRACK.clientWidth === 580) {
      slidesToScroll = 2;
    } else {
      slidesToScroll = 1;
    }
  };

  if (SLIDER_TRACK) {
    // let items = document.querySelectorAll('.slider__item');
    const BTN_PREV = document.querySelector('.slider__btn--prev');
    const BTN_NEXT = document.querySelector('.slider__btn--next');
    // let slidesToScroll;

    BTN_NEXT.addEventListener('click', () => {
      items = document.querySelectorAll('.slider__item');
      createPetItemSlider(true);
      // for (let i = 0; i < slidesToScroll; i++) {
      //   TRACK.append(items[i]);
      // }
    });

    BTN_PREV.addEventListener('click', () => {
      items = document.querySelectorAll('.slider__item');
      createPetItemSlider(true);
      // for (let i = 0; i < slidesToScroll; i++) {
      //   TRACK.prepend(items[items.length - 1 - i]);
      // }
    });

    sliderWidthCheck();
  }

  /*****Resize check*****/
  window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth > 767) {
      removeBurgerClasses();
    }
    sliderWidthCheck();

    if (currentMaxDisplay !== itemsMaxDisplayCount()) {
      currentMaxDisplay = itemsMaxDisplayCount();
      displayPetItemPagination(true);
    }
  });

  /*****Scroll check*****/
  window.addEventListener('scroll', function () {
    const HEADER_SECONDARY = document.querySelector('.header--dark');
    if (!HEADER_SECONDARY) return;

    if (pageYOffset > 25) {
      HEADER_SECONDARY.classList.add('fixed');
    } else {
      HEADER_SECONDARY.classList.remove('fixed');
    }
  });

  /*****Header secondary*****/
  (() => {
    let page = document.title;
    if (page != 'Shelter') {
      document.querySelector('.header').classList.add('header--dark');
    } else {
      document.querySelector('.header').classList.remove('header--dark');
    }
  })();

  /*****Active link*****/
  (() => {
    const LINKS = document.querySelectorAll('.header__menu-link');

    if (document.title == 'Shelter') {
      LINKS[0].classList.add('header__menu-link--active');
      TITLE.setAttribute('onclick', 'return false');
    } else if (document.title == 'Shelter - Our pets') {
      LINKS[1].classList.add('header__menu-link--active');
      TITLE.removeAttribute('onclick');
    }
  })();

  let currentMaxDisplay = itemsMaxDisplayCount();
  SLIDER_TRACK ? createPetItemSlider() : false;
  PETS_WRAPPER ? createPetItemPaginationArray() : false;
});
