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

let noBtnWidth = 150;
let noBtnHeight = 50;
let confirmNoWidth = 150;
let confirmNoHeight = 50;

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

function moveButton(button, btnWidth, btnHeight) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const padding = 60;
    
    const minX = padding;
    const maxX = viewportWidth - btnWidth - padding;
    const minY = padding;
    const maxY = viewportHeight - btnHeight - padding;
    
    const safeMaxX = Math.max(minX + 10, maxX);
    const safeMaxY = Math.max(minY + 10, maxY);
    
    const newX = Math.random() * (safeMaxX - minX) + minX;
    const newY = Math.random() * (safeMaxY - minY) + minY;
    
    button.classList.add('running');
    button.style.left = newX + 'px';
    button.style.top = newY + 'px';
    
    console.log(`Кнопка: x=${newX.toFixed(0)}, y=${newY.toFixed(0)}, viewport: ${viewportWidth}x${viewportHeight}, btn: ${btnWidth}x${btnHeight}`);
}

function resetButton(button) {
    button.classList.remove('running');
    button.style.left = '';
    button.style.top = '';
}

function resetAllButtons() {
    resetButton(noBtn);
    resetButton(confirmNo);
    noBtnMoveCount = 0;
}

window.addEventListener('load', function() {
    const noRect = noBtn.getBoundingClientRect();
    noBtnWidth = noRect.width || 150;
    noBtnHeight = noRect.height || 50;
    
    const confirmRect = confirmNo.getBoundingClientRect();
    confirmNoWidth = confirmRect.width || 150;
    confirmNoHeight = confirmRect.height || 50;
    
    console.log('Размеры noBtn:', noBtnWidth, 'x', noBtnHeight);
    console.log('Размеры confirmNo:', confirmNoWidth, 'x', confirmNoHeight);
    console.log('Viewport:', window.innerWidth, 'x', window.innerHeight);
});

noBtn.addEventListener('mouseenter', function() {
    if (noBtnMoveCount < MAX_NO_MOVES) {
        noBtnMoveCount++;
        console.log('noBtn убегает, счётчик:', noBtnMoveCount);
        moveButton(noBtn, noBtnWidth, noBtnHeight);
    }
});

noBtn.addEventListener('touchstart', function(e) {
    if (noBtnMoveCount < MAX_NO_MOVES) {
        e.preventDefault();
        noBtnMoveCount++;
        moveButton(noBtn, noBtnWidth, noBtnHeight);
    }
});

noBtn.addEventListener('click', function() {
    confirmModal.style.display = 'flex';
    resetAllButtons();
});

confirmNo.addEventListener('mouseenter', function() {
    moveButton(confirmNo, confirmNoWidth, confirmNoHeight);
});

confirmNo.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveButton(confirmNo, confirmNoWidth, confirmNoHeight);
});

confirmNo.addEventListener('click', function(e) {
    e.preventDefault();
});

confirmYes.addEventListener('click', function() {
    confirmModal.style.display = 'none';
    resetAllButtons();
});

yesBtn.addEventListener('click', function() {
    showSuccess();
});

function showSuccess() {
    mainContainer.style.display = 'none';
    successMessage.style.display = 'block';
    startInfiniteHearts();
}

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

createFloatingHearts();