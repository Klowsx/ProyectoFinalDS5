document.addEventListener('DOMContentLoaded', () => {
    // Add confetti cannons
    addConfettiCannon('left-cannon');
    addConfettiCannon('right-cannon');

    // Trigger confetti burst every 2 seconds
    setInterval(() => {
        triggerConfetti('left-diagonal');
        triggerConfetti('right-diagonal');
    }, 2000);
});

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFF533', '#33FFF5'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function addConfettiCannon(cannonClass) {
    const cannon = document.createElement('div');
    cannon.classList.add('confetti-cannon', cannonClass);
    document.body.appendChild(cannon);
}

function triggerConfetti(diagonalClass) {
    const element = document.createElement('div');
    element.classList.add('confetti', 'diagonal', diagonalClass);
    document.body.appendChild(element);

    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.classList.add('confetti-piece');
        confettiPiece.style.left = `${Math.random() * 100}%`;
        confettiPiece.style.top = `${Math.random() * 100}%`;
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.animationDelay = `${Math.random() * 0.5}s`;
        element.appendChild(confettiPiece);

        // Remove confetti piece after animation ends
        setTimeout(() => {
            element.removeChild(confettiPiece);
        }, 2000);
    }

    // Remove the diagonal confetti container after the animation ends
    setTimeout(() => {
        document.body.removeChild(element);
    }, 2000);
}
