function navigateToNextPage() {
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = 'translateX(-100vw)';
    
    setTimeout(() => {
        window.location.href = 'src/main/resources/templates/practicaTipoDato.html'; // Cambia 'nextpage.html' a la URL de la siguiente página
    }, 500);
}
