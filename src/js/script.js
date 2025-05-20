const modalForm = $('.modal-form');
const header__burger = $('.header__burger');
const burgerMenu = $('.burger-menu');
const burgerMenu__linkTtext = $('.burger-menu__link-text');
const burgerMenu__item = $('.burger-menu__item');


let prevActiveElement;


function addInnert(elem) {
  prevActiveElement = document.activeElement;
  for (let i = 0; i < document.body.children.length; i++) {
    if (document.body.children[i] !== elem) {
      document.body.children[i].inert = true;
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
      elem.innert = true;
      prevActiveElement.focus();
    }

    for (let i = 0; i < elemsInert.length; i++) {
      if (window.screen.width <= elemsInert[i].breakpoints || !elemsInert[i].breakpoints) {
        elemsInert[i].elem.inert = true
        //console.log(elemsInert[i]);
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
    burgerMenu.hide(500);
    removeInnert(burgerMenu.get(0));    
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
  if ($(e.target).is('.modal-form')) {
    modalForm.hide(500);
    removeInnert(modalForm.get(0));
  }
  else if ($(e.target).is('.burger-menu') || $(e.target).is('.burger-menu__link-text')) {
    burgerMenu.hide(500);
    removeInnert(burgerMenu.get(0));
  }
});

/*
$('.modal-form__wrapper').click(function () {
  modalForm.hide(500);
  removeInnert(modalForm.get(0));
});*/


header__burger.click(function () { 
    burgerMenu.show(500);
    addInnert(burgerMenu.get(0)); 
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


