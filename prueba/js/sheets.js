const hoja = "Repositorios";
let repositorios;

async function getRepositorios() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!A:G",
    });
  } catch (err) {
    document.getElementById("content").innerText = err.message;
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    document.getElementById("content").innerText = "No values found.";
    return;
  }

  repositorios = [];
  range.values.forEach((fila) => {
    //if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoRepositorio = {
      id: fila[0],
      autor: fila[1],
      contenido: fila[2],
      enlace: fila[3],
      comentario: fila[4],
      fecha_terminado: fila[5],

    };
    repositorios.push(nuevoRepositorio);
  });
}

async function editRepositorio(id, contenido) {
  const update = [
    contenido.id,
    contenido.autor,
    contenido.contenido,
    contenido.enlace,
    contenido.comentario,
    new Date().toISOString()
    
  ]
  const filaAEditar = parseInt(id)+1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET,
    range: `${hoja}!A${filaAEditar}:G${filaAEditar}`,
    values: [update],
    valueInputOption:"USER_ENTERED"
  });
  return response;
}