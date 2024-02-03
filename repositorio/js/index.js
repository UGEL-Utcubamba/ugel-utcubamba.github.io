// import turnos from "./turnos.js";

let repositorios; // Asegúrate de que 'repositorios' se obtiene o define correctamente en alguna parte

const repositoriosContainer = document.getElementById("repositoriosContainer");
const detalleContainer = document.getElementById("detalleContainer");
let indiceSeleccionado;

const autorElement = document.getElementById("autor");
const contenidoElement = document.getElementById("contenido");
const enlaceDescargaElement = document.getElementById("enlaceDescarga");
const especialidadElement = document.getElementById("especialidad");
const fechaElement = document.getElementById("fecha");
const comentarioElement = document.getElementById("comentario");
const marcarTerminadoElement = document.getElementById("finalizar");

function createTarjeta(repositorio, index) {
  const nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList = "tarjeta";
  nuevaTarjeta.innerHTML = `
    <h3>${repositorio.autor}</h3>
    <p>Enlace de Descarga: <a href="${repositorio.enlace_descarga}" target="_blank">Descargar</a></p>
    <p>Especialidad: ${repositorio.especialidad}</p>
    <p>Fecha: ${repositorio.fecha}</p>
  `;
  nuevaTarjeta.addEventListener("click", () => actualizarDetalle(index));
  repositoriosContainer.appendChild(nuevaTarjeta);
}

function actualizarTarjetas() {
  repositoriosContainer.innerHTML = "";
  repositorios.forEach((repositorio, i) => {
    createTarjeta(repositorio, i);
  });
}

function actualizarDetalle(index) {
  if (indiceSeleccionado !== undefined)
    repositoriosContainer.children[indiceSeleccionado].classList.toggle("seleccionado", false);
  autorElement.innerText = repositorios[index].autor;
  contenidoElement.innerText = repositorios[index].contenido;
  enlaceDescargaElement.innerHTML = `<a href="${repositorios[index].enlace_descarga}" target="_blank">Descargar</a>`;
  especialidadElement.innerText = repositorios[index].especialidad;
  fechaElement.innerText = repositorios[index].fecha;
  detalleContainer.classList.toggle("escondido", false);
  indiceSeleccionado = index;
  repositoriosContainer.children[indiceSeleccionado].classList.toggle("seleccionado", true);
  detalleContainer.classList.add("visible");
}

marcarTerminadoElement.addEventListener("click", async () => {
  detalleContainer.classList.remove("visible");
  await marcarTerminado(indiceSeleccionado);
});

async function marcarTerminado(i) {
  const updateRepositorio = repositorios[i];
  updateRepositorio.comentario = comentarioElement.value;
  // Asume que editRepositorio es una función que edita el repositorio y devuelve una promesa
  const res = await editRepositorio(updateRepositorio.id, updateRepositorio);
  if (res.status === 200) {
    repositorios = repositorios.filter(repositorio => repositorio.id !== updateRepositorio.id);
    indiceSeleccionado = undefined;
    await actualizarTarjetas();
    detalleContainer.classList.toggle("escondido", true);
    comentarioElement.value = "";
  }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Asume que cargarRepositorios es una función que obtiene los repositorios y los almacena en la variable 'repositorios'
    await cargarRepositorios(); // Define esta función según corresponda
    actualizarTarjetas();
});
