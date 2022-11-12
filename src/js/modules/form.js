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

formValidationStyling();
