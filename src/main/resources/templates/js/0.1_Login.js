let baseUrl = "http://localhost:8080";

function cerrarMensajeError() {
  document.getElementById("mensajeErrorBarra").style.display = "none";
}

function mostrarMensajeError(mensaje) {
  const mensajeErrorBarra = document.getElementById("mensajeErrorBarra");
  const mensajeError = document.getElementById("mensajeError");

  mensajeError.innerHTML = mensaje;
  mensajeErrorBarra.style.display = "block";
}

function iniciarSesion() {
  var usuario = {
    correo: document.getElementById("correo").value,
    contrasena: document.getElementById("contrasena").value,
  };

  console.log("Datos del usuario:", usuario);

  // Limpiar mensajes de error anteriores
  document.getElementById("mensajeError").innerHTML = "";

  fetch(baseUrl + "/iniciar-sesion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401) {
        // Credenciales incorrectas
        throw new Error("Ingresa correctamente el correo y la contraseña.");
      } else {
        // Otro tipo de error
        throw new Error("Error de inicio de sesión. Inténtalo de nuevo.");
      }
    })
    .then((data) => {
      console.log("Datos recibidos del servidor:", data);

      if (data) {
        // Verificación de campos específicos en el objeto recibido
        var codRol = data.codRol;
        // Guardando en sessionStorage
        sessionStorage.setItem("idUsuario", data.idUsuario);
        sessionStorage.setItem("codRol", data.codRol);
        sessionStorage.setItem("leccionMasAlta", data.leccionMasAlta);
        sessionStorage.setItem("nombreLeccion", data.nombreLeccion);
        sessionStorage.setItem("puntos", data.puntos);
        sessionStorage.setItem("Usuario", data.usuario);

        // Verificación de almacenamiento
        console.log("idUsuario: ", sessionStorage.getItem("idUsuario"));
        console.log("codRol: ", sessionStorage.getItem("codRol"));
        console.log("leccionMasAlta: ", sessionStorage.getItem("leccionMasAlta"));
        console.log("nombreLeccion: ", sessionStorage.getItem("nombreLeccion"));
        console.log("puntos: ", sessionStorage.getItem("puntos"));
        console.log("Usuario: ", sessionStorage.getItem("Usuario"));

        // Redirección según el rol
        if (codRol == 1) {
          // USUARIO
          window.location.href = "/src/main/resources/templates/0.0_InicioEdublocks.html";
        } else if (codRol == 2) {
          // ADMIN
          window.location.href = "/src/main/resources/templates/0.0_InicioEdublocks.html";
        } else {
          console.log("Error al iniciar sesión");
        }
      }
    })
    .catch((error) => {
      console.error(error.message);
      mostrarMensajeError("Correo o contraseñas incorrectos. Intentalo de nuevo");
    });
}
