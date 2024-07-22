document.addEventListener("DOMContentLoaded", function () {
  mostrarDatosUsuario();
});

let baseUrl = "http://localhost:8080"

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

async function añadirPuntos(userId, puntos) {
  const usuario = {
      idUsuario: userId,
      puntos: puntos
  }

  try {
      const response = await fetch(baseUrl + '/puntos', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
      });

      if (response.ok) {
          const result = await response.json();
          console.log('Puntos actualizados exitosamente:', result);
      } else {
          console.error('Error al actualizar los puntos:', response.statusText);
      }
  } catch (error) {
      console.error('Error en la solicitud:', error);
  }
}

function navigateToNextPage() {
  const container = document.querySelector(".container");
  container.style.transition = "transform 0.5s ease-in-out";
  container.style.transform = "translateX(-100vw)";

  setTimeout(() => {
    window.location.href =
      "http://127.0.0.1:5500/src/main/resources/templates/1.1_IntroducciónAlIde.html"; // Cambia 'nextpage.html' a la URL de la siguiente página
  }, 500);
}
