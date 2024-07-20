function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    if (event.target.classList.contains('correct')) {
        event.preventDefault(); // No permite arrastrar si ya está correctamente colocado
    } else {
        event.dataTransfer.setData("text", event.target.id);
    }
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var droppedElement = document.getElementById(data);
    var dropZone = event.target;

    // Check if the dropZone is already correct
    if (dropZone.classList.contains('correct')) {
        return; // No permite reemplazar una zona correcta
    }

    // Check if the dropZone is a valid drop target
    if (dropZone.classList.contains('drop-zone') && dropZone.textContent.trim() === "") {
        dropZone.textContent = droppedElement.textContent.trim();
        droppedElement.style.display = "none";

        // Check if the dropped answer is correct
        if (dropZone.textContent.trim() === dropZone.getAttribute("data-correct").trim()) {
            dropZone.style.backgroundColor = "lightgreen";
            dropZone.classList.add('correct');
            droppedElement.classList.add('correct');
            
            // Check if all drop zones are correct
            if (areAllDropZonesCorrect()) {
                document.getElementById("successIcon").style.display = "block";
            }
        } else {
            dropZone.style.backgroundColor = "#ffbfaa";
            setTimeout(() => {
                dropZone.textContent = "";
                dropZone.style.backgroundColor = "";
                droppedElement.style.display = "inline-block";
            }, 1000);
        }
    }
}

function areAllDropZonesCorrect() {
    const dropZones = document.querySelectorAll('.drop-zone');
    return Array.from(dropZones).every(zone => zone.classList.contains('correct'));
}

function navigateToNextPage() {
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = 'translateX(-100vw)';

    setTimeout(() => {
        window.location.href = 'src/main/resources/templates/nextpage.html'; // Cambia 'nextpage.html' a la URL de la siguiente página
    }, 500);
}
