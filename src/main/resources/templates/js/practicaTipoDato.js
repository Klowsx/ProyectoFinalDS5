let draggedElements = []; // Para almacenar elementos arrastrables

function navigateToNextPage() {
    const container = document.querySelector('.container');
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = 'translateX(-100vw)';
    
    setTimeout(() => {
        window.location.href = 'nextpage.html'; // Cambia 'nextpage.html' a la URL de la siguiente página
    }, 500);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    // Actualiza el valor del campo de entrada
    ev.target.value = draggedElement.textContent;

    // Elimina el elemento arrastrado del DOM y lo almacena en draggedElements
    draggedElements.push(draggedElement.cloneNode(true)); // Clona el elemento para restaurarlo después
    draggedElement.remove();
}

function showWarningMessage(message) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.style.color = 'red';

    setTimeout(() => {
        feedback.textContent = '';
    }, 1000); // Mensaje se muestra durante 5 segundos
}

function checkAnswers() {
    const answers = {
        'edad-type': 'int',
        'precio-type': 'double'
    };
    
    let allCorrect = true;
    let anyFieldEmpty = false;

    for (let id in answers) {
        const userAnswer = document.getElementById(id).value.trim();
        const correctAnswer = answers[id];
        
        if (userAnswer === '') {
            anyFieldEmpty = true;
        } else if (userAnswer === correctAnswer) {
            document.getElementById(id).style.backgroundColor = 'lightgreen';
        } else {
            document.getElementById(id).style.backgroundColor = 'lightcoral';
            allCorrect = false;
        }
    }

    // Special case for nombre-type
    const nombreTypeInput = document.getElementById('nombre-type');
    const nombreTypeValue = nombreTypeInput.value.trim();
    const isNombreValid = /^".*"$/.test(nombreTypeValue); // Checks if the input is enclosed in quotes

    if (nombreTypeValue === '') {
        anyFieldEmpty = true;
    } else if (isNombreValid) {
        nombreTypeInput.style.backgroundColor = 'lightgreen';
    } else {
        nombreTypeInput.style.backgroundColor = 'lightcoral';
        allCorrect = false;
    }

    const feedback = document.getElementById('feedback');
    
    if (anyFieldEmpty) {
        showWarningMessage('Debe llenar los campos');
    } else if (allCorrect) {
        feedback.textContent = '¡Todas las respuestas son correctas!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Algunas respuestas son incorrectas. Inténtalo de nuevo.';
        feedback.style.color = 'red';

        // Limpia los cuadros de respuestas
        document.querySelectorAll('.answer-box').forEach(input => {
            input.value = '';
            input.style.backgroundColor = ''; // Restablece el color de fondo
        });

        // Restaura las opciones arrastrables
        const answerOptions = document.querySelector('.answer-options');
        draggedElements.forEach(element => {
            answerOptions.appendChild(element);
        });
        draggedElements = []; // Limpia el array de elementos arrastrables
    }
}
