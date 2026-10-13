const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const confirmModal = document.getElementById('confirmModal');
const confirmNo = document.getElementById('confirmNo');
const confirmYes = document.getElementById('confirmYes');
const mainContainer = document.getElementById('mainContainer');
const successMessage = document.getElementById('successMessage');
const floatingHeartsContainer = document.getElementById('floatingHearts');

let noBtnMoveCount = 0;
const MAX_NO_MOVES = 5;

// Размеры кнопок
let noBtnWidth = 150;
let noBtnHeight = 50;
let confirmNoWidth = 150;
let confirmNoHeight = 50;

// Текущие позиции кнопок (для transform)
let currentNoX = 0, currentNoY = 0;
let currentConfirmNoX = 0, currentConfirmNoY = 0;

function createFloatingHearts() {
    const hearts = ['💖', '💕', '', '💓', '🌸', '✨'];
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        floatingHeartsContainer.appendChild(heart);
    }
}

// Получаем размеры видимой области (с поддержкой iOS visualViewport)
function getViewportSize() {
    if (window.visualViewport) {
        return {
            width: window.visualViewport.width,
            height: window.visualViewport.height
        };
    }
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

// Функция для перемещения кнопки с использованием transform
function moveButton(button, btnWidth, btnHeight, currentX, currentY) {
    const viewport = getViewportSize();
    
    // Ограничиваем перемещение центральной зоной экрана (15% - 85%)
    const marginX = viewport.width * 0.15;
    const marginY = viewport.height * 0.15;
    const maxOffsetX = viewport.width * 0.7 - btnWidth;
    const maxOffsetY = viewport.height * 0.7 - btnHeight;
    
    // Генерируем новую позицию в пределах центральной зоны
    const newX = Math.random() * maxOffsetX + marginX;
    const newY = Math.random() * maxOffsetY + marginY;
    
    // Вычисляем смещение относительно текущей позиции
    const deltaX = newX - currentX;
    const deltaY = newY - currentY;
    
    // Применяем transform
    button.classList.add('running');
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    
    // Сохраняем абсолютную позицию для следующего перемещения
    const newAbsoluteX = currentX + deltaX;
    const newAbsoluteY = currentY + deltaY;
    
    console.log(`Кнопка: newX=${newX.toFixed(0)}, newY=${newY.toFixed(0)}, viewport=${viewport.width}x${viewport.height}`);
    
    return { x: newAbsoluteX, y: newAbsoluteY };
}

// Функция для сброса кнопки
function resetButton(button) {
    button.classList.remove('running');
    button.style.transform = '';
}

function resetAllButtons() {
    resetButton(noBtn);
    resetButton(confirmNo);
    currentNoX = 0;
    currentNoY = 0;
    currentConfirmNoX = 0;
    currentConfirmNoY = 0;
    noBtnMoveCount = 0;
}

// Сохраняем размеры кнопок после загрузки
window.addEventListener('load', function() {
    const noRect = noBtn.getBoundingClientRect();
    noBtnWidth = noRect.width || 150;
    noBtnHeight = noRect.height || 50;
    
    const confirmRect = confirmNo.getBoundingClientRect();
    confirmNoWidth = confirmRect.width || 150;
    confirmNoHeight = confirmRect.height || 50;
    
    console.log('Размеры noBtn:', noBtnWidth, 'x', noBtnHeight);
    console.log('Размеры confirmNo:', confirmNoWidth, 'x', confirmNoHeight);
});

// Универсальный обработчик для кнопки "Нет"
function handleNoBtnMove(e) {
    if (noBtnMoveCount < MAX_NO_MOVES) {
        noBtnMoveCount++;
        if (e) e.preventDefault();
        
        const result = moveButton(noBtn, noBtnWidth, noBtnHeight, currentNoX, currentNoY);
        currentNoX = result.x;
        currentNoY = result.y;
        
        // Вибрация на мобильных (если поддерживается)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

noBtn.addEventListener('mouseenter', handleNoBtnMove);
noBtn.addEventListener('touchstart', handleNoBtnMove, { passive: false });
noBtn.addEventListener('click', function() {
    confirmModal.style.display = 'flex';
    resetAllButtons();
});

// Универсальный обработчик для кнопки "Точно-точно нет"
function handleConfirmNoMove(e) {
    if (e) e.preventDefault();
    
    const result = moveButton(confirmNo, confirmNoWidth, confirmNoHeight, currentConfirmNoX, currentConfirmNoY);
    currentConfirmNoX = result.x;
    currentConfirmNoY = result.y;
    
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
}

confirmNo.addEventListener('mouseenter', handleConfirmNoMove);
confirmNo.addEventListener('touchstart', handleConfirmNoMove, { passive: false });
confirmNo.addEventListener('click', function(e) {
    e.preventDefault();
    handleConfirmNoMove(e);
});

// Обработчик для кнопки "Ой, я передумала 💖"
confirmYes.addEventListener('click', function() {
    confirmModal.style.display = 'none';
    resetAllButtons();
});

// Кнопка "Да"
yesBtn.addEventListener('click', function() {
    showSuccess();
});

function showSuccess() {
    mainContainer.style.display = 'none';
    successMessage.style.display = 'block';
    startInfiniteHearts();
}

// Бесконечный дождь из сердечек
let heartsInterval;

function startInfiniteHearts() {
    const hearts = ['💖', '💕', '💗', '💓', '❤️', '💘', '💝', '🫰', '💋', '❤️‍🔥', '🤍', '💜'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
        
        document.body.appendChild(heart);
        
        const animation = heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720 - 360}deg)`, opacity: 0.8 }
        ], {
            duration: Math.random() * 3000 + 3000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => heart.remove();
    }
    
    heartsInterval = setInterval(createHeart, 100);
    
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 50);
    }
}

confirmModal.addEventListener('click', function(e) {
    if (e.target === confirmModal) {
        confirmModal.style.display = 'none';
        resetAllButtons();
    }
});

// Обновляем размеры при изменении viewport (для iOS)
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', function() {
        console.log('Viewport изменился:', window.visualViewport.width, 'x', window.visualViewport.height);
    });
}

createFloatingHearts();