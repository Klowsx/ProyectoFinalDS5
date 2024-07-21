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
  if (event.target.classList.contains("correct")) {
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
  if (dropZone.classList.contains("correct")) {
    return; // No permite reemplazar una zona correcta
  }

  // Check if the dropZone is a valid drop target
  if (dropZone.classList.contains("drop-zone") && dropZone.textContent.trim() === "") {
    dropZone.textContent = droppedElement.textContent.trim();
    droppedElement.style.display = "none";

    // Check if the dropped answer is correct
    if (droppedElement.id === dropZone.getAttribute("data-correct")) {
      dropZone.style.backgroundColor = "lightgreen";
      dropZone.classList.add("correct");
      droppedElement.classList.add("correct");

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
  const dropZones = document.querySelectorAll(".drop-zone");
  return Array.from(dropZones).every((zone) => zone.classList.contains("correct"));
}

function navigateToNextPage() {
  const container = document.querySelector(".container");
  container.style.transition = "transform 0.5s ease-in-out";
  container.style.transform = "translateX(-100vw)";

  setTimeout(() => {
    window.location.href = "src/main/resources/templates/nextpage.html"; // Cambia 'nextpage.html' a la URL de la siguiente página
  }, 500);
}

function navigateToNextPage() {
  if (areAllDropZonesCorrect()) {
    // Si todas las zonas de caída están correctas, se realiza la transición a la siguiente página
    const container = document.querySelector(".container");
    container.style.transition = "transform 0.5s ease-in-out";
    container.style.transform = "translateX(-100vw)";

    setTimeout(() => {
      window.location.href =
        "http://127.0.0.1:5500/src/main/resources/templates/0.2_LeccionCompletada.html"; // Cambia 'nextpage.html' a la URL de la siguiente página
    }, 500);
  } else {
    // Si no todas las zonas de caída están correctas, se muestra un mensaje de advertencia
    alert("Por favor, completa la lección antes de avanzar.");
  }
}

function areAllDropZonesCorrect() {
  const dropZones = document.querySelectorAll(".drop-zone");
  return Array.from(dropZones).every((zone) => zone.classList.contains("correct"));
}
