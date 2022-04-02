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

formValidationStyling();
initSlider();
