window.onload = initialize;

function initialize() {
  initializeFirebase();
  var formLogin = document.getElementById("form-login");
  formLogin.addEventListener("submit", doLogin);
  var logOutButton = document.getElementById("logout");
  logOutButton.addEventListener("click", logOut);
  document.getElementById("btn-admin").addEventListener("click", animesAdmin);
  document.getElementById("btn-user").addEventListener("click", animesUser);

  checkLogInStatus();
}

function animesAdmin() {
  window.location='animes.html';
}

function animesUser() {
  window.location='animesparausuarios.html';
}

function checkLogInStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);

      var usuarioID = firebase.auth().currentUser.uid;

      console.log(usuarioID);
      if (usuarioID == 'HfPRY3KNfEbYVnURHXlAiKq2cXf1') {
        document.getElementById("btn-admin").style.display = "block";
        document.getElementById("btn-user").style.display = "block";
        document.getElementById("texto").style.display = "none";
      } else {
        document.getElementById("btn-user").style.display = "block";
        document.getElementById("btn-admin").style.display = "none";
        document.getElementById("texto").style.display = "none";
      }

      document.getElementById("form-login").style.display = "none";
      document.getElementById("logout").style.display = "block";
      document.getElementById("texto").style.display = "none";

    } else {
      // No user is signed in.
      document.getElementById("texto").style.display = "block";
      document.getElementById("form-login").style.display = "block";
      document.getElementById("logout").style.display = "none";
      document.getElementById("btn-user").style.display = "none";
      document.getElementById("btn-admin").style.display = "none";

      document.getElementById("form-login").reset();
    }
  });
}

function doLogin(event) {
  event.preventDefault();
  var formLogin = event.target;
  var email = formLogin.email.value;
  var password = formLogin.pwd.value;
  firebase.auth().signInWithEmailAndPassword(email, password).
  catch(function(error) {
    //Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function logOut() {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

}

function initializeFirebase() {
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
