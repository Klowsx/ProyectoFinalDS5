function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var droppedElement = document.getElementById(data);
    var dropZone = event.target;

    if (dropZone.classList.contains('drop-zone')) {
        dropZone.innerHTML = droppedElement.innerHTML;
        dropZone.classList.remove('placeholder');
        droppedElement.style.display = "none";
        
        checkCompletion();
    }
}

function checkCompletion() {
    var zones = document.querySelectorAll('.drop-zone');
    var correctOrder = [
        'public void miMetodo() {',
        'System.out.println("Hola Mundo");',
        '}'
    ];

    let isComplete = Array.from(zones).map(zone => zone.textContent.trim()).every((content, index) => content === correctOrder[index]);

    if (isComplete) {
        document.getElementById("successIcon").style.display = "block";
    }
}

function navigateToNextPage() {
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = 'translateX(-100vw)';
    
    setTimeout(() => {
        window.location.href = 'src/main/resources/templates/nextpage.html'; // Cambia 'nextpage.html' a la URL de la siguiente página
    }, 500);
}
