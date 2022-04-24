const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--no-js');

navToggle.addEventListener('click', () => {
    if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
    } else {
        navMain.classList.remove('main-nav--opened');
        navMain.classList.add('main-nav--closed');
    }
});

function formValidationStyling() {
    const inputs = document.querySelectorAll('.form__text-input');
    if (inputs) {
        inputs.forEach((input) => {
            input.addEventListener('blur', () => {
                if (input.checkValidity()) {
                    input.classList.remove('form__text-input--error');
                } else {
                    input.classList.add('form__text-input--error');
                }
            },
            false);
        });
    }
}

function initSlider() {
    const fatCat = document.querySelector('.slider__image-container--before');
    const buttonBefore = document.querySelector('.slider__button--before');
    const buttonAfter = document.querySelector('.slider__button--after');

    if (buttonAfter && buttonBefore) {
        buttonAfter.addEventListener('click', () => {
            fatCat.style.width = '0';
        });

        buttonBefore.addEventListener('click', () => {
            fatCat.style.width = '100vw';
        });
    }
}

formValidationStyling();
initSlider();
