document.addEventListener('DOMContentLoaded', function() {
  initClient();
});

async function initClient() {
  try {
      await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
      });
      await gapi.client.load('sheets', 'v4');
      loadRepositorios();
  } catch (error) {
      console.error("Error loading GAPI client for API", error);
  }
}

async function loadRepositorios() {
  try {
      const repositorios = await getRepositorios();
      displayRepositorios(repositorios);
  } catch (error) {
      console.error("Error loading repositorios", error);
  }
}

function displayRepositorios(repositorios) {
  const repositoriosContainer = document.getElementById('repositorios-container');
  repositoriosContainer.innerHTML = '';
  repositorios.forEach((repo, index) => {
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
