document.addEventListener("DOMContentLoaded", function () {
  const titles = document.querySelectorAll(".sidebar ul li span");

  titles.forEach((title) => {
    title.addEventListener("click", function () {
      const subMenu = this.nextElementSibling;
      if (subMenu.style.display === "block") {
        subMenu.style.display = "none";
      } else {
        subMenu.style.display = "block";
      }
    });
  });

  const subMenuItems = document.querySelectorAll(".sub-menu li");

  subMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const content = document.querySelector(".content");
      content.innerHTML = `<h2>${this.innerText}</h2><p>Información detallada sobre ${this.innerText}.</p>`;
    });
  });
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
      "http://127.0.0.1:5500/src/main/resources/templates/2.2_SeleccionMultipleVariables.html"; // Cambia 'nextpage.html' a la URL de la siguiente página
  }, 500);
}
