document.addEventListener("DOMContentLoaded", function () {
  mostrarDatosUsuario();
});

function mostrarDatosUsuario() {
  var nombreUser = sessionStorage.getItem("Usuario");
  var cantMonedas = sessionStorage.getItem("puntos");
  var codRol = sessionStorage.getItem("codRol");

  if (nombreUser) {
    var nombreUs = document.getElementById("NombreUser");
    var cantMonedasElem = document.getElementById("cantMonedas");

    if (nombreUs) {
      nombreUs.textContent = nombreUser;
      cantMonedasElem.textContent = cantMonedas;
    }
  } else {
    console.log("No se ha almacenado el nombre del usuario");
  }
  if (codRol == 1) {
    console.log("El usuario es un usuario regular");
    btnAdmin.style.display = "none";
  } else if (codRol == 2) {
    console.log("El usuario es administrador");
    botonAdmin.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarDatosUsuario();
});

function mostrarDatosUsuario() {
  var nombreUser = sessionStorage.getItem("Usuario");
  var cantMonedas = sessionStorage.getItem("puntos");

  if (nombreUser) {
    var nombreUs = document.getElementById("NombreUser");
    var moneditas = document.getElementById("moneda");
    var cantMonedasElem = document.getElementById("cantMonedas");

    if (nombreUs) {
      nombreUs.textContent = nombreUser;
      cantMonedasElem.textContent = cantMonedas;
    }
  } else {
    console.log("No se ha almacenado el nombre del usuario");
  }
}
let draggedElement = null;

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
    "problem1-call": "option1",
    "problem2-parameter": "option4",
    "problem3-call": "option7",
  };

  let allCorrect = true;

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

  return allCorrect;
}

// Maneja la navegación a la siguiente página
function navigateToNextPage() {
  if (checkAnswers()) {
    const container = document.querySelector(".container");
    container.style.transition = "transform 0.5s ease-in-out";
    container.style.transform = "translateX(-100vw)";

    setTimeout(() => {
      window.location.href =
        "http://127.0.0.1:5500/src/main/resources/templates/0.2_LeccionCompletada.html"; // Cambia la URL a la siguiente página
    }, 500);
  } else {
    alert("No has respondido todas las preguntas correctamente, por favor vuelve a intentarlo");
  }
}

// Asignar evento al botón de "Siguiente"
document.getElementById("nextButton").addEventListener("click", navigateToNextPage);
