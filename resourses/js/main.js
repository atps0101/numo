
import { initSliders } from './sliders.js';

function getUtmLabels() {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(new URL(currentUrl).search);

    const utmSource = urlParams.has('utm_sourse') ? urlParams.get('utm_sourse') : null;
    const utmMedium = urlParams.has('utm_medium') ? urlParams.get('utm_medium') : null;
    const utmCampaign = urlParams.has('utm_campaign') ? urlParams.get('utm_campaign') : null;
    const gclid = urlParams.has('gclid') ? urlParams.get('gclid') : null;

    return {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        gclid: gclid
    };
}

const app = () => {

    const anchors = document.querySelectorAll('.anchor');
    const phones = document.querySelectorAll('.phone');
    const forms = document.querySelectorAll('form');
    const faqItems = document.querySelectorAll('.faq_item');
    const dialogs = document.querySelectorAll('.dialog');

    dialogs.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
    
            const dataSrcValue = item.getAttribute('data-src');

            Fancybox.show([{ src: dataSrcValue, type: "inline" }], {
                infobar: false, 
            });
        });
    });

    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('.close_popup')) {
            Fancybox.close();
        }
    });
    

    anchors.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
    
            const hash = item.hash;
    
            if (hash !== "") {
                setTimeout(() => {
                    const target = document.querySelector(hash);
                    
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 150,
                            behavior: "smooth"
                        });
                    }
                }, 100);
            }
        });
    });

    let im = new Inputmask("+380");

    phones.forEach(phone => {

        im.mask(phone);

        Inputmask({"mask": "+38 (099)-999-99-99"}).mask(phone)

    });


    forms.forEach(form => {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
    
            const formBlock = form;
            const formData = new FormData(formBlock);
            const utmData = getUtmLabels();
    
            formData.append('utm_source', utmData.utm_source);
            formData.append('utm_medium', utmData.utm_medium);
            formData.append('utm_campaign', utmData.utm_campaign);
            formData.append('gclid', utmData.gclid);
    
            const url = "handler.php";
    
            fetch(url, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                formBlock.classList.remove("error");
                formBlock.querySelectorAll('input').forEach(field => {
                    field.classList.remove('error');
                });
    
                if (data.status !== 'error') {

                    formBlock.querySelector(".success").classList.add("open");
    
                    setTimeout(() => {
                        formBlock.querySelector(".success").classList.remove("open");
                        form.reset();
                    }, 5000);
    
                    fbq("track", "Lead");
    
                } else {
                    if (data.input) {
                        const errorField = document.getElementById(data.input);
                        if (errorField) {
                            errorField.classList.add("error");
                        }
                    }  
                }
            })
            .catch(error => {
                console.error("Fetch Error: ", error);
            });
        });
    });

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