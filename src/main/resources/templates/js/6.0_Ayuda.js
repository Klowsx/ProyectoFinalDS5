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

function navigateToNextPage() {
  const container = document.querySelector(".container");
  container.style.transition = "transform 0.5s ease-in-out";
  container.style.transform = "translateX(-100vw)";

  setTimeout(() => {
    window.location.href =
      "http://127.0.0.1:5500/src/main/resources/templates/6.1_Documentacion.html"; // Cambia 'nextpage.html' a la URL de la siguiente página
  }, 500);
}

function toggleFaq(id) {
  const answer = document.getElementById(`faq-${id}`);
  const arrow = answer.previousElementSibling.querySelector(".arrow");
  if (answer.style.display === "block") {
    answer.style.display = "none";
    arrow.classList.remove("up");
  } else {
    answer.style.display = "block";
    arrow.classList.add("up");
  }
}
