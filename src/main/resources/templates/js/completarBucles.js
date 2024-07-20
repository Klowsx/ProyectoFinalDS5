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
    var correctAnswer = "10";

    dropZone.textContent = droppedElement.textContent;

    // Check if the dropped answer is correct
    if (droppedElement.textContent.trim() === correctAnswer) {
        dropZone.style.backgroundColor = "lightgreen";
        document.getElementById("successIcon").style.display = "block";
        
        // Hide all option buttons
        var options = document.querySelectorAll(".option");
        options.forEach(option => {
            option.style.display = "none";
        });
    } else {
        dropZone.style.backgroundColor = "#ffbfaa";
        setTimeout(() => {
            dropZone.textContent = "__";
            dropZone.style.backgroundColor = "";
            droppedElement.style.display = "inline-block";
        }, 1000);
    }

    droppedElement.style.display = "none";
}

function navigateToNextPage() {
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = 'translateX(-100vw)';
    
    setTimeout(() => {
        window.location.href = 'src/main/resources/templates/nextpage.html'; // Cambia 'nextpage.html' a la URL de la siguiente página
    }, 500);
}
