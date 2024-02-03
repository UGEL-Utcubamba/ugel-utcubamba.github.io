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
  } else {
      console.log('El usuario no está firmado.');
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
