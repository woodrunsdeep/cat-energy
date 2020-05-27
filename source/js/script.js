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
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: {lat: 59.938826, lng: 30.323212}
  });

  var image = 'https://htmlacademy-adaptive.github.io/1183083-cat-energy-19/8/img/map-pin.png';
  var customMarker = new google.maps.Marker({
    position: {lat: 59.938826, lng: 30.323212},
    map: map,
    icon: image
  });
}
formValidationStyling();
