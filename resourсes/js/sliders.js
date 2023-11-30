// import Swiper from 'swiper';

const advantageSlider = () => {
    
    const advantageSliderSelector = '.advantage_swiper';
    const advantageSliderContainer = document.querySelector(advantageSliderSelector);
    const advantageSwiper = new Swiper(advantageSliderSelector, {
        direction: 'horizontal',
        loop: false,
        spaceBetween: 0,
        autoWidth: false,
        keyboard: {
            enabled: true,
        },
        mousewheel: {
            enabled: true,
            forceToAxis: true,
        },
        freeMode: true,
        freeModeSticky: true,
        breakpoints: {
            0: {
                slidesPerView: 1.3,
            },
            500: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 1.8,
            },
            1500: {
                slidesPerView: 2.4,
            }
        }
    });

    advantageSliderContainer.addEventListener('wheel', (e) => {
        const delta = e.deltaY || e.detail || e.wheelDelta;
        if (delta > 0) {
            advantageSwiper.slideNext();
        } else {
            advantageSwiper.slidePrev();
        }
    });
};


export const initSliders = () => {
    advantageSlider();
}
