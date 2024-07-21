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

// Selecciona todos los botones de respuesta
const options = document.querySelectorAll(".option");

// Añade un evento de clic a cada botón de respuesta
options.forEach((option) => {
  option.addEventListener("click", function () {
    // Desmarca todas las opciones de la misma pregunta
    const question = this.closest(".question");
    question.querySelectorAll(".option").forEach((btn) => {
      btn.classList.remove("selected");
    });

    // Marca la opción seleccionada
    this.classList.add("selected");
  });
});

// Función para verificar las respuestas
function checkAnswers() {
  let score = 0;
  let allCorrect = true;

  // Itera sobre cada pregunta
  document.querySelectorAll(".question").forEach((question) => {
    const selectedOption = question.querySelector(".option.selected");

    if (selectedOption) {
      const isCorrect = selectedOption.getAttribute("data-correct") === "true";
      if (isCorrect) {
        selectedOption.classList.add("correct");
        score++;
      } else {
        selectedOption.classList.add("incorrect");
        allCorrect = false; // Si hay alguna respuesta incorrecta, no todas son correctas
      }
    }

    // Elimina la selección si la respuesta es incorrecta
    question.querySelectorAll(".option").forEach((btn) => {
      if (btn.getAttribute("data-correct") === "false" && btn.classList.contains("selected")) {
        btn.classList.remove("selected");
      }
    });
  });

  // Muestra el resultado en un mensaje
  alert(`Has acertado ${score} de ${document.querySelectorAll(".question").length} preguntas.`);

  return allCorrect;
}

// Función para verificar y navegar a la siguiente página
function navigateToNextPage() {
  const allQuestionsAnswered = Array.from(document.querySelectorAll(".question")).every(
    (question) => question.querySelector(".option.selected") !== null
  );

  if (allQuestionsAnswered) {
    const allCorrect = checkAnswers(); // Verifica si todas las respuestas son correctas
    if (allCorrect) {
      // Redirige a la siguiente página si todas las respuestas son correctas
      window.location.href =
        "http://127.0.0.1:5500/src/main/resources/templates/2.1_PracticaTipoDato.html"; // Cambia 'nextPage.html' por la URL de tu siguiente página
    } else {
      alert("Hay respuestas incorrectas. Por favor, revisa tus respuestas antes de avanzar.");
    }
  } else {
    alert("Debes completar todas las preguntas para avanzar.");
  }
}
