document.addEventListener("DOMContentLoaded", function () {
  mostrarDatosUsuario();
  cargarUsuarios();
});

function mostrarDatosUsuario() {
  var nombreUser = sessionStorage.getItem("Usuario");
  var cantMonedas = sessionStorage.getItem("puntos");
  var codRol = sessionStorage.getItem("codRol");

  var nombreUs = document.getElementById("NombreUser");
  var cantMonedasElem = document.getElementById("cantMonedas");
  const btnAdmin = document.getElementById("btnAdmin");

  if (nombreUs && nombreUser) {
    nombreUs.textContent = nombreUser;
  } else {
    console.log("No se ha almacenado el nombre del usuario");
  }

  if (cantMonedasElem && cantMonedas) {
    cantMonedasElem.textContent = cantMonedas;
  }

  if (btnAdmin) {
    if (codRol == 1) {
      console.log("El usuario es un usuario regular");
      btnAdmin.style.display = "none";
    } else if (codRol == 2) {
      console.log("El usuario es administrador");
      btnAdmin.style.display = "block";
    }
  }
}

function cargarUsuarios() {
  fetch("http://localhost:8080/usuarios/all")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      return response.json();
    })
    .then((usuarios) => {
      const container = document.getElementById("usuarios-container");
      const noUsuarios = document.getElementById("no-usuarios");

      if (!container || !noUsuarios) {
        console.error("Elementos del DOM no encontrados");
        return;
      }

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
            <p class="nombre">${usuario.usuario || "Nombre no disponible"}</p>
            <p class="leccion">Lección actual: ${
              usuario.nombreLeccion || "Lección no disponible"
            }</p>
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
      if (noUsuarios) {
        noUsuarios.textContent = "Error al cargar usuarios.";
        noUsuarios.style.display = "block";
      }
    });
}

function eliminarUsuario(idUsuario) {
  fetch(`http://localhost:8080/usuarios/${idUsuario}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert("Usuario eliminado con éxito");
        // Recargar la página para actualizar la lista de usuarios
        window.location.reload();
      } else {
        return response.text().then((text) => {
          alert(`Error al eliminar el usuario: ${text}`);
        });
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el usuario:", error);
    });
}
