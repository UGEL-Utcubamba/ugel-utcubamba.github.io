const hoja = "Repositorio";
let repositorio;

async function getrepositorio() {
  let response;
  try {
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET,
      range: hoja + "!A:F",
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

  repositorio = [];
  range.values.forEach((fila) => {
    if (isNaN(parseInt(fila[0])) || fila[5] !== undefined) return;
    const nuevoTurno = {
      id: fila[0],
      autor: fila[1],
      enlace: fila[2],
      comentario: fila[3],
      fecha:  fila[4]
 
    };
    repositorio.push(nuevoTurno);
  });
}

async function editTurno(id, contenido) {
  const update = [
    contenido.id,
    contenido.autor,
    contenido.enlace,
    contenido.comentario,
    new Date().toISOString(),
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
