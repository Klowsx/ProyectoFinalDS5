document.addEventListener("DOMContentLoaded", function () {
  mostrarDatosUsuario();
  cargarUsuarios();
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

  const btnAdmin = document.getElementById("btnAdmin");
  if (codRol == 1) {
    console.log("El usuario es un usuario regular");
    btnAdmin.style.display = "none";
  } else if (codRol == 2) {
    console.log("El usuario es administrador");
    btnAdmin.style.display = "block";
  }
}

function cargarUsuarios() {
  fetch("http://localhost:8080/usuarios/all")
    .then((response) => response.json())
    .then((usuarios) => {
      const container = document.getElementById("usuarios-container");
      const noUsuarios = document.getElementById("no-usuarios");

      container.innerHTML = ""; // Limpiar contenedor
      noUsuarios.style.display = "none"; // Ocultar mensaje de no usuarios

      if (usuarios.length === 0) {
        noUsuarios.style.display = "block"; // Mostrar mensaje si no hay usuarios
        return;
      }

      usuarios.forEach((usuario) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <div class="card-info">
            <p class="nombre">${usuario.Usuario}</p>
            <p class="leccion">Lección actual: ${usuario.NombreLeccion}</p>
          </div>
          <button class="btnEliminar" data-id="${usuario.idUsuario}">
            <img src="media/delete.png" alt="Eliminar Icono" class="iconoEliminar">
            <span>Eliminar</span>
          </button>
        `;
        container.appendChild(card);
      });

      // Añadir manejadores de eventos para los botones de eliminar
      document.querySelectorAll(".btnEliminar").forEach((button) => {
        button.addEventListener("click", function () {
          const idUsuario = this.getAttribute("data-id");
          eliminarUsuario(idUsuario);
        });
      });
    })
    .catch((error) => {
      console.error("Error al cargar los usuarios:", error);
      const noUsuarios = document.getElementById("no-usuarios");
      noUsuarios.textContent = "Error al cargar usuarios.";
      noUsuarios.style.display = "block";
    });
}

function eliminarUsuario(idUsuario) {
  fetch(`http://localhost:8080/usuarios/${idUsuario}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Usuario eliminado con éxito");
        cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
      } else {
        return response.text().then((text) => {
          alert(`Error al eliminar el usuario: ${text}`);
        });
      }
    })
    .catch((error) => console.error("Error al eliminar el usuario:", error));
}
