document.addEventListener('DOMContentLoaded', function() {
  handleClientLoad();
});

async function loadRepositorios() {
  const repositorios = await getRepositorios();
  displayRepositorios(repositorios);
}

function displayRepositorios(repositorios) {
  const repositoriosContainer = document.getElementById('repositorios-container');
  repositoriosContainer.innerHTML = '';
  repositorios.forEach((repo) => {
      const repoElement = document.createElement('div');
      repoElement.innerHTML = `
          <div>ID: ${repo[0]}</div>
          <div>Autor: ${repo[1]}</div>
          <div>Contenido: ${repo[2]}</div>
          <div>Enlace de Descarga: ${repo[3]}</div>
          <div>Especialidad: ${repo[4]}</div>
          <div>Fecha: ${repo[5]}</div>
          <div>Comentario: ${repo[6]}</div>
      `;
      repositoriosContainer.appendChild(repoElement);
  });
}
