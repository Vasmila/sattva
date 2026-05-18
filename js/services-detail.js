// бургер-меню для мобильной версии
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burgerBtn');
    const navLinks = document.querySelector('.nav-links');
    const mainLogo = document.getElementById('mainLogo');

    // Функция для обновления логотипа
    function updateLogo() {
        if (!mainLogo) return;
        
        const isMobile = window.innerWidth <= 768;
        const isMenuOpen = navLinks && navLinks.classList.contains('active');
        
        if (isMobile && isMenuOpen) {
            mainLogo.src = '../img/logo2.png';
        } else if (isMobile) {
            // На мобильной версии с закрытым меню используем logo2.png
            mainLogo.src = '../img/logo2.png';
        } else {
            mainLogo.src = '../img/logo.png';
        }
    }

    if (burger && navLinks && mainLogo) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('open');
            burger.classList.toggle('active-burger');
            updateLogo();
        });

        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (burger.classList) burger.classList.remove('open');
                if (burger.classList) burger.classList.remove('active-burger');
                updateLogo();
            });
        });
    }
    
    // Обновляем логотип при ресайзе
    window.addEventListener('resize', () => {
        updateLogo();
    });
    
    // Инициализация логотипа при загрузке
    updateLogo();
});