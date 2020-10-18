document.addEventListener('DOMContentLoaded', () => {
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

  //Modal
  const MODAL_BTN = document.querySelectorAll('[data-modal-btn]');
  const MODAL_CLOSE = document.querySelector('[data-modal-close]');
  const MODAL_BG = document.querySelector('.modal-bg');

  const modalOpen = () => {
    BODY.classList.add('scroll-hidden');
    MODAL_BG.classList.add('modal-bg--active');
  };

  const modalClose = () => {
    MODAL_BG.classList.remove('modal-bg--active');
    BODY.classList.remove('scroll-hidden');
  };

  MODAL_BTN.forEach((btn) => {
    btn.addEventListener('click', modalOpen);
  });

  MODAL_CLOSE.addEventListener('click', modalClose);

  //Burger-menu
  const BURGER_BTN = document.querySelector('[data-burger]');
  const MENU = document.querySelector('[data-menu]');
  const PAGE = document.querySelector('.page');
  const HEADER = document.querySelector('.header');
  const HEADER_INNER = document.querySelector('.header__inner');
  const BODY = document.querySelector('body');
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

  document.addEventListener('click', (e) => {
    const TARGET = e.target;
    TARGET === PAGE ? slideOut() : false;
    TARGET === MODAL_BG ? modalClose() : false;
  });


  activeLink();
  headerDark();
});
