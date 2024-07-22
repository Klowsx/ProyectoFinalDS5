document.addEventListener("DOMContentLoaded", function () {
  mostrarNombreUsuario();
  actualizarPuntosUsuario(); // Llama a la función para actualizar los puntos
  document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
});

function mostrarNombreUsuario() {
  var nombreUser = sessionStorage.getItem("Usuario");
  var cantMonedas = sessionStorage.getItem("puntos");
  var codRol = sessionStorage.getItem("codRol");
  var leccionMasAlta = sessionStorage.getItem("leccionMasAlta");

  console.log("Nombre del usuario almacenado:", nombreUser);
  console.log("Cantidad de monedas almacenadas:", cantMonedas);
  console.log("Código de rol almacenado:", codRol);
  console.log("Lección más alta completada:", leccionMasAlta);

  if (nombreUser) {
    var nombreUs = document.getElementById("NombreUser");
    var moneditas = document.getElementById("moneda");
    var cantMonedasElem = document.getElementById("cantMonedas");
    var botonAdmin = document.getElementById("btnAdmin");

    if (nombreUs) {
      nombreUs.textContent = nombreUser;
      cantMonedasElem.textContent = cantMonedas;
    }

    if (codRol == 1) {
      console.log("El usuario es un usuario regular");
      botonAdmin.style.display = "none";
    } else if (codRol == 2) {
      console.log("El usuario es administrador");
      botonAdmin.style.display = "block";
    }

    marcarLeccionCompletada(leccionMasAlta);
  } else {
    console.log("No se ha almacenado el nombre del usuario");
  }
}

function marcarLeccionCompletada(leccionMasAlta) {
  for (var i = 1; i <= leccionMasAlta; i++) {
    var leccionElem = document.getElementById(`leccion${i}`);
    if (leccionElem) {
      leccionElem.classList.add("completada");
    }
  }
}

function actualizarPuntosUsuario() {
  var idUsuario = sessionStorage.getItem("idUsuario");

  if (idUsuario) {
    fetch(`http://localhost:8080/puntos/${idUsuario}`) // Ajusta la URL según tu configuración
      .then((response) => response.json())
      .then((data) => {
        var puntos = data; // Suponiendo que el servidor devuelve un número entero
        sessionStorage.setItem("puntos", puntos); // Actualiza el sessionStorage
        document.getElementById("cantMonedas").textContent = puntos; // Actualiza el contenido en la página

        // Verificar si el usuario tiene 400 puntos y redirigir si es así
        if (puntos == 400) {
          window.location.href =
            "http://127.0.0.1:5500/src/main/resources/templates/0.4_JuegoCompletado.html";
        }
      })
      .catch((error) => console.error("Error al obtener puntos:", error));
  }
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "http://127.0.0.1:5500/src/main/resources/templates/0.1_Login.html";
}
