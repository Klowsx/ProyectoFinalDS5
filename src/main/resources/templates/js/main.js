function añadirPuntos() {
  var idUsuario = sessionStorage.getItem("idUsuario");
  var nuevaLeccionMasAlta = sessionStorage.getItem("NuevaLeccionMasAlta"); // Obtén la nueva lección desde sessionStorage

  // Verifica si idUsuario y nuevaLeccionMasAlta están disponibles
  if (idUsuario && nuevaLeccionMasAlta) {
    // Obtén la lección más alta actual desde sessionStorage
    var leccionMasAltaActual = sessionStorage.getItem("leccionMasAlta");

    // Si la nueva lección es más alta, actualiza los puntos y la lección más alta
    if (parseInt(nuevaLeccionMasAlta) > parseInt(leccionMasAltaActual)) {
      // Actualiza los puntos
      var datosPuntos = {
        idUsuario: idUsuario,
        puntos: 100, // Puntos a agregar
      };

      fetch("http://localhost:8080/puntos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosPuntos),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Puntos actualizados correctamente.");
            // Actualiza la lección más alta en la base de datos
            var datosLeccion = {
              idUsuario: idUsuario,
              leccionMasAlta: parseInt(nuevaLeccionMasAlta),
            };

            return fetch("http://localhost:8080/leccionMasAlta", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(datosLeccion),
            });
          } else {
            throw new Error("Error al actualizar los puntos");
          }
        })
        .then((response) => {
          if (response.ok) {
            console.log("Lección más alta actualizada correctamente.");
            // Actualiza la lección más alta en sessionStorage
            sessionStorage.setItem("leccionMasAlta", nuevaLeccionMasAlta);
          } else {
            console.error("Error al actualizar la lección más alta:", response.statusText);
          }
        })
        .catch((error) => console.error("Error al hacer la solicitud:", error));
    } else {
      console.log("La nueva lección no es más alta que la actual. No se actualizan los puntos.");
    }
  } else {
    console.error("Datos faltantes: idUsuario o NuevaLeccionMasAlta");
  }
}
