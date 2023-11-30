


import { initSliders } from './sliders.js';

// import Inputmask from './node_modules/inputmask/dist/inputmask.es6.js';

const app = () => {

    // const phoneInputs = document.querySelectorAll('.phone-input');

    // phoneInputs.forEach(phoneInput => {
    //     Inputmask("+380").mask(phoneInput);
    //     Inputmask({"mask": "+38 (099)-999-99-99"}).mask(phoneInput);
    // });

    const faqItems = document.querySelectorAll('.faq_item');

    faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
    });

    initSliders();
};


document.addEventListener('DOMContentLoaded', function () {
    app();   
});
