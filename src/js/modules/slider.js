function initSlider() {
    const fatCat = document.querySelector('.slider__image-container--before');
    const buttonBefore = document.querySelector('.slider__button--before');
    const buttonAfter = document.querySelector('.slider__button--after');

    const slider = document.querySelector('.slider__toggle');

    function update() {
        const currentWidth = 100 - slider.value;
        fatCat.setAttribute('style', `width: calc(${currentWidth}% + 30px)`);
    }

    if (fatCat) {
        buttonAfter.addEventListener('click', () => {
            fatCat.style.width = '0';
            slider.value = 100;
        });

        buttonBefore.addEventListener('click', () => {
            fatCat.style.width = '100vw';
            slider.value = 0;
        });

        slider.addEventListener('input', update);
    }
}

exports.initSlider = initSlider;
