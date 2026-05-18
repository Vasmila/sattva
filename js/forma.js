// Инициализация EmailJS
(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEmailJS);
    } else {
        initEmailJS();
    }
    
    function initEmailJS() {
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS не загружен. Проверьте подключение скрипта.');
            return;
        }
        
        // данные:
        const PUBLIC_KEY = '1hltZMWWreA6olGPG';
        const SERVICE_ID = 'service_filyapo';
        const TEMPLATE_ID = 'template_tiap88n';
        
        // Инициализация
        emailjs.init(PUBLIC_KEY);
        
        // Форма в футере
        const footerForm = document.getElementById('footerForm');
        if (footerForm) {
            footerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Получаем значения
                const name = document.getElementById('footer-name')?.value || '';
                const phone = document.getElementById('footer-phone')?.value || '';
                const email = document.getElementById('footer-email')?.value || '';
                
                // Проверка на пустые поля
                if (!name || !phone || !email) {
                    alert('Пожалуйста, заполните все поля');
                    return;
                }
                
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Отправка...';
                btn.disabled = true;
                
                // Отправляем все данные
                const formData = {
                    name: name,
                    phone: phone,
                    email: email,
                    message: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nИсточник: Форма в футере`
                };
                
                emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
                    .then(function(response) {
                        alert('Сообщение успешно отправлено! Мы свяжемся с вами.');
                        footerForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Ошибка:', error);
                        alert('Ошибка отправки. Попробуйте позже.\n' + (error.text || ''));
                    })
                    .finally(function() {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    });
            });
        }
        
        // Модальная форма
        const modalForm = document.getElementById('bookingForm');
        if (modalForm) {
            modalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Получаем значения
                const name = document.getElementById('modal-name')?.value || '';
                const phone = document.getElementById('modal-phone')?.value || '';
                const email = document.getElementById('modal-email')?.value || '';
                
                // Проверка на пустые поля
                if (!name || !phone || !email) {
                    alert('Пожалуйста, заполните все поля');
                    return;
                }
                
                // Проверка чекбоксов
                const privacyChecked = document.querySelector('input[name="privacy"]')?.checked;
                if (!privacyChecked) {
                    alert('Подтвердите согласие с политикой конфиденциальности');
                    return;
                }
                
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = 'Отправка...';
                btn.disabled = true;
                
                // Отправляем все данные
                const formData = {
                    name: name,
                    phone: phone,
                    email: email,
                    message: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nИсточник: Модальная форма (Запись на массаж)`
                };
                
                emailjs.send(SERVICE_ID, TEMPLATE_ID, formData)
                    .then(function(response) {
                        alert('Заявка успешно отправлена! Мы перезвоним вам.');
                        modalForm.reset();
                        // Сбросить чекбоксы
                        document.querySelectorAll('input[name="privacy"], input[name="offer"]').forEach(cb => cb.checked = false);
                        // Закрыть окно
                        const modal = document.getElementById('bookingModal');
                        if (modal) {
                            modal.style.display = 'none';
                            modal.classList.remove('open');
                        }
                    })
                    .catch(function(error) {
                        console.error('Ошибка:', error);
                        alert('Ошибка отправки. Попробуйте позже.\n' + (error.text || ''));
                    })
                    .finally(function() {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    });
            });
        }
    }
})();