// blog.js - страница блога

document.addEventListener('DOMContentLoaded', () => {
    // Элементы фильтров
    const filterBtns = document.querySelectorAll('.blog-filter-btn');
    
    // Все типы карточек
    const blogCards = document.querySelectorAll('.blog-card');
    const blogCardsAlt = document.querySelectorAll('.blog-card-alt');
    const blogCardsBg = document.querySelectorAll('.blog-card-bg');
    const allCards = [...blogCards, ...blogCardsAlt, ...blogCardsBg];
    
    let currentFilter = 'all';
    let isAnimating = false;
    
    // ========== ФУНКЦИИ ДЛЯ КНОПОК "ЧИТАТЬ ДАЛЕЕ" ==========
    
    // Функция для инициализации кнопок "читать далее" для первого типа карточек (обычные)
    function initReadMoreButtonsFirstType() {
        const firstTypeCards = document.querySelectorAll('.blog-card');
        
        firstTypeCards.forEach((card) => {
            const textBlock = card.querySelector('.blog-card-text');
            const wrapper = card.querySelector('.blog-card-text-wrapper');
            let btn = card.querySelector('.read-more-btn');
            
            if (!textBlock) return;
            
            // Удаляем старую кнопку, если есть
            if (btn) {
                btn.remove();
            }
            
            if (window.innerWidth <= 768) {
                const textHeight = textBlock.scrollHeight;
                const lineHeight = 24;
                const maxHeight = lineHeight * 6;
                
                if (textHeight > maxHeight) {
                    textBlock.classList.add('collapsed');
                    
                    btn = document.createElement('button');
                    btn.className = 'read-more-btn';
                    btn.textContent = 'Читать далее';
                    btn.setAttribute('data-readmore', `card-${Date.now()}-${Math.random()}`);
                    
                    btn.addEventListener('click', () => {
                        textBlock.classList.toggle('collapsed');
                        textBlock.classList.toggle('expanded');
                        btn.textContent = textBlock.classList.contains('collapsed') ? 'Читать далее' : 'Свернуть';
                    });
                    
                    if (wrapper) {
                        wrapper.appendChild(btn);
                    }
                } else {
                    textBlock.classList.remove('collapsed');
                    textBlock.classList.remove('expanded');
                }
            } else {
                textBlock.classList.remove('collapsed');
                textBlock.classList.remove('expanded');
            }
        });
    }
    
    // Функция для инициализации кнопок "читать далее" для второго типа карточек (с фоном и кнопкой)
    function initReadMoreButtonsSecondType() {
        const secondTypeCards = document.querySelectorAll('.blog-card-alt');
        
        secondTypeCards.forEach((card) => {
            const textBlock = card.querySelector('.blog-card-alt-text');
            const wrapper = card.querySelector('.blog-card-alt-text-wrapper');
            let btn = card.querySelector('.read-more-btn-alt');
            
            if (!textBlock) return;
            
            if (btn) {
                btn.remove();
            }
            
            if (window.innerWidth <= 768) {
                const textHeight = textBlock.scrollHeight;
                const lineHeight = 24;
                const maxHeight = lineHeight * 6;
                
                if (textHeight > maxHeight) {
                    textBlock.classList.add('collapsed');
                    
                    btn = document.createElement('button');
                    btn.className = 'read-more-btn-alt';
                    btn.textContent = 'Читать далее';
                    btn.setAttribute('data-readmore', `card-alt-${Date.now()}-${Math.random()}`);
                    
                    btn.addEventListener('click', () => {
                        textBlock.classList.toggle('collapsed');
                        textBlock.classList.toggle('expanded');
                        btn.textContent = textBlock.classList.contains('collapsed') ? 'Читать далее' : 'Свернуть';
                    });
                    
                    if (wrapper) {
                        wrapper.appendChild(btn);
                    }
                } else {
                    textBlock.classList.remove('collapsed');
                    textBlock.classList.remove('expanded');
                }
            } else {
                textBlock.classList.remove('collapsed');
                textBlock.classList.remove('expanded');
            }
        });
    }
    
    // Функция для инициализации кнопок "читать далее" для третьего типа карточек (с фоновым изображением)
    function initReadMoreButtonsThirdType() {
        const thirdTypeCards = document.querySelectorAll('.blog-card-bg');
        
        thirdTypeCards.forEach((card) => {
            const textBlock = card.querySelector('.blog-card-bg-text');
            const wrapper = card.querySelector('.blog-card-bg-text-wrapper');
            let btn = card.querySelector('.read-more-btn-bg');
            
            if (!textBlock) return;
            
            if (btn) {
                btn.remove();
            }
            
            if (window.innerWidth <= 768) {
                const textHeight = textBlock.scrollHeight;
                const lineHeight = 22;
                const maxHeight = lineHeight * 6;
                
                if (textHeight > maxHeight) {
                    textBlock.classList.add('collapsed');
                    
                    btn = document.createElement('button');
                    btn.className = 'read-more-btn-bg';
                    btn.textContent = 'Читать далее';
                    btn.setAttribute('data-readmore', `card-bg-${Date.now()}-${Math.random()}`);
                    
                    btn.addEventListener('click', () => {
                        textBlock.classList.toggle('collapsed');
                        textBlock.classList.toggle('expanded');
                        btn.textContent = textBlock.classList.contains('collapsed') ? 'Читать далее' : 'Свернуть';
                    });
                    
                    if (wrapper) {
                        wrapper.appendChild(btn);
                    }
                } else {
                    textBlock.classList.remove('collapsed');
                    textBlock.classList.remove('expanded');
                }
            } else {
                textBlock.classList.remove('collapsed');
                textBlock.classList.remove('expanded');
            }
        });
    }
    
    // Общая функция инициализации всех кнопок
    function initAllReadMoreButtons() {
        initReadMoreButtonsFirstType();
        initReadMoreButtonsSecondType();
        initReadMoreButtonsThirdType();
    }
    
    // ========== ФУНКЦИЯ ФИЛЬТРАЦИИ ==========
    function filterCards(filterValue) {
        if (isAnimating) return;
        isAnimating = true;
        
        let visibleCount = 0;
        const cardsToHide = [];
        const cardsToShow = [];
        
        // Определяем, какие карточки нужно показать/скрыть
        allCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = (filterValue === 'all' || cardCategory === filterValue);
            
            if (shouldShow && card.classList.contains('hide')) {
                cardsToShow.push(card);
            } else if (!shouldShow && !card.classList.contains('hide')) {
                cardsToHide.push(card);
            } else if (shouldShow && !card.classList.contains('hide')) {
                visibleCount++;
            }
        });
        
        // Сначала анимируем скрытие карточек
        if (cardsToHide.length > 0) {
            cardsToHide.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    card.classList.add('hide');
                    card.style.display = 'none';
                    card.style.opacity = '';
                    card.style.transform = '';
                }, 300);
            });
        }
        
        // Затем показываем новые карточки с анимацией
        setTimeout(() => {
            if (cardsToShow.length > 0) {
                cardsToShow.forEach(card => {
                    card.classList.remove('hide');
                    card.style.display = 'grid';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                });
            }
            
            // Переинициализируем кнопки после фильтрации
            setTimeout(() => {
                initAllReadMoreButtons();
                isAnimating = false;
            }, 400);
        }, cardsToHide.length > 0 ? 350 : 50);
        
        // Если нет карточек для скрытия и показа
        if (cardsToHide.length === 0 && cardsToShow.length === 0) {
            setTimeout(() => {
                isAnimating = false;
            }, 100);
        }
    }
    
    // ========== ОБРАБОТЧИКИ ФИЛЬТРОВ ==========
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isAnimating) return;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            filterCards(currentFilter);
        });
    });
    
    // ========== ПЛАВНОЕ ПОЯВЛЕНИЕ КАРТОЧЕК ПРИ ЗАГРУЗКЕ ==========
    // Сначала скрываем все карточки
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Затем показываем их с задержкой
    setTimeout(() => {
        allCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }, 100);
    
    // ========== ИНИЦИАЛИЗАЦИЯ КНОПОК "ЧИТАТЬ ДАЛЕЕ" ==========
    setTimeout(() => {
        initAllReadMoreButtons();
    }, 500);
    
    // ========== ОБНОВЛЕНИЕ ПРИ РЕСАЙЗЕ ==========
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initAllReadMoreButtons();
        }, 200);
    });
    
    // ========== ОБРАБОТКА ФОРМЫ В ФУТЕРЕ ==========
    const footerForm = document.getElementById('footerForm');
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('footer-name')?.value;
            const phone = document.getElementById('footer-phone')?.value;
            const email = document.getElementById('footer-email')?.value;
            
            if (name && phone && email) {
                alert('Спасибо! Наш администратор свяжется с вами в ближайшее время.');
                footerForm.reset();
            } else {
                alert('Пожалуйста, заполните все поля.');
            }
        });
    }
});

// ========== ФУНКЦИИ ДЛЯ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН ==========
function openBlogModal(blogId) {
    const blogTitles = {
        1: 'Как выбрать масло для массажа',
        2: 'Тайский массаж: древняя техника исцеления',
        3: 'Секреты долголетия: восточные практики'
    };
    
    const title = blogTitles[blogId] || 'Статья';
    alert(`Открыть полную версию статьи: ${title}`);
}

function openMasterModal(masterId) {
    alert(`Открыть информацию о мастере №${masterId}`);
}