let draggedElements = []; // Para almacenar elementos arrastrables

function navigateToNextPage() {
  const allCorrect = checkAnswers(true); // Llamada a checkAnswers con argumento true para solo verificar

  if (allCorrect) {
    window.location.href =
      "http://127.0.0.1:5500/src/main/resources/templates/0.2_LeccionCompletada.html"; // Cambia 'nextpage.html' a la URL de la siguiente página
  } else {
    showWarningMessage("Debe completar esta práctica para avanzar");
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  const target = ev.target;

  // Si el campo de destino ya tiene un valor, devolverlo a la lista de opciones
  if (target.value) {
    restoreToOptions(target.value.trim());
  }

  // Actualiza el valor del campo de entrada
  target.value = draggedElement.textContent.trim();

  // Elimina el elemento arrastrado del DOM y lo almacena en draggedElements
  draggedElements.push(draggedElement.cloneNode(true)); // Clona el elemento para restaurarlo después
  draggedElement.remove();
}

function restoreToOptions(value) {
  const answerOptions = document.querySelector(".answer-options");
  draggedElements.forEach((element, index) => {
    if (element.textContent.trim() === value) {
      answerOptions.appendChild(element);
      draggedElements.splice(index, 1); // Elimina el elemento restaurado de draggedElements
    }
  });
}

function showWarningMessage(message) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.style.color = "red";

  setTimeout(() => {
    feedback.textContent = "";
  }, 3000); // Mensaje se muestra durante 3 segundos
}

function checkAnswers(isForNavigation = false) {
  const answers = {
    "edad-type": "int",
    "nombre-value": '"Ana"',
    "precio-type": "double",
    "altura-value": "1.75",
    "esEstudiante-type": "boolean",
    "letra-value": "'B'",
    "mensaje-type": "String",
  };

  let allCorrect = true;
  let anyFieldEmpty = false;

  for (let id in answers) {
    const userAnswer = document.getElementById(id).value.trim();
    const correctAnswer = answers[id];

    if (userAnswer === "") {
      anyFieldEmpty = true;
      allCorrect = false;
      document.getElementById(id).style.backgroundColor = "lightcoral";
    } else if (userAnswer === correctAnswer) {
      document.getElementById(id).style.backgroundColor = "lightgreen";
    } else {
      document.getElementById(id).style.backgroundColor = "lightcoral";
      allCorrect = false;
    }
  }

  if (anyFieldEmpty && !isForNavigation) {
    showWarningMessage("Debe llenar los campos");
  } else if (allCorrect && !isForNavigation) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "¡Todas las respuestas son correctas!";
    feedback.style.color = "green";
  } else if (!allCorrect && !isForNavigation) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "Algunas respuestas son incorrectas. Inténtalo de nuevo.";
    feedback.style.color = "red";
  }

  return allCorrect;
}
