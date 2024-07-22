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
    document.getElementById("btnAdmin").style.display = "none";
  } else if (codRol == 2) {
    console.log("El usuario es administrador");
    document.getElementById("btnAdmin").style.display = "block";
  }
}

let draggedElement = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedElement = event.target;
  event.dataTransfer.setData("text", event.target.id);
  draggedElement.setAttribute("data-original-container", draggedElement.parentElement.id);
}

function drop(event) {
  event.preventDefault();
  const dropZone = event.target;

  if (dropZone.classList.contains("drop-zone")) {
    // Si el dropZone ya tiene un valor, devuélvelo a las opciones
    if (dropZone.getAttribute("data-value")) {
      const originalOption = document.getElementById(dropZone.getAttribute("data-value"));
      originalOption.style.display = "block"; // Mostrar la opción de nuevo
    }

    dropZone.value = draggedElement.textContent;
    dropZone.setAttribute("data-value", event.dataTransfer.getData("text"));
    draggedElement.style.display = "none"; // Ocultar la opción arrastrada

    // Agregar un evento click para permitir reemplazar la opción
    dropZone.addEventListener("click", () => {
      const originalOption = document.getElementById(dropZone.getAttribute("data-value"));
      originalOption.style.display = "block"; // Mostrar la opción de nuevo
      dropZone.value = ""; // Limpiar el drop zone
      dropZone.removeAttribute("data-value");
    });
  }
}

function restoreElement(element) {
  var originalContainerId = element.getAttribute("data-original-container");
  var optionsContainer = document.getElementById(originalContainerId);
  optionsContainer.appendChild(element);
  element.style.display = "inline-block";
}

function checkAnswers() {
  const correctAnswers = {
    "age-condition": "option1",
    "score-condition": "option4",
    "rain-condition": "option7",
  };

  let allCorrect = true;

  for (const [inputId, correctOptionId] of Object.entries(correctAnswers)) {
    const inputElement = document.getElementById(inputId);
    const selectedOptionId = inputElement.getAttribute("data-value");

    if (selectedOptionId === correctOptionId) {
      inputElement.classList.add("correct");
      inputElement.classList.remove("incorrect");
    } else {
      inputElement.classList.add("incorrect");
      inputElement.classList.remove("correct");
      if (selectedOptionId) {
        restoreElement(document.getElementById(selectedOptionId));
      }
      inputElement.value = ""; // Limpiar el valor del input
      inputElement.removeAttribute("data-value"); // Eliminar el atributo data-value
      allCorrect = false;
    }
  }

  if (allCorrect) {
    document.getElementById("feedback").textContent = "¡Correcto!";
    document.getElementById("successIcon").style.display = "block";
    document.getElementById("nextButton").disabled = false;
    document.getElementById("warningMessage").style.display = "none";
  } else {
    document.getElementById("feedback").textContent =
      "Algunas respuestas son incorrectas. Inténtalo de nuevo.";
    document.getElementById("nextButton").disabled = true;
    document.getElementById("warningMessage").style.display = "block";
  }
}

document.getElementById("nextButton").addEventListener("click", function () {
  if (document.getElementById("nextButton").disabled) {
    document.getElementById("warningMessage").style.display = "block";
  } else {
    window.location.href =
      "http://127.0.0.1:5500/src/main/resources/templates/3.2_CompletarBucles.html";
  }
});
