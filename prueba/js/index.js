// import turnos from "./turnos.js";

const repositoriosContainer = document.getElementById("repositoriosContainer");
const detalleContainer = document.getElementById("detalleContainer");
let indiceSeleccionado;

const clienteElement = document.getElementById("cliente");
const modeloElement = document.getElementById("modelo");
const problemaElement = document.getElementById("problema");
const comentarioElement = document.getElementById("comentario");
const marcarTerminadoElement = document.getElementById("finalizar");


function createTarjeta(repositorio,index){
  const nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList = "tarjeta";
  nuevaTarjeta.innerHTML = `
    <h3>${repositorio.autor}</h3>
    <p>${repositorio.contenido}</p>
    <p>${repositorio.enlace}</p>
    <p>${repositorio.comentario}</p>
  `
  nuevaTarjeta.addEventListener("click", ()=> actualizarDetalle(index))
  repositoriosContainer.appendChild(nuevaTarjeta);
}

function actualizarTarjetas(){
  repositoriosContainer.innerHTML = "";
  repositorios.forEach((repositorio,i) => {
    createTarjeta(repositorio,i);
  })
}

function actualizarDetalle(index){
  if(indiceSeleccionado !== undefined) repositoriosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",false);
  clienteElement.innerText = repositorios[index].cliente;
  modeloElement.innerText = repositorios[index].modelo;
  problemaElement.innerText = repositorios[index].problema;
  detalleContainer.classList.toggle("escondido",false);
  indiceSeleccionado = index;
  repositoriosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",true);
}

finalizar.addEventListener("click",()=> marcarTerminado(indiceSeleccionado))

async function marcarTerminado(i){
  const updateRepositorio = repositorios[i];
  updateRepositorio.comentario = comentarioElement.value;
  const res = await editRepositorio(updateRepositorio.id,updateRepositorio);
  if(res.status === 200){
    repositorios = repositorios.filter(respositorio => respositorio.id !== updateRepositorio.id);
    indiceSeleccionado = 0;
    await actualizarTarjetas()
    detalleContainer.classList.toggle("escondido",true);
    comentarioElement.value="";
  }
}