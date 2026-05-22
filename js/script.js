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
        let startY = 0;
        let startScrollLeft = 0;
        let currentIndex = 0;
        let cardWidth = 0;
        let visibleCards = 1;
        let isHorizontalScroll = false; // Флаг для определения направления скролла
        
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
            isHorizontalScroll = false;
            startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
            startY = e.type === 'mousedown' ? e.pageY : e.touches[0].pageY;
            startScrollLeft = parseFloat(track.style.transform.replace('translateX(-', '').replace('px)', '')) || 0;
            track.style.transition = 'none';
            slider.style.cursor = 'grabbing';
        };
        
        // Обработчик движения
        const onDrag = (e) => {
            if (!isDragging) return;
            
            const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
            const currentY = e.type === 'mousemove' ? e.pageY : e.touches[0].pageY;
            const deltaX = Math.abs(currentX - startX);
            const deltaY = Math.abs(currentY - startY);
            
            // Определяем направление скролла после небольшого движения
            if (!isHorizontalScroll && (deltaX > 5 || deltaY > 5)) {
                isHorizontalScroll = deltaX > deltaY;
            }
            
            // Если это горизонтальный скролл - предотвращаем прокрутку страницы
            if (isHorizontalScroll) {
                e.preventDefault();
                let newScrollLeft = startScrollLeft - (currentX - startX);
                
                const step = cardWidth + 24;
                const maxScroll = (cards.length - 1) * step;
                newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
                
                track.style.transform = `translateX(-${newScrollLeft}px)`;
            }
            // Если вертикальный - ничего не делаем, страница скроллится естественным образом
        };
        
        // Обработчик окончания перетаскивания
        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = 'grab';
            
            // Если был горизонтальный скролл - фиксируем позицию
            if (isHorizontalScroll) {
                const currentScrollLeft = parseFloat(track.style.transform.replace('translateX(-', '').replace('px)', '')) || 0;
                const nearestIndex = getNearestIndex(currentScrollLeft);
                
                track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                scrollToIndex(nearestIndex, true);
            }
            
            // Сбрасываем флаги
            isHorizontalScroll = false;
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
        
        // Добавляем обработчики для тач-событий (с пассивным слушателем для вертикального скролла)
        slider.addEventListener('touchstart', startDrag, { passive: false });
        window.addEventListener('touchmove', onDrag, { passive: false });
        window.addEventListener('touchend', endDrag);
        
        // Защита от выделения текста
        slider.addEventListener('dragstart', (e) => e.preventDefault());
        
        // Устанавливаем курсор
        slider.style.cursor = 'grab';
    }
});