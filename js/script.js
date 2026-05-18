// скролл карточек акций и услуг

document.addEventListener('DOMContentLoaded', () => {
    // карточки акций
    const promotionsSlider = document.querySelector('.promotions-slider');
    const promotionsTrack = document.querySelector('.promotions-track');
    const promotionCards = document.querySelectorAll('.promotion-card');
    const promotionDots = document.querySelectorAll('#promotionsDots .dot');
    
    if (promotionsSlider && promotionsTrack && promotionCards.length > 0) {
        initSlider(promotionsSlider, promotionsTrack, promotionCards, promotionDots, 'promotions');
    }
    
    // карточки услуг
    const servicesSlider = document.querySelector('.services-slider');
    const servicesTrack = document.querySelector('.services-track');
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceDots = document.querySelectorAll('#servicesDots .dot');
    
    if (servicesSlider && servicesTrack && serviceCards.length > 0) {
        initSlider(servicesSlider, servicesTrack, serviceCards, serviceDots, 'services');
    }
    
    // Функция инициализации слайдера
    function initSlider(slider, track, cards, dots, type) {
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;
        let currentIndex = 0;
        let cardWidth = 0;
        let visibleCards = 1;
        
        // Функция обновления ширины карточки
        function updateCardWidth() {
            if (type === 'services') {
                if (window.innerWidth <= 768) {
                    visibleCards = 1;
                } else if (window.innerWidth <= 1024) {
                    visibleCards = 2;
                } else {
                    visibleCards = 3;
                }
            } else {
                // Для акций
                if (window.innerWidth <= 768) {
                    visibleCards = 1;
                } else {
                    visibleCards = 2;
                }
            }
            
            // Получаем ширину первой карточки
            if (cards.length > 0) {
                cardWidth = cards[0].offsetWidth;
            }
        }
        
        // Функция скролла к определенному индексу
        function scrollToIndex(index, animate = true) {
            if (index < 0) index = 0;
            const maxIndex = cards.length - 1;
            if (index > maxIndex) index = maxIndex;
            
            currentIndex = index;
            const scrollPosition = index * (cardWidth + 24);
            
            if (animate) {
                track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                track.style.transform = `translateX(-${scrollPosition}px)`;
            } else {
                track.style.transition = 'none';
                track.style.transform = `translateX(-${scrollPosition}px)`;
                track.offsetHeight;
                track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
            
            if (dots && dots.length > 0) {
                updateDots(index, dots);
            }
        }
        
        // Функция обновления dots
        function updateDots(index, dotsArray) {
            dotsArray.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Функция определения ближайшего индекса
        function getNearestIndex(scrollLeft) {
            const step = cardWidth + 24;
            const index = Math.round(scrollLeft / step);
            const maxIndex = cards.length - 1;
            return Math.max(0, Math.min(index, maxIndex));
        }
        
        // Обработчик начала перетаскивания
        const startDrag = (e) => {
            isDragging = true;
            startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
            startScrollLeft = parseFloat(track.style.transform.replace('translateX(-', '').replace('px)', '')) || 0;
            track.style.transition = 'none';
            slider.style.cursor = 'grabbing';
            e.preventDefault();
        };
        
        // Обработчик движения
        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
            const deltaX = currentX - startX;
            let newScrollLeft = startScrollLeft - deltaX;
            
            const step = cardWidth + 24;
            const maxScroll = (cards.length - 1) * step;
            newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
            
            track.style.transform = `translateX(-${newScrollLeft}px)`;
        };
        
        // Обработчик окончания перетаскивания
        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = 'grab';
            
            const currentScrollLeft = parseFloat(track.style.transform.replace('translateX(-', '').replace('px)', '')) || 0;
            const nearestIndex = getNearestIndex(currentScrollLeft);
            
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            scrollToIndex(nearestIndex, true);
        };
        
        // Клик по dots
        if (dots && dots.length > 0) {
            dots.forEach((dot, index) => {
                if (index < cards.length) {
                    dot.addEventListener('click', () => {
                        scrollToIndex(index, true);
                    });
                }
            });
        }
        
        // Обновление при ресайзе
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateCardWidth();
                const scrollPosition = currentIndex * (cardWidth + 24);
                track.style.transition = 'none';
                track.style.transform = `translateX(-${scrollPosition}px)`;
                track.offsetHeight;
                track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, 150);
        });
        
        // Инициализация
        updateCardWidth();
        scrollToIndex(0, false);
        
        // Добавляем обработчики для мыши
        slider.addEventListener('mousedown', startDrag);
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', endDrag);
        
        // Добавляем обработчики для тач-событий
        slider.addEventListener('touchstart', startDrag);
        window.addEventListener('touchmove', onDrag);
        window.addEventListener('touchend', endDrag);
        
        // Защита от выделения текста
        slider.addEventListener('dragstart', (e) => e.preventDefault());
        
        // // Устанавливаем курсор
        // slider.style.cursor = 'grab';
    }
});