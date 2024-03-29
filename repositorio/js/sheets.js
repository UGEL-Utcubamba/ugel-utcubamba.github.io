const hoja = "Repositorios";
let repositorios;

async function getRepositorios() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!A:G", // Asegúrate de ajustar el rango según tus necesidades
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
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoRepositorio = {
      id: fila[0],
      autor: fila[1],
      contenido: fila[2],
      enlace_descarga: fila[3],
      especialidad: fila[4],
      fecha: fila[5],
      comentario: fila[6]
    };
    repositorios.push(nuevoRepositorio);
  });
}

async function editRepositorio(id, contenido) {
  const update = [
    contenido.id,
    contenido.autor,
    contenido.contenido,
    contenido.enlace_descarga,
    contenido.especialidad,
    new Date().toISOString(),
    contenido.comentario,
  ];
  const filaAEditar = parseInt(id) + 1;
  response = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET,
    range: `${hoja}!A${filaAEditar}:G${filaAEditar}`, // Asegúrate de ajustar el rango según tus necesidades
    values: [update],
    valueInputOption: "USER_ENTERED"
  });
  return response;
}
