window.onload = inicializar;

function inicializar(){
	inicializarFirebase();
  var categoriasRss = document.getElementsByClassName("rss");
  for (var i = 0; i < categoriasRss.length; i++){
    categoriasRss[i].addEventListener("click", mostrarFicheroRSS)
  }
}

function mostrarFicheroRSS(){
  crearRSS();
}

function crearRSS(){

  var refanimes = firebase.database().ref().child("rssanimes");
  refanimes.once("value", mostrarAnimes);
}


function mostrarAnimes(snapshot) {
  var datos = snapshot.val();
	var documentoRSS;
  documentoRSS = '<?xml version="1.0" encoding="UTF-8"?>';
  documentoRSS += '<rss version="2.0">';
  documentoRSS += '<channel>';
  documentoRSS += '<title>rssanimes</title>';
  documentoRSS += '<link>index.html</link>';
  documentoRSS += '<description>Encuentra tus animes favoritos</description>';
  for (var key in datos){
    documentoRSS += '<item>';
    documentoRSS += '<title>' + datos[key].titulo + '</title>';
    documentoRSS += '<description>' + datos[key].descripcion + '</description>';
    documentoRSS += '<link>' + datos[key].url + '</link>';
    documentoRSS += '</item>';
  }
  documentoRSS += '</channel>';
  documentoRSS += '</rss>';

  window.open('data:text/xml,' + encodeURIComponent(documentoRSS),
  "Test", "width=300,height=300,scrollbars=1,resizable=1");
}

function inicializarFirebase() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCnHhFYPTlmWPjm8WQYr_z0ZIRCQ8LeO_c",
    authDomain: "animes-8ad09.firebaseapp.com",
    databaseURL: "https://animes-8ad09.firebaseio.com",
    projectId: "animes-8ad09",
    storageBucket: "animes-8ad09.appspot.com",
    messagingSenderId: "203817166204"
  };
  firebase.initializeApp(config);
}
