function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

async function initClient() {
  await gapi.client.init({
      apiKey: 'AIzaSyBVC8PpgVrq85xt9UnbHParUi-O4pUBd8I',
      clientId: '196951549765-2nkohp29igtk5njjfn1bc3unk9iesgfq.apps.googleusercontent.com',
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      scope: 'https://www.googleapis.com/auth/spreadsheets'
  });
  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
      console.log('El usuario está firmado y listo para acceder a la API.');
      document.getElementById('signin-button').style.display = 'none';
      document.getElementById('signout-button').style.display = 'block';
  } else {
      console.log('El usuario no está firmado.');
      document.getElementById('signin-button').style.display = 'block';
      document.getElementById('signout-button').style.display = 'none';
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// Reemplaza 'TU_API_KEY' y 'TU_CLIENT_ID' con tus propias credenciales.
