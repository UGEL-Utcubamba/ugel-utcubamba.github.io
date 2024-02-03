// import turnos from "./turnos.js";

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
    <p>${repositorio.enlace_descarga}</p>
    <p>${repositorio.especialidad}</p>
    <p>${repositorio.fecha}</p>
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
  enlaceDescargaElement.innerText = repositorios[index].enlace_descarga;
  especialidadElement.innerText = repositorios[index].especialidad;
  fechaElement.innerText = repositorios[index].fecha;
  detalleContainer.classList.toggle("escondido", false);
  indiceSeleccionado = index;
  repositoriosContainer.children[indiceSeleccionado].classList.toggle("seleccionado", true);
}

finalizar.addEventListener("click", () => marcarTerminado(indiceSeleccionado));

async function marcarTerminado(i) {
  const updateRepositorio = repositorios[i];
  updateRepositorio.comentario = comentarioElement.value;
  const res = await editRepositorio(updateRepositorio.id, updateRepositorio);
  if (res.status === 200) {
    repositorios = repositorios.filter(repositorio => repositorio.id !== updateRepositorio.id);
    indiceSeleccionado = 0;
    await actualizarTarjetas();
    detalleContainer.classList.toggle("escondido", true);
    comentarioElement.value = "";
  }
}
