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
      const infoId = this.getAttribute("data-info");
      displayInfo(infoId);
    });
  });

  mostrarDatosUsuario();
});

function displayInfo(infoId) {
  const infoDisplay = document.getElementById("infoDisplay");

  const documentationData = {
    info1: `<h2>Introducción a Java</h2>
            <p>El lenguaje Java fue desarrollado en sus inicios por James Gosling, en el año 1991. Inicialmente Java era conocido como Oak o Green. La primera versión del lenguaje Java es publicada por Sun Microsystems en 1995. Y es en la versión del lenguaje JDK 1.0.2, cuando pasa a llamarse Java, corría el año 1996. En las primeras versiones de Java 1.1, 1.2 y 1.3 es en la que el lenguaje va tomando forma, con la inclusión de tecnologías como JavaBeans, JDBC para el acceso a base de datos, RMI para las invocaciones en remoto, Collections para la gestión de múltiples estructuras de datos o AWT para el desarrollo gráfico, entre otros.
            </p>
            <h3>Recursos de Introducción a Java</h3>
            <ul>
              <li><a href="https://docs.oracle.com/javase/tutorial/getStarted/index.html" target="_blank">Oracle Java Tutorials - Getting Started</a></li>
              <li><a href="https://www.w3schools.com/java/default.asp" target="_blank">Java Programming Basics - W3Schools</a></li>
              <li><a href="https://www.javaguides.net/p/java-tutorial.html" target="_blank">Java Guide - Learn Java Programming</a></li>
              <li><a href="https://www.codecademy.com/learn/learn-java" target="_blank">Codecademy - Learn Java</a></li>
              <li><a href="https://www.geeksforgeeks.org/java/" target="_blank">GeeksforGeeks - Java Programming Language</a></li>
            </ul>
            <h3>Enlaces Adicionales</h3>
            <ul>
              <li><a href="https://www.java.com/en/about/" target="_blank">History of Java</a></li>
              <li><a href="https://www.oracle.com/java/technologies/java-features.html" target="_blank">Java Features</a></li>
            </ul>`,
    info2: `<h2>Instalación del JDK (Java Development Kit)</h2>
            <p>Para desarrollar en Java, debes instalar el JDK, que incluye el compilador de Java y la máquina virtual de Java (JVM). El JDK te proporciona todas las herramientas necesarias para compilar y ejecutar programas Java.</p>
            <h3>Recursos de Instalación</h3>
            <ul>
              <li><a href="https://www.oracle.com/java/technologies/javase-downloads.html" target="_blank">Download JDK</a></li>
              <li><a href="https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html" target="_blank">JDK Installation Guide</a></li>
            </ul>`,
    info3: `<h2>Configuración de Variables de Entorno</h2>
            <p>Para que el sistema reconozca el compilador de Java, debes configurar las variables de entorno. Esto incluye definir la variable <code>JAVA_HOME</code> que apunta al directorio del JDK y añadir el directorio del JDK al <code>PATH</code> del sistema.</p>
            <h3>Guías de Configuración</h3>
            <ul>
              <li><a href="https://docs.oracle.com/javase/8/docs/technotes/guides/install/windows/index.html" target="_blank">Set JAVA_HOME Environment Variable (Windows)</a></li>
              <li><a href="https://docs.oracle.com/javase/8/docs/technotes/guides/install/mac/mac-env.html" target="_blank">Setting JAVA_HOME and PATH on macOS</a></li>
              <li><a href="https://docs.oracle.com/javase/8/docs/technotes/guides/install/linux/linux-env.html" target="_blank">Setting JAVA_HOME and PATH on Linux</a></li>
            </ul>`,
    info4: `<h2>Variables y Tipos de Datos</h2>
            <p>En este módulo, los usuarios aprenderán sobre los diferentes tipos de datos en Java, cómo declarar y usar variables, y las operaciones básicas que se pueden realizar con estos datos. Se abordarán los siguientes temas:</p>
            <ul>
              <li>Declarar y utilizar variables en Java.</li>
              <li>Comprender los diferentes tipos de datos primitivos y no primitivos.</li>
              <li>Realizar operaciones aritméticas y de asignación.</li>
            </ul>
            <h3>Recursos de Variables y Tipos de Datos</h3>
            <ul>
              <li><a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html" target="_blank">Java Data Types - Oracle Documentation</a></li>
              <li><a href="https://www.w3schools.com/java/java_data_types.asp" target="_blank">Java Data Types - W3Schools</a></li>
              <li><a href="https://www.javatpoint.com/data-types-in-java" target="_blank">Data Types in Java - JavaTpoint</a></li>
            </ul>`,
    info5: `<h2>Estructuras de Control</h2>
            <p>Este módulo cubre las estructuras de control en Java, como bucles (for, while, do-while) y estructuras de decisión (if, switch). Aprenderás a:</p>
            <ul>
              <li>Utilizar estructuras de decisión para controlar el flujo del programa.</li>
              <li>Implementar bucles para realizar tareas repetitivas.</li>
              <li>Comprender y aplicar las estructuras de control en ejemplos prácticos.</li>
            </ul>
            <h3>Recursos de Estructuras de Control</h3>
            <ul>
              <li><a href="https://docs.oracle.com/javase/tutorial/essential/control/" target="_blank">Control Flow - Oracle Documentation</a></li>
              <li><a href="https://www.w3schools.com/java/java_conditions.asp" target="_blank">Java Control Flow - W3Schools</a></li>
              <li><a href="https://www.javatpoint.com/control-statements-in-java" target="_blank">Control Statements in Java - JavaTpoint</a></li>
            </ul>`,
    info6: `<h2>Métodos Simples</h2>
            <p>En este módulo, los usuarios aprenderán a definir y utilizar métodos en Java. Se explicará la importancia de los métodos para la modularización y reutilización del código. Se cubrirán los siguientes temas:</p>
            <ul>
              <li>Definir métodos simples en Java.</li>
              <li>Utilizar métodos para modularizar y organizar el código.</li>
              <li>Comprender la importancia de los métodos en el desarrollo de software.</li>
            </ul>
            <h3>Recursos de Métodos Simples</h3>
            <ul>
              <li><a href="https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html" target="_blank">Methods - Oracle Documentation</a></li>
              <li><a href="https://www.w3schools.com/java/java_methods.asp" target="_blank">Java Methods - W3Schools</a></li>
              <li><a href="https://www.javatpoint.com/methods-in-java" target="_blank">Methods in Java - JavaTpoint</a></li>
            </ul>`,
    info7: `<h2>Introducción a Visual Studio Code</h2>
            <p>Visual Studio Code es un editor de código fuente ligero pero potente que funciona en tu escritorio y está disponible para Windows, macOS y Linux. Ofrece soporte para múltiples lenguajes de programación y una amplia gama de extensiones.</p>
            <h3>Recursos Adicionales</h3>
            <ul>
              <li><a href="https://code.visualstudio.com/docs" target="_blank">Visual Studio Code Documentation</a></li>
              <li><a href="https://code.visualstudio.com/docs/languages/java" target="_blank">Java Development in Visual Studio Code</a></li>
            </ul>`,
    info8: `<h2>Configuración del Entorno para Java</h2>
            <p>Para desarrollar en Java usando Visual Studio Code, necesitas instalar extensiones que mejoren la funcionalidad del editor. La extensión "Java Extension Pack" es una de las más recomendadas y proporciona herramientas como el compilador, el depurador y el soporte para Maven y Gradle.</p>
            <h3>Recursos de Configuración</h3>
            <ul>
              <li><a href="https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack" target="_blank">Java Extension Pack - Visual Studio Code Marketplace</a></li>
              <li><a href="https://code.visualstudio.com/docs/java/java-tutorial" target="_blank">Getting Started with Java in Visual Studio Code</a></li>
            </ul>`,
    info9: `<h2>Primer Proyecto en Visual Studio Code</h2>
            <p>Para comenzar con tu primer proyecto Java en Visual Studio Code, primero crea un nuevo proyecto y configura el entorno de ejecución. Luego, escribe un programa simple y compílalo utilizando las herramientas integradas.</p>
            <h3>Recursos para Primer Proyecto</h3>
            <ul>
              <li><a href="https://code.visualstudio.com/docs/java/java-project" target="_blank">Creating Java Projects in Visual Studio Code</a></li>
              <li><a href="https://code.visualstudio.com/docs/java/java-getting-started" target="_blank">Java Getting Started - Visual Studio Code Documentation</a></li>
            </ul>`
  };
  
  
  

  if (documentationData[infoId]) {
    infoDisplay.innerHTML = documentationData[infoId];
  } else {
    infoDisplay.innerHTML = `<h2>Información no disponible</h2><p>No se encontró información para el ítem seleccionado.</p>`;
  }
}

function mostrarDatosUsuario() {
  var nombreUser = sessionStorage.getItem("Usuario");
  var cantMonedas = sessionStorage.getItem("puntos");
  var codRol = sessionStorage.getItem("codRol");

  var nombreUs = document.getElementById("NombreUser");
  var cantMonedasElem = document.getElementById("cantMonedas");

  if (nombreUser) {
    if (nombreUs) {
      nombreUs.textContent = nombreUser;
      cantMonedasElem.textContent = cantMonedas;
    }
  } else {
    console.log("No se ha almacenado el nombre del usuario");
  }

  var btnAdmin = document.getElementById("btnAdmin");
  if (codRol == 1) {
    console.log("El usuario es un usuario regular");
    btnAdmin.style.display = "none";
  } else if (codRol == 2) {
    console.log("El usuario es administrador");
    btnAdmin.style.display = "block";
  }
}

function navigateToNextPage() {
  const container = document.querySelector(".container");
  container.style.transition = "transform 0.5s ease-in-out";
  container.style.transform = "translateX(-100vw)";

  setTimeout(() => {
    window.location.href =
      "http://127.0.0.1:5500/src/main/resources/templates/2.2_SeleccionMultipleVariables.html";
  }, 500);
}

