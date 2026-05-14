// modal.js - модальное окно формы записи

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const bookingForm = document.getElementById('bookingForm');
    
    // Функция открытия модального окна
    window.openBookingModal = function() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Функция закрытия модального окна
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Закрытие по крестику
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Закрытие по клику на фон
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Обработка отправки формы
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('modal-name')?.value;
            const phone = document.getElementById('modal-phone')?.value;
            const email = document.getElementById('modal-email')?.value;
            const privacyCheckbox = document.querySelector('input[name="privacy"]')?.checked;
            const offerCheckbox = document.querySelector('input[name="offer"]')?.checked;
            
            if (!name || !phone || !email) {
                alert('Пожалуйста, заполните все поля.');
                return;
            }
            
            if (!privacyCheckbox || !offerCheckbox) {
                alert('Пожалуйста, примите условия политики конфиденциальности и оферты.');
                return;
            }
            
            // Здесь можно отправить данные на сервер
            console.log('Заявка отправлена:', { name, phone, email });
            
            alert('Спасибо! Наш администратор свяжется с вами в ближайшее время.');
            bookingForm.reset();
            closeModal();
        });
    }
});