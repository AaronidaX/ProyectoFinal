window.onload = inicializar;
var refAnimes;
var refRSS;
var storageRef;
var imagenesRef;
var imagen;
const AGREGAR = "1";
const EDITAR = "2";
var modo = AGREGAR;
var refAnimesAEditar;
var comp;
var url;
var Nombre_de_la_Imagen;


function inicializar() {
  inicializarFirebase();
  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", enviarAnime);
  imagen = document.getElementById("imagen");
  imagen.addEventListener("change", subirImagen);
  storageRef = firebase.storage().ref();
  imagenesRef = firebase.database().ref().child("Imagenes");
  refAnimes = firebase.database().ref().child("Animes");
  refRSS = firebase.database().ref().child("rssanimes");
  formulario.style.display = "none";

  checkLogInStatus();
  mostrarAnimes();
}

function checkLogInStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);

      var usuarioID = firebase.auth().currentUser.uid;

      console.log(usuarioID);
      if (usuarioID == 'HfPRY3KNfEbYVnURHXlAiKq2cXf1') {
      } else {

      }

    } else {
      // No user is signed in.
      accesoRestringido();
    }
  });
}

function accesoRestringido() {
  window.location="autentificaciones.html";
}

function subirImagen(snapshot) {
  var imagenParaSubir = imagen.files[0];

  var uploadTask = storageRef.child('imagenes/' + imagenParaSubir.name).put(imagenParaSubir);

  document.getElementById("progreso").className = "";
  //Se va mostrando el progreso de subida
  uploadTask.on('state_changed',
    function(snapshot){
      //Si se produce un error
      var barraProgreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("barra-de-progreso").style.width = barraProgreso + "%";
    }, function(error) {
      document.getElementById("imagenACambiar").src = "img/cross.png";
    }, function() {
      //Si se sube con exito
      document.getElementById("imagenACambiar").src = "img/tick.png";
      var downloadURL = uploadTask.snapshot.downloadURL;
      url = downloadURL;
      document.getElementById("progreso").className = "hidden";
    });
}

function borrarAnime(event) {
  var clave = this.getAttribute("data-identificador");
  var refAnimes = firebase.database().ref().child("Animes").child(clave);
  var refRSS = firebase.database().ref().child("rssanimes").child(clave);
  refAnimes.on("value", ObtenerNombreImagen);
  //refRSS.on("value", borrarRSS);
  var imagenRef = storageRef.child("imagenes/" + Nombre_de_la_Imagen);
  imagenRef.delete().then(function() {
  }).catch(function(error) {
  });
  refAnimes.remove();
  refRSS.remove();
}

//function borrarRSS() {
  //refRSS.remove();
//}

function ObtenerNombreImagen(snapshot) {
  var datos = snapshot.val();
  console.log(datos);
  Nombre_de_la_Imagen = datos.nombreImagen;
}

function editarAnime(event) {
  var clave = this.getAttribute("data-identificador");
  refAnimesAEditar = firebase.database().ref().child("Animes").child(clave);
  refRSSAEditar = firebase.database().ref().child("rssanimes").child(clave);
  refAnimesAEditar.once("value", function(snapshot){
    var datos = snapshot.val();
    var formulario = document.getElementById("formulario");
    formulario.anime.value = datos.Anime;
    formulario.autor.value = datos.Autor;
    formulario.description.value = datos.Descripcion;
    formulario.email.value = datos.Email;
    formulario.fecha.value = datos.Fecha;
    formulario.genero.value = datos.Genero;
    formulario.radio.value = datos.Recomendado;
    modo = EDITAR;
    var btnEnviar = document.getElementById("enviar");
    btnEnviar.innerHTML = "Editar";
  });
  refRSSAEditar.once("value", function(snapshot){
    var datos = snapshot.val();
    var formulario = document.getElementById("formulario");
    description: formulario.description.value;
    titulo: formulario.anime.value;
    url: url;
    modo = EDITAR;
    var btnEnviar = document.getElementById("enviar");
    btnEnviar.innerHTML = "Editar";
  });
}

function enviarAnime(event) {
  console.log(url);
  var comp = 0;
  var formulario = event.target;
  if(formulario.imagen.value == "") {
    event.preventDefault();
    document.getElementById("error-image").style.display = "block";
  } else if(formulario.imagen.value != "") {
    comp++;
    document.getElementById("error-image").style.display = "none";
  }
    if(formulario.anime.value == "") {
    event.preventDefault();
    document.getElementById("error-anime").style.display = "block";
  } else if(formulario.anime.value != "") {
    comp++;
    document.getElementById("error-anime").style.display = "none";
  } if(formulario.autor.value == "") {
    event.preventDefault();
    document.getElementById("error-autor").style.display = "block";
  } else if(formulario.autor.value != "") {
    comp++;
    document.getElementById("error-autor").style.display = "none";
  } if(formulario.description.value == "") {
    event.preventDefault();
    document.getElementById("error-des").style.display = "block";
  } else if(formulario.description.value != "") {
    comp++;
    document.getElementById("error-des").style.display = "none";
  } if(formulario.email.value == "") {
    event.preventDefault();
    document.getElementById("error-email").style.display = "block";
  } else if(formulario.email.value != "") {
    comp++;
    document.getElementById("error-email").style.display = "none";
  } if(formulario.fecha.value <=1863 || formulario.fecha.value >2020) {
    event.preventDefault();
    document.getElementById("error-fecha").style.display = "block";
  } else if(formulario.fecha.value != "") {
    comp++;
    document.getElementById("error-fecha").style.display = "none";
  } if(formulario.genero.value == "") {
    event.preventDefault();
    document.getElementById("error-genero").style.display = "block";
  } else if(formulario.genero.value != "") {
    comp++;
    document.getElementById("error-genero").style.display = "none";
  } if (formulario.recomendado.checked == false && formulario.norecomendado.checked == false) {
    event.preventDefault();
    document.getElementById("error-rec").style.display = "block";
  } else if (formulario.recomendado.checked == true | formulario.norecomendado.checked == true) {
    comp++;
    document.getElementById("error-rec").style.display = "none";
  }
  if (comp == 8) {

    var nombreImagen = document.getElementById("imagen").value;
    nombreImagen = nombreImagen.replace(/^.*[\\\/]/, '');

    if(modo == AGREGAR){

      refAnimes.push(
        {
          nombreImagen: nombreImagen,
          Portada: url,
          Anime: formulario.anime.value,
          Autor: formulario.autor.value,
          Descripcion: formulario.description.value,
          Email: formulario.email.value,
          Fecha: formulario.fecha.value,
          Genero: formulario.genero.value,
          Recomendado: formulario.radio.value
        }
      )
      refRSS.push({
        descripcion: formulario.description.value,
        titulo: formulario.anime.value,
        url: url
      });
    } else {
      refAnimesAEditar.update({
        nombreImagen: nombreImagen,
        Portada: url,
        Anime: formulario.anime.value,
        Autor: formulario.autor.value,
        Descripcion: formulario.description.value,
        Email: formulario.email.value,
        Fecha: formulario.fecha.value,
        Genero: formulario.genero.value,
        Recomendado: formulario.radio.value
      })
      refRSSAEditar.update({
        descripcion: formulario.description.value,
        titulo: formulario.anime.value,
        url: url
      });
      modo = AGREGAR;
    }
  }
}

function mostrarAnimes() {
  refAnimes = firebase.database().ref().child("Animes");
  refAnimes.on("value", mostrarDatos);
}

function mostrarDatos(snapshot) {
  var datos = snapshot.val();
  var tableBody = document.getElementById("tabla");
  var todosLosAnimes = "";
  for (var key in datos){
    todosLosAnimes += "</tr><td>" + '<img width="200" class="esquinas" src="' + datos[key].Portada  + '"/>' + "</td><td>" + datos[key].Anime + "</td><td>" + datos[key].Autor + "</td><td>" + datos[key].Descripcion +
    "</td><td>" + datos[key].Email + "</td><td>" + datos[key].Fecha + "</td><td>" + datos[key].Genero + "</td><td>" + datos[key].Recomendado + "</td></tr>";
  }
  document.getElementById("tabla").innerHTML = todosLosAnimes;
  var imagenes = document.getElementsByClassName("borrar");
  for(var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", borrarAnime);
  }
  var imagenes = document.getElementsByClassName("editar");
  for(var i = 0; i < imagenes.length; i++) {
    imagenes[i].addEventListener("click", editarAnime);
  }
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
