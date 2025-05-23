const modalForm = $('.modal-form');
const header__burger = $('.header__burger');
const burgerMenu = $('.burger-menu');
const headerPhone = $('.header__phone');
const burgerMenu__linkTtext = $('.burger-menu__link-text');
const burgerMenu__item = $('.burger-menu__item');
const burgerBorderOne = $('.header__burger-border:nth-child(1)');
const burgerBorderTwo = $('.header__burger-border:nth-child(2)');
const burgerBorderThree = $('.header__burger-border:nth-child(3)');

let prevActiveElement;

function addInnert(elem) {
  prevActiveElement = document.activeElement;
  for (let i = 0; i < document.body.children.length; i++) {
    if (document.body.children[i] !== elem) {
      document.body.children[i].inert = true;
    }
  };
  for (let i = 0; i < document.body.children.length; i++) {
    if (elem === burgerMenu.get(0) && document.body.children[i] === $('.header').get(0)) {
      document.body.children[i].inert = false;
      for (let k = 0; k < $('.header__container').get(0).children.length; k++) {
        if ($('.header__container').get(0).children[k] === $('.header__burger').get(0))
          $('.header__container').get(0).children[k].inert = false;
        else $('.header__container').get(0).children[k].inert = true;
      }
    }
  };
  elem.inert = false;
  if (elem.closest('[inert]')) elem.closest('[inert]').inert = false;
  for (let i = 0; i < window.elemsInert.length; i++) {
    if (elem === window.elemsInert[i].elem && window.elemsInert[i].esc) {
      function esc(e) {
        if (e.key == 'Escape') {
          window.elemsInert[i].esc()
        }
        document.removeEventListener('keydown', esc);
      }
      document.addEventListener('keydown', esc);
    }
  }
}

function activationInnert(elemsInert) {
  window.elemsInert = elemsInert;
  function removeInnert(elem) {
    if (elem) {
      for (let i = 0; i < document.body.children.length; i++) {
        if (document.body.children[i] !== elem) {
          document.body.children[i].inert = false;
        }
      };
      for (let i = 0; i < document.body.children.length; i++) {
        if (elem === burgerMenu.get(0)) {
          for (let k = 0; k < $('.header__container').get(0).children.length; k++) {
            $('.header__container').get(0).children[k].inert = false;
          }
        }
      };
      elem.innert = true;
      prevActiveElement.focus();
    }

    for (let i = 0; i < elemsInert.length; i++) {
      if (window.screen.width <= elemsInert[i].breakpoints || !elemsInert[i].breakpoints) {
        elemsInert[i].elem.inert = true
      }
    }
  }
  removeInnert();

  return removeInnert
}

const removeInnert = activationInnert([
  {
    elem: burgerMenu.get(0),
    esc: hide_burgerMenu
  },
  {
    elem: modalForm.get(0),
    esc: hide_modalForm
  }
]);

function hide_burgerMenu() {
  burgerBorderOne.css({
    "transform": "rotate(0)"
  });
  burgerBorderTwo.css({
    "transform": "rotate(0)"
  });
  burgerBorderThree.show();
  burgerMenu.hide(500);
  removeInnert(burgerMenu.get(0));
  header__burger.toggleClass("header__burger_active");
}

function show_burgerMenu() {
  burgerBorderOne.css({
    "transform": "rotate(45deg)",
    "transform-origin": "-2px 11px"
  });
  burgerBorderTwo.css({
    "transform": "rotate(-45deg)",
    "transform-origin": "32px 15px"
  });
  burgerBorderThree.hide();
  burgerMenu.show(500);
  addInnert(burgerMenu.get(0));
  header__burger.toggleClass("header__burger_active");
}

function hide_modalForm() {
  modalForm.hide(500);
  removeInnert(modalForm.get(0));
}

burgerMenu__linkTtext.click(function () {
  hide_burgerMenu();
});

burgerMenu__item.click(function () {
  hide_burgerMenu();
});

$('.paw-button').click(function () {
  modalForm.show(500);
  addInnert(modalForm.get(0));
});

$('.modal-form__close-btn').click(function () {
  modalForm.hide(500);
  removeInnert(modalForm.get(0));
});

$(document).click(function (e) {
  console.log($(e.target));
  if ($(e.target).is('.modal-form') ||
    $(e.target).is('.modal-form__wrapper')) {
    hide_modalForm();
  }
  else if ($(e.target).is('.burger-menu') ||
    $(e.target).is('.burger-menu__link-text') ||
    $(e.target).is('.header__container')
    ||
    $(e.target).is('body')) {
    hide_burgerMenu();
  }
});

header__burger.click(function () {
  if (header__burger.hasClass("header__burger_active")) {
    hide_burgerMenu();
  }
  else {
    show_burgerMenu();
  }
});


/*
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.slider__button-right',
    prevEl: '.slider__button-left',
  },
});

*/


