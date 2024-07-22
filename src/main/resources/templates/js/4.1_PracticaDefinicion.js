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

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  var dropZone = event.target;

  if (dropZone.classList.contains("drop-zone")) {
    var correctId = dropZone.getAttribute("data-correct-id");

    if (data === correctId) {
      if (dropZone.innerHTML && dropZone.innerHTML !== draggedElement.innerHTML) {
        // Si la zona de caída ya tiene un elemento, restaurar el elemento anterior
        restoreElement(dropZone.querySelector(".option"));
      }

      dropZone.innerHTML = draggedElement.innerHTML;
      dropZone.classList.remove("placeholder");
      dropZone.classList.add("correct");
      draggedElement.style.display = "none";
      dropZone.setAttribute("data-id", data); // Marca la zona de caída con el ID del elemento correcto
    } else {
      dropZone.classList.add("incorrect");
      setTimeout(() => {
        dropZone.classList.remove("incorrect");
      }, 1000);
    }
  }
}

function navigateToNextPage() {
  var warningMessage = document.getElementById("warningMessage");

  if (verifyAndRestoreAnswers()) {
    // Redirige a la siguiente página si todas las respuestas son correctas
    window.location.href =
      "http://127.0.0.1:5500/src/main/resources/templates/4.2_LlamadaMetodos.html";
  } else {
    // Muestra el mensaje de advertencia si hay respuestas incorrectas
    warningMessage.style.display = "block";
    setTimeout(() => {
      warningMessage.style.display = "none";
    }, 3000);
  }
}

function restoreElement(element) {
  var optionsContainer = document.getElementById(
    element.id.startsWith("option1")
      ? "options1"
      : element.id.startsWith("option2")
      ? "options2"
      : "options3"
  );
  optionsContainer.appendChild(element);
  element.style.display = "inline-block";
}

function verifyAndRestoreAnswers() {
  var dropZones = document.querySelectorAll(".drop-zone");
  var allCorrect = true;

  dropZones.forEach(function (dropZone) {
    var correctId = dropZone.getAttribute("data-correct-id");
    var placedId = dropZone.getAttribute("data-id");

    if (correctId !== placedId) {
      allCorrect = false;
      var placedElement = dropZone.querySelector(".option");

      if (placedElement) {
        restoreElement(placedElement);
      }

      dropZone.classList.remove("correct");
      dropZone.classList.add("placeholder");
      dropZone.removeAttribute("data-id");
      dropZone.innerHTML = ""; // Limpia la zona de caída
    }
  });

  return allCorrect;
}
