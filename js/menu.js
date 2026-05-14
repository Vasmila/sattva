// бургер-меню
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const navLinks = document.querySelector('.nav-links');
    const mainLogo = document.getElementById('mainLogo');

    if (burger && navLinks && mainLogo) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            burger.classList.toggle('open');
            burger.classList.toggle('active-burger');
            
            // Смена логотипа в открытом меню
            if (navLinks.classList.contains('active')) {
                const logoPath = window.location.pathname.includes('/html/') ? '../img/logo2.png' : 'img/logo2.png';
                mainLogo.src = logoPath;
            } else {
                const logoPath = window.location.pathname.includes('/html/') ? '../img/logo.png' : 'img/logo.png';
                mainLogo.src = logoPath;
            }
        });

        // Закрытие меню
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (burger.classList) burger.classList.remove('open');
                if (burger.classList) burger.classList.remove('active-burger');
                const logoPath = window.location.pathname.includes('/html/') ? '../img/logo.png' : 'img/logo.png';
                mainLogo.src = logoPath;
            });
        });
    }
});