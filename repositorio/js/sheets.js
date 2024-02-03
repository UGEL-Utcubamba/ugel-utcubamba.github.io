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
    document.getElementById("content").innerText = "No hay repositorios disponibles.";
    return;
  }
  repositorios = range.values;
}

async function addRepositorio(repositorioData) {
  const {id, autor, contenido, enlaceDescarga, especialidad, fecha, comentario} = repositorioData;
  const values = [[id, autor, contenido, enlaceDescarga, especialidad, fecha, comentario]];
  try {
    const response = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET,
      range: hoja,
      valueInputOption: 'RAW',
      resource: {values}
    });
    if (response.result.updates.updatedRows === 1) {
      console.log('Repositorio añadido con éxito.');
    }
  } catch (err) {
    console.error('Error al añadir repositorio:', err);
  }
}

async function updateRepositorio(rowIndex, repositorioData) {
  const {id, autor, contenido, enlaceDescarga, especialidad, fecha, comentario} = repositorioData;
  const values = [[id, autor, contenido, enlaceDescarga, especialidad, fecha, comentario]];
  try {
    const response = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET,
      range: `${hoja}!A${rowIndex}:G${rowIndex}`,
      valueInputOption: 'RAW',
      resource: {values}
    });
    if (response.result.updatedRows === 1) {
      console.log('Repositorio actualizado con éxito.');
    }
  } catch (err) {
    console.error('Error al actualizar repositorio:', err);
  }
}

async function deleteRepositorio(rowIndex) {
  try {
    const response = await gapi.client.sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET,
      range: `${hoja}!A${rowIndex}:G${rowIndex}`,
    });
    console.log('Repositorio eliminado con éxito.');
  } catch (err) {
    console.error('Error al eliminar repositorio:', err);
  }
}
