var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--no-js");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.remove("main-nav--opened");
    navMain.classList.add("main-nav--closed");
  }
});

function formValidationStyling() {
  var inputsList = document.querySelectorAll(".form__text-input"); // Инициализация NodeList
  var inputsArr = Array.prototype.slice.call(inputsList); // Конвертация NodeList в Array
  if (inputsList) {
    inputsArr.forEach(function(input) {
      input.addEventListener("blur", function() { // Обработчик события потери фокуса
          if (input.checkValidity()) { // Проверка валидности поля ввода
            input.classList.remove("form__text-input--error"); // Назначение класса со стилями для невалидных полей
          } else {
            input.classList.add("form__text-input--error"); // Удаление класса с валидных полей
          }
        },
        false
      );
    });
  }
}
function initSlider() {
  var fatCat = document.querySelector(".slider__image-container--before");
  var buttonBefore = document.querySelector(".slider__button--before");
  var buttonAfter = document.querySelector(".slider__button--after");

  if (buttonAfter && buttonBefore) {
    buttonAfter.addEventListener("click", function(){
      fatCat.style.width="0";
    });

    buttonBefore.addEventListener("click", function(){
      fatCat.style.width="100vw";
    });
  }
}
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: {lat: 59.938826, lng: 30.323212}
  });

  setMarkers(map);
}

function setMarkers(map){
  var image = {
    url: "../../build/img/map-pin.png",
    scaledSize: new google.maps.Size(56.5, 53)
  }

  var customMarker = new google.maps.Marker({
    position: {lat: 59.938826, lng: 30.323212},
    map: map,
    icon: image,
    title: "HTML Academy"
  });

  var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h1 id="firstHeading" class="firstHeading">Интернет-магазин Кэт Энерджи</h1>'+
    '<div id="bodyContent">'+
    '<b>Функциональное питание для котов и кошек!</b>'+
    '<p><a href="tel:+78127124066">tel: +7-812-712-40-66</a></p>'+
    '</div>'+
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  customMarker.addListener("click", function() {
    infowindow.open(map, customMarker);
  });
}

map.addEventListener("click", function(evt){
  evt.preventDefault();
});

formValidationStyling();
initSlider();
