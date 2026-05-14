// services-page.js - фильтры и анимации для страницы услуг

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
            
            // Фильтр по времени
            if (currentTimeFilter === 'all') {
                timeMatch = true;
            } else if (currentTimeFilter === '60') {
                timeMatch = cardTime <= 60;
            } else if (currentTimeFilter === '120') {
                timeMatch = cardTime <= 120;
            } else if (currentTimeFilter === '180') {
                timeMatch = cardTime <= 180;
            } else if (currentTimeFilter === '240') {
                timeMatch = cardTime <= 240;
            }
            
            // Фильтр по цене
            if (currentPriceFilter === 'all') {
                priceMatch = true;
            } else if (currentPriceFilter === '2000') {
                priceMatch = cardPrice <= 2000;
            } else if (currentPriceFilter === '3000') {
                priceMatch = cardPrice <= 3000;
            } else if (currentPriceFilter === '4000') {
                priceMatch = cardPrice <= 4000;
            } else if (currentPriceFilter === '5000') {
                priceMatch = cardPrice <= 5000;
            }
            
            if (tagMatch && timeMatch && priceMatch) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
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
    
    // Выпадающие списки
    function initDropdown(btn, dropdown, items, callback) {
        if (!btn || !dropdown) return;
        
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
            btn.classList.toggle('active');
        });
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                const text = item.textContent;
                btn.textContent = text;
                callback(value);
                dropdown.classList.remove('active');
                btn.classList.remove('active');
            });
        });
        
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
            btn.classList.remove('active');
        });
    }
    
    // Инициализация выпадающих списков
    if (timeFilterBtn && timeDropdown) {
        const timeItems = timeDropdown.querySelectorAll('.filter-dropdown-item');
        initDropdown(timeFilterBtn, timeDropdown, timeItems, (value) => {
            currentTimeFilter = value;
            filterCards();
        });
    }
    
    if (priceFilterBtn && priceDropdown) {
        const priceItems = priceDropdown.querySelectorAll('.filter-dropdown-item');
        initDropdown(priceFilterBtn, priceDropdown, priceItems, (value) => {
            currentPriceFilter = value;
            filterCards();
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