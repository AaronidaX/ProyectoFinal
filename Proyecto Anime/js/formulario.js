window.onload = inicializar;

function inicializar(){
  var formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", validarFormulario);
}

function validarFormulario() {
  console.log("paco");
  var formulario = event.target;
  if(formulario.Nombre.value == "") {
    event.preventDefault();
    document.getElementById("error-nombre").style.display = "block";
  } else if(formulario.Nombre.value != "") {
    document.getElementById("error-nombre").style.display = "none";
  } if(formulario.Email.value == "") {
    event.preventDefault();
    document.getElementById("error-email").style.display = "block";
  } else if(formulario.Email.value != "") {
    document.getElementById("error-email").style.display = "none";
  } if(formulario.Edad.value <=17 || formulario.Edad.value >99) {
    event.preventDefault();
    document.getElementById("error-edad").style.display = "block";
  } else if(formulario.Edad.value != "") {
    document.getElementById("error-edad").style.display = "none";
  } if(formulario.Repetir.value != formulario.Contraseña.value){
    event.preventDefault();
    document.getElementById("error-contra").style.display = "block";
  } else if(formulario.Repetir.value == formulario.Contraseña.value) {
    document.getElementById("error-contra").style.display = "none";
  } if(formulario.Contraseña.value == "") {
    event.preventDefault();
    document.getElementById("error-contrasenya").style.display = "block";
  } else if(formulario.Contraseña.value != "") {
    document.getElementById("error-contrasenya").style.display = "none";
  } if(formulario.Pais.value == "") {
    event.preventDefault();
    document.getElementById("error-pais").style.display = "block";
  } else if(formulario.Pais.value != "") {
    document.getElementById("error-pais").style.display = "none";
  } if(formulario.radios0.checked == false && formulario.radios1.checked == false) {
    event.preventDefault();
    document.getElementById("error-sexo").style.display = "block";
  } else if(formulario.radios0.checked == true | formulario.radios1.checked == true) {
    document.getElementById("error-sexo").style.display = "none";
  } if(formulario.phone.value == "") {
    event.preventDefault();
    document.getElementById("error-phone").style.display = "block";
  } else if(formulario.phone.value != "") {
    document.getElementById("error-phone").style.display = "none";
  } if (formulario.checkbox.checked == false) {
    event.preventDefault();
    document.getElementById("error-terminos").style.display = "block";
  } else if (formulario.checkbox.checked == true) {
    document.getElementById("error-terminos").style.display = "none";
  }
}
