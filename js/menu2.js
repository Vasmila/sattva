// Бургер-меню для мобильной версии
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const navLinks = document.querySelector('.nav-links');
    const mainLogo = document.getElementById('mainLogo');

    if (burger && navLinks && mainLogo) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('open');
            burger.classList.toggle('active-burger');
            
            if (navLinks.classList.contains('active')) {
                mainLogo.src = '../img/logo2.png';
            } else {
                mainLogo.src = '../img/logo.png';
            }
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (burger.classList) burger.classList.remove('open');
                if (burger.classList) burger.classList.remove('active-burger');
                mainLogo.src = '../img/logo.png';
            });
        });
    }

    // Обработка формы в футере
    const footerForm = document.getElementById('footerForm');
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('footer-name')?.value;
            const phone = document.getElementById('footer-phone')?.value;
            const email = document.getElementById('footer-email')?.value;
            
            if (name && phone && email) {
                alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                footerForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
    }
});