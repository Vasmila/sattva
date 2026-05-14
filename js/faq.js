// faq.js - аккордеон для блока популярные вопросы

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const toggleBtn = item.querySelector('.faq-toggle');
        const question = item.querySelector('.faq-question');
        
        // Добавляем картинку в кнопку, если её нет
        if (toggleBtn && !toggleBtn.querySelector('img')) {
            const img = document.createElement('img');
            img.src = 'img/btn_faq.png';
            img.alt = 'Раскрыть';
            toggleBtn.appendChild(img);
        }
        
        // Функция открытия/закрытия
        const toggleFaq = () => {
            const isOpen = item.classList.contains('open');
            
            // Переключаем текущий
            item.classList.toggle('open');
            if (toggleBtn) {
                toggleBtn.classList.toggle('active');
            }
        };
        
        // Обработчик клика по кнопке
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFaq();
            });
        }
        
        // Клик по всей области вопроса тоже открывает
        if (question) {
            question.addEventListener('click', (e) => {
                if (e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
                    toggleFaq();
                }
            });
            question.style.cursor = 'pointer';
        }
    });
});