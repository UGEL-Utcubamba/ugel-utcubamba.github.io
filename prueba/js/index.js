// import repositorio from "./repositorio.js";

const repositorioContainer = document.getElementById("repositorioContanier");
const detalleContainer = document.getElementById("detalleContainer");
let indiceSeleccionado;

const autorElement = document.getElementById("autor");
const contenidoElement = document.getElementById("contenido");
const enlaceElement = document.getElementById("enlace");
const comentarioElement = document.getElementById("comentario");
//const marcarTerminadoElement = document.getElementById("finalizar");


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
  repositorioContainer.appendChild(nuevaTarjeta);
}

function actualizarTarjetas(){
  repositorioContainer.innerHTML = "";
  repositorios.forEach((repositorio,i) => {
    createTarjeta(repositorio,i);
  })
}

function actualizarDetalle(index){
  if(indiceSeleccionado !== undefined) repositorioContainer.children[indiceSeleccionado].classList.toggle("seleccionado",false);
  autorElement.innerText = repositorios[index].cliente;
  contenidoElement.innerText = repositorios[index].modelo;
  enlaceElement.innerText = repositorios[index].problema;
  detalleContainer.classList.toggle("escondido",false);
  indiceSeleccionado = index;
  repositorioContainer.children[indiceSeleccionado].classList.toggle("seleccionado",true);
}

finalizar.addEventListener("click",()=> marcarTerminado(indiceSeleccionado))

async function marcarTerminado(i){
  const updateRepositorio = repositorios[i];
  updateRepositorio.comentario = comentarioElement.value;
  const res = await editRepositorio(updateRepositorio.id,updateRepositorio);
  if(res.status === 200){
    repositorios = repositorios.filter(repositorio => repositorio.id !== updateRepositorio.id);
    indiceSeleccionado = 0;
    await actualizarTarjetas()
    detalleContainer.classList.toggle("escondido",true);
    comentarioElement.value="";
  }
}

