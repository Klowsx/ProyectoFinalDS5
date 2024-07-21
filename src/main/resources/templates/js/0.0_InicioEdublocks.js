document.addEventListener("DOMContentLoaded", function () {
  const nombreUser = sessionStorage.getItem("Usuario");
  const cantMonedas = sessionStorage.getItem("Puntos");
  const codRol = sessionStorage.getItem("codRol");

  console.log(nombreUser);
  // Mapea los datos en el nav
  if (nombreUser && cantMonedas) {
    document.getElementById("NombreUser").textContent = nombreUser;
    document.getElementById("cantMonedas").textContent = cantMonedas;
  }

  // Oculta el botón de administrador si el codRol es 1
  if (codRol === "1") {
    const adminButton = document.querySelector(".btnNavAdmin");
    if (adminButton) {
      adminButton.style.display = "none";
    }
  }
});
