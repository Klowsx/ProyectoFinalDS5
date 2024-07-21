let draggedElement = null;
let allCorrect = false; // Variable global para almacenar el estado de respuestas correctas

// Permite el arrastre
function allowDrop(event) {
  event.preventDefault();
}

// Inicia el arrastre
function drag(event) {
  draggedElement = event.target;
  event.dataTransfer.setData("text", event.target.id);
}

// Maneja la caída del elemento
function drop(event) {
  event.preventDefault();
  const dropZone = event.target;

  // Si el dropZone ya tiene un valor, devuélvelo a las opciones
  if (dropZone.getAttribute("data-value")) {
    const originalOption = document.getElementById(dropZone.getAttribute("data-value"));
    originalOption.style.display = "flex"; // Mostrar la opción de nuevo
  }

  dropZone.value = draggedElement.textContent;
  dropZone.setAttribute("data-value", event.dataTransfer.getData("text"));
  draggedElement.style.display = "none"; // Ocultar la opción arrastrada

  // Agregar un evento click para permitir reemplazar la opción
  dropZone.addEventListener("click", () => {
    const originalOption = document.getElementById(dropZone.getAttribute("data-value"));
    originalOption.style.display = "flex"; // Mostrar la opción de nuevo
    dropZone.value = ""; // Limpiar el drop zone
    dropZone.removeAttribute("data-value");
  });
}

// Verifica si las respuestas son correctas
function checkAnswers() {
  const correctAnswers = {
    "for-loop-init": "option1",
    "for-loop-condition": "option2",
    "for-loop-update": "option3",
    "while-loop-condition": "option4",
    "do-while-loop-condition": "option6",
  };

  allCorrect = true; // Inicialmente asumimos que todas las respuestas son correctas

  for (const [inputId, correctOptionId] of Object.entries(correctAnswers)) {
    const inputElement = document.getElementById(inputId);

    if (inputElement.getAttribute("data-value") === correctOptionId) {
      inputElement.style.border = "2px solid green";
    } else {
      inputElement.style.border = "2px solid red";
      allCorrect = false;

      // Devolver la opción incorrecta a su lugar original
      const incorrectOption = document.getElementById(inputElement.getAttribute("data-value"));
      if (incorrectOption) {
        incorrectOption.style.display = "flex"; // Mostrar la opción incorrecta de nuevo
      }
      inputElement.value = ""; // Limpiar el drop zone
      inputElement.removeAttribute("data-value");
    }
  }

  const feedback = document.getElementById("feedback");
  feedback.style.display = "block";
  feedback.textContent = allCorrect
    ? "¡Todas las respuestas son correctas!"
    : "Algunas respuestas son incorrectas, inténtalo de nuevo.";
  feedback.style.color = allCorrect ? "green" : "red";
}

// Maneja la navegación a la siguiente página
function navigateToNextPage() {
  const container = document.querySelector(".container");
  container.style.transition = "transform 0.5s ease-in-out";
  container.style.transform = "translateX(-100vw)";

  setTimeout(() => {
    window.location.href =
      "http://127.0.0.1:5500/src/main/resources/templates/3.3_ArmarCodigo.html"; // Cambia a la URL de la siguiente página
  }, 500);
}

// Asignar evento al botón de "Siguiente"
document.getElementById("nextButton").addEventListener("click", () => {
  checkAnswers(); // Verificar respuestas antes de navegar
  navigateToNextPage(); // Navegar a la siguiente página
});
