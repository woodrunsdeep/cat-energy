function initSlider() {
    const fatCat = document.querySelector('.slider__image-container--before');
    const buttonBefore = document.querySelector('.slider__button--before');
    const buttonAfter = document.querySelector('.slider__button--after');

    buttonAfter.addEventListener('click', () => {
        fatCat.style.width = '0';
    });

    buttonBefore.addEventListener('click', () => {
        fatCat.style.width = '100vw';
    });
}

initSlider();
