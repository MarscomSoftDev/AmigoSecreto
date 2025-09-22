// Array para almacenar los amigos
let listaAmigos = [];

function almacenarTextoVariable() {
  const input = document.getElementById("inputAmigo");
  const nombre = input.value.trim();

  if (nombre) {
    // Verificar si el nombre ya existe
    if (listaAmigos.includes(nombre)) {
      alert("Este amigo ya está en la lista");
      return;
    }

    listaAmigos.push(nombre);
    input.value = ""; // Limpiar el input
    actualizarListaVisual();
  } else {
    alert("Por favor, escribe un nombre");
  }
}

function actualizarListaVisual() {
  const listaUl = document.getElementById("listaAmigos");
  const contador = document.getElementById("contadorAmigos");

  // Limpiar lista actual
  listaUl.innerHTML = "";

  // Actualizar contador
  contador.textContent = listaAmigos.length;

  // Agregar cada amigo a la lista visual
  listaAmigos.forEach((amigo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <span>${amigo}</span>
            <button class="boton-eliminar" onclick="eliminarAmigo(${index})">×</button>
        `;

    listaUl.appendChild(li);
  });

  // Ocultar contenedor si no hay amigos
  const container = document.getElementById("listaAmigosContainer");
  if (listaAmigos.length === 0) {
    container.style.display = "none";
  } else {
    container.style.display = "block";
  }
}

function eliminarAmigo(index) {
  // Eliminar amigo del array
  const amigoEliminado = listaAmigos.splice(index, 1)[0];

  // Actualizar lista visual
  actualizarListaVisual();

  console.log(`Amigo eliminado: ${amigoEliminado}`);
}

function sortearAmigos() {
  const resultadoDiv = document.getElementById("resultadoSorteo");

  if (listaAmigos.length === 0) {
    resultadoDiv.innerHTML =
      "❌ No hay amigos en la lista. Añade al menos uno.";
    resultadoDiv.style.background = "#ff6b6b";
    resultadoDiv.classList.add("mostrar");
    return;
  }

  if (listaAmigos.length === 1) {
    resultadoDiv.innerHTML = `🎯 Solo hay un amigo: <strong>${listaAmigos[0]}</strong>`;
    resultadoDiv.style.background = "#ffa726";
    resultadoDiv.classList.add("mostrar");
    return;
  }

  // Animación de sorteo
  let contador = 0;
  const intervalo = setInterval(() => {
    const indiceTemp = Math.floor(Math.random() * listaAmigos.length);
    resultadoDiv.innerHTML = `🔍 Sorteando: <strong>${listaAmigos[indiceTemp]}</strong>`;
    resultadoDiv.style.background = "#667eea";
    resultadoDiv.classList.add("mostrar");

    contador++;
    if (contador > 10) {
      // Después de 10 iteraciones, mostrar resultado final
      clearInterval(intervalo);

      const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
      const amigoSorteado = listaAmigos[indiceAleatorio];

      setTimeout(() => {
        resultadoDiv.innerHTML = `🎉 ¡El amigo secreto es: <strong>${amigoSorteado}</strong>! 🎉`;
        resultadoDiv.style.background =
          "linear-gradient(135deg, #4CAF50, #45a049)";
      }, 500);
    }
  }, 100);
}

// Inicializar la lista al cargar la página
document.addEventListener("DOMContentLoaded", function () {
  actualizarListaVisual();
});
