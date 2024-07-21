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
        restoreElement(draggedElement);
      }, 1000); // Tiempo para mostrar el feedback antes de restaurar
    }
  }
}

function restoreElement(element) {
  // Busca el contenedor de opciones al que debería regresar el elemento
  const options = document.querySelector(`#options${element.dataset.method}`);
  element.style.display = "inline-block";
  options.appendChild(element);

  // Limpia la zona de caída si el elemento estaba allí
  const dropZones = document.querySelectorAll(".drop-zone");
  dropZones.forEach((zone) => {
    if (zone.getAttribute("data-id") === element.id) {
      zone.classList.remove("correct");
      zone.classList.remove("incorrect");
      zone.innerHTML = ""; // Limpia el contenido
      zone.removeAttribute("data-id"); // Elimina el ID incorrecto si lo tenía
    }
  });
}

function checkCompletion() {
  var zones = document.querySelectorAll(".drop-zone");
  var correctOrder = Array.from(zones).map((zone) => zone.getAttribute("data-correct-id"));

  let isComplete = Array.from(zones)
    .map((zone) => zone.getAttribute("data-id"))
    .every((id, index) => id === correctOrder[index]);

  if (isComplete) {
    document.getElementById("successIcon").style.display = "block";
  }
}

function navigateToNextPage() {
  const container = document.querySelector(".container");
  container.style.transition = "transform 0.5s ease-in-out";
  container.style.transform = "translateX(-100vw)";

  setTimeout(() => {
    window.location.href = "src/main/resources/templates/nextpage.html"; // Cambia 'nextpage.html' a la URL de la siguiente página
  }, 500);
}
