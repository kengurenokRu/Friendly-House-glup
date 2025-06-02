import Swiper from 'swiper/bundle';
//import 'swiper/css/bundle';


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

ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map("map", {
    center: [55.847927, 37.374884],
    zoom: 13
  });

  const mark = new ymaps.Placemark([55.847927, 37.374884], {
    hintContent: 'Friendly House',
    balloonContent: 'Friendly House'
  }, {
    iconLayout: 'default#image',
    iconImageHref: './img/pin.svg',
    iconImageSize: [30, 42]
  });


  mark.events.add('mouseenter', function (e) {
    var target = e.get('target');
    target.options.set({
      iconLayout: 'default#image',
      iconImageHref: './img/pin.svg',
      iconImageSize: [49, 75]
    });
  });

  // Обработчик события отведения мыши от метки
  mark.events.add('mouseleave', function (e) {
    var target = e.get('target');
    target.options.set({
      iconLayout: 'default#image',
      iconImageHref: './img/pin.svg',
      iconImageSize: [30, 42]
    });
  });
  myMap.geoObjects.add(mark);
  myMap.container.fitToViewport();
}

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 10,
  navigation: {
    nextEl: '.our-pets__swiper-button-right',
    prevEl: '.our-pets__swiper-button-left',
  },
});


const pets = [
  {
    id: 'Сара',
    name: 'Сара ждёт,',
    text: ' когда найдётся её человек',
    pictureName: 'sara',
    extention: 'jpg'
  },
  {
    id: 'Борис',
    name: 'Борис ждёт,',
    text: ' когда найдётся его человек',
    pictureName: 'boris',
    extention: 'jpg'
  },
  {
    id: 'Луи',
    name: 'Луи ждёт,',
    text: ' когда найдётся его человек',
    pictureName: 'lui',
    extention: 'jpg'
  },
  {
    id: 'Питер',
    name: 'Питер ждёт,',
    text: ' когда найдётся его человек',
    pictureName: 'piter',
    extention: 'jpg'
  },
  {
    id: 'Кенни',
    name: 'Кенни ждёт,',
    text: ' когда найдётся его человек',
    pictureName: 'kenni',
    extention: 'jpg'
  }
];

const buttonPets = $('.top__pet');
buttonPets.click(function (e) {
  let pet = $(e.target)[0].closest('button').value;
  console.log(pet);
  let stop = 0;
  for (let i = 0; i < pets.length; i++) {
    if (pet === pets[i].id) {
      stop = i;
      break;
    }
  }
  const titleOrange = $('.top__title-orange')[0];
  const title = $('.top__title-text')[0];
  const container = $('.top__container')[0];
  titleOrange.textContent = pets[stop].name;
  title.textContent = pets[stop].text;


  const pic = $('.top__pet-picture');
  const button = $('.top__pet');
  const source = $('.top__pet-source');
  const text = $('.top__pet-text');
  const backSource = $('.top__back-source');
  const backPic = $('.top__back-picture');
  /*
  if ($(document).width() > 700) {
    backSource[0].srcset = `./dist/img/${pets[stop].pictureName}.avif`;
    backSource[1].srcset = `./dist/img/${pets[stop].pictureName}.webp`;
    backPic[0].src = `./dist/img/${pets[stop].pictureName}.${pets[stop].extention}`;
    backPic[0].alt = pets[stop].id;
  }
  else {
    backSource[0].srcset = `./dist/img/${pets[stop].pictureName}-mini.avif`;
    backSource[1].srcset = `./dist/img/${pets[stop].pictureName}-mini.webp`;
    backPic[0].src = `./dist/img/${pets[stop].pictureName}-mini.${pets[stop].extention}`;
    backPic[0].alt = pets[stop].id;
  };*/

  let k = 0;
  let t = 0;
  for (let i = stop + 1; i < pets.length; i++) {
    text[k].textContent = pets[i].id;
    button[k].value = pets[i].id;
    pic[k].src = `./dist/img/${pets[i].pictureName}80.${pets[i].extention}`;
    pic[k].alt = pets[i].id;
    source[t].srcset = `./dist/img/${pets[i].pictureName}80.avif`;
    source[t + 1].srcset = `./dist/img/${pets[i].pictureName}80.webp`;
    k++;
    t += 2;
  }

  for (let i = 0; i < stop; i++) {
    text[k].textContent = pets[i].id;
    button[k].value = pets[i].id;
    pic[k].src = `./dist/img/${pets[i].pictureName}80.${pets[i].extention}`;
    pic[k].alt = pets[i].id;
    source[t].srcset = `./dist/img/${pets[i].pictureName}80.avif`;
    source[t + 1].srcset = `./dist/img/${pets[i].pictureName}80.webp`;    
    k++;
    t += 2;
  }
});

$('.help-us__form').submit(function (event) {
  event.preventDefault();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'POST',
    data: $(this).serialize(),
    dataType: 'html',
    success(data) {
      alert('Ваша заявка принята');
    },
    error(err) {
      alert('Что-то пошло не так');
      console.error(err);
    }
  })
});

$('.modal-form__form').submit(function (event) {
  event.preventDefault();
  $.ajax({
    url: 'https://jsonplaceholder.typicode.com/posts',
    type: 'POST',
    dataType: 'html',
    data: $(this).serialize(),
    success(data) {
      alert('Ваша заявка принята');
    },
    error() {
      alert('Что-то пошло не так');
    }
  })
  modalForm.hide(500);
});