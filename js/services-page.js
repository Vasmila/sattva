// фильтры и анимации для страницы услуг

document.addEventListener('DOMContentLoaded', () => {
    // Фильтры для услуг
    const filterTags = document.querySelectorAll('.filter-tag');
    const timeFilterBtn = document.getElementById('timeFilterBtn');
    const priceFilterBtn = document.getElementById('priceFilterBtn');
    const timeDropdown = document.getElementById('timeDropdown');
    const priceDropdown = document.getElementById('priceDropdown');

    const serviceCards = document.querySelectorAll('.service-card');
    const serviceCardsLarge = document.querySelectorAll('.service-card-large');
    const serviceCardsLargeHalf = document.querySelectorAll('.service-card-large-half');
    const allCards = [...serviceCards, ...serviceCardsLarge, ...serviceCardsLargeHalf];
    
    let currentTag = 'all';
    let currentTimeFilter = 'all';
    let currentPriceFilter = 'all';
    
    // Проверка на мобильное устройство
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // Функция фильтрации карточек
    function filterCards() {
        allCards.forEach(card => {
            const cardTag = card.getAttribute('data-tag');
            const cardTime = parseInt(card.getAttribute('data-time'));
            const cardPrice = parseInt(card.getAttribute('data-price'));
            
            let tagMatch = false;
            let timeMatch = false;
            let priceMatch = false;
            
            // Фильтр по тегу
            if (currentTag === 'all') {
                tagMatch = true;
            } else {
                tagMatch = cardTag === currentTag;
            }
            
            // Фильтр по времени (точное соответствие)
            if (currentTimeFilter === 'all') {
                timeMatch = true;
            } else {
                const filterTime = parseInt(currentTimeFilter);
                timeMatch = cardTime === filterTime;
            }
            
            // Фильтр по цене (до указанной суммы)
            if (currentPriceFilter === 'all') {
                priceMatch = true;
            } else {
                const filterPrice = parseInt(currentPriceFilter);
                priceMatch = cardPrice <= filterPrice;
            }
            
            if (tagMatch && timeMatch && priceMatch) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Функция для позиционирования выпадающего списка на десктопе (absolute)
    function positionDropdownDesktop(btn, dropdown) {
        if (!btn || !dropdown) return;
        
        const wrapper = btn.closest('.filter-select-wrapper');
        if (!wrapper) return;
        
        // Сбрасываем стили для absolute позиционирования
        dropdown.style.position = 'absolute';
        dropdown.style.top = '100%';
        dropdown.style.left = '0';
        dropdown.style.right = '0';
        dropdown.style.bottom = 'auto';
        dropdown.style.width = '100%';
        dropdown.style.marginTop = '8px';
    }
    
    // Функция для позиционирования выпадающего списка на мобильных (fixed)
    function positionDropdownMobile(btn, dropdown) {
        if (!btn || !dropdown) return;
        
        const rect = btn.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const dropdownHeight = dropdown.offsetHeight;
        
        // Определяем, где больше места: сверху или снизу
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        // Очищаем предыдущие стили
        dropdown.style.position = 'fixed';
        dropdown.style.top = '';
        dropdown.style.bottom = '';
        dropdown.style.left = '';
        dropdown.style.right = '';
        dropdown.style.marginTop = '0';
        
        // Устанавливаем ширину равной ширине кнопки
        dropdown.style.width = `${rect.width}px`;
        
        // Позиционируем по горизонтали (привязываем к левому краю кнопки)
        dropdown.style.left = `${rect.left}px`;
        
        // Позиционируем по вертикали
        if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
            // Показываем снизу
            dropdown.style.top = `${rect.bottom + 8}px`;
        } else {
            // Показываем сверху
            dropdown.style.bottom = `${window.innerHeight - rect.top + 8}px`;
        }
    }
    
    // Основная функция позиционирования
    function positionDropdown(btn, dropdown) {
        if (isMobile()) {
            positionDropdownMobile(btn, dropdown);
        } else {
            positionDropdownDesktop(btn, dropdown);
        }
    }
    
    // Функция инициализации выпадающего списка с позиционированием
    function initDropdownWithPosition(btn, dropdown, items, callback, isTimeFilter = false) {
        if (!btn || !dropdown) return;
        
        let updatePositionHandler = null;
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Закрываем все другие дропдауны
            document.querySelectorAll('.filter-dropdown.active').forEach((d) => {
                if (d !== dropdown) {
                    d.classList.remove('active');
                    // Удаляем обработчики у закрытых дропдаунов
                    if (d._updatePosition) {
                        window.removeEventListener('scroll', d._updatePosition);
                        window.removeEventListener('resize', d._updatePosition);
                        delete d._updatePosition;
                    }
                }
            });
            
            // Закрываем другие кнопки
            document.querySelectorAll('.filter-select-btn.active').forEach((b) => {
                if (b !== btn) {
                    b.classList.remove('active');
                }
            });
            
            // Переключаем текущий дропдаун
            dropdown.classList.toggle('active');
            btn.classList.toggle('active');
            
            // Если открываем, позиционируем
            if (dropdown.classList.contains('active')) {
                positionDropdown(btn, dropdown);
                
                // Функция обновления позиции
                updatePositionHandler = () => {
                    if (dropdown.classList.contains('active')) {
                        positionDropdown(btn, dropdown);
                    }
                };
                
                // При ресайзе или скролле обновляем позицию (только для мобильных)
                if (isMobile()) {
                    window.addEventListener('scroll', updatePositionHandler);
                    window.addEventListener('resize', updatePositionHandler);
                } else {
                    window.addEventListener('resize', updatePositionHandler);
                }
                
                // Сохраняем обработчик для закрытия
                dropdown._updatePosition = updatePositionHandler;
            } else {
                // Удаляем обработчики при закрытии
                if (dropdown._updatePosition) {
                    window.removeEventListener('scroll', dropdown._updatePosition);
                    window.removeEventListener('resize', dropdown._updatePosition);
                    delete dropdown._updatePosition;
                }
            }
        });
        
        // Обработчики для элементов списка
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const value = item.getAttribute('data-value');
                const text = item.textContent;
                btn.textContent = text;
                callback(value);
                dropdown.classList.remove('active');
                btn.classList.remove('active');
                
                // Удаляем обработчики
                if (dropdown._updatePosition) {
                    window.removeEventListener('scroll', dropdown._updatePosition);
                    window.removeEventListener('resize', dropdown._updatePosition);
                    delete dropdown._updatePosition;
                }
            });
        });
        
        // Закрытие при клике вне
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.filter-select')) {
                if (dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                    btn.classList.remove('active');
                    
                    // Удаляем обработчики
                    if (dropdown._updatePosition) {
                        window.removeEventListener('scroll', dropdown._updatePosition);
                        window.removeEventListener('resize', dropdown._updatePosition);
                        delete dropdown._updatePosition;
                    }
                }
            }
        });
    }
    
    // Обработчики для тегов
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentTag = tag.getAttribute('data-filter');
            filterCards();
        });
    });
    
    // Инициализация выпадающих списков с позиционированием
    if (timeFilterBtn && timeDropdown) {
        const timeItems = timeDropdown.querySelectorAll('.filter-dropdown-item');
        initDropdownWithPosition(timeFilterBtn, timeDropdown, timeItems, (value) => {
            currentTimeFilter = value;
            filterCards();
        });
    }
    
    if (priceFilterBtn && priceDropdown) {
        const priceItems = priceDropdown.querySelectorAll('.filter-dropdown-item');
        initDropdownWithPosition(priceFilterBtn, priceDropdown, priceItems, (value) => {
            currentPriceFilter = value;
            filterCards();
        });
    }
    
    // Обновление позиции при изменении ориентации экрана или ресайзе
    window.addEventListener('resize', () => {
        setTimeout(() => {
            const activeDropdowns = document.querySelectorAll('.filter-dropdown.active');
            activeDropdowns.forEach(dropdown => {
                const btn = document.querySelector('.filter-select-btn.active');
                if (btn && dropdown) {
                    positionDropdown(btn, dropdown);
                }
            });
        }, 100);
    });
    
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            const activeDropdowns = document.querySelectorAll('.filter-dropdown.active');
            activeDropdowns.forEach(dropdown => {
                const btn = document.querySelector('.filter-select-btn.active');
                if (btn && dropdown) {
                    positionDropdown(btn, dropdown);
                }
            });
        }, 100);
    });
});