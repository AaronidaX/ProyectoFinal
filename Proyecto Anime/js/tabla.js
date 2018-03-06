var table = [];

window.onload = loadEvents;

function loadEvents() {
  var form = document.getElementById("animes");
  form.addEventListener("submit", animes);
}

function showTable() {
  var tableBody = document.getElementById("tusanimes");
  var fullTable = "";

  for (var i = 0; i < table.length; i++) {
    fullTable +=
    "<tr><td>" + table[i].anime + "</td><td>" + table[i].capitulosvistos +
    "</td><td>" + table[i].capitulospendientes + "</td><td>" + table[i].temporadasvistas +
    "</td><td>" + table[i].temporadaspendientes + "</td><td>" + table[i].genero +
    "</td><td>" + table[i].duracioncaps + "</td><td>" + table[i].capitulosportemp +
    "</td><td>" + table[i].anyodeestreno + "</td><td>" + table[i].estado +
    "</td></tr>";
  }

  tableBody.innerHTML = fullTable;
}

function animes(event) {
  event.preventDefault();
  var formulario = document.getElementById("animes");
  var comp = 0;
  if(formulario.anime.value == "") {
    event.preventDefault();
    document.getElementById("error-anime").style.display = "block";
  } else if(formulario.anime.value != "") {
    comp++;
    document.getElementById("error-anime").style.display = "none";
  }
  if(formulario.capitulosvistos.value == "") {
    event.preventDefault();
    document.getElementById("error-capseen").style.display = "block";
  } else if(formulario.capitulosvistos.value != "") {
    comp++;
    document.getElementById("error-capseen").style.display = "none";
  } if(formulario.capitulospendientes.value == "") {
    event.preventDefault();
    document.getElementById("error-cappend").style.display = "block";
  } else if(formulario.capitulospendientes.value != "") {
    comp++;
    document.getElementById("error-cappend").style.display = "none";
  } if(formulario.temporadasvistas.value == "") {
    event.preventDefault();
    document.getElementById("error-tempseen").style.display = "block";
  } else if(formulario.temporadasvistas.value != "") {
    comp++;
    document.getElementById("error-tempseen").style.display = "none";
  } if(formulario.temporadaspendientes.value == "") {
    event.preventDefault();
    document.getElementById("error-tempend").style.display = "block";
  } else if(formulario.temporadaspendientes.value != "") {
    comp++;
    document.getElementById("error-tempend").style.display = "none";
  } if(formulario.genero.value == "") {
    event.preventDefault();
    document.getElementById("error-gen").style.display = "block";
  } else if(formulario.genero.value != "") {
    comp++;
    document.getElementById("error-gen").style.display = "none";
  } if(formulario.duracioncaps.value == "") {
    event.preventDefault();
    document.getElementById("error-duracioncaps").style.display = "block";
  } else if(formulario.duracioncaps.value != "") {
    comp++;
    document.getElementById("error-duracioncaps").style.display = "none";
  } if(formulario.capitulosportemp.value == "") {
    event.preventDefault();
    document.getElementById("error-capstemp").style.display = "block";
  } else if(formulario.capitulosportemp.value != "") {
    comp++;
    document.getElementById("error-capstemp").style.display = "none";
  } if(formulario.anyodeestreno.value == "") {
    event.preventDefault();
    document.getElementById("error-anyo").style.display = "block";
  } else if(formulario.anyodeestreno.value != "") {
    comp++;
    document.getElementById("error-anyo").style.display = "none";
  } if(formulario.estado.value == "") {
    event.preventDefault();
    document.getElementById("error-estado").style.display = "block";
  } else if(formulario.estado.value != "") {
    comp++;
    document.getElementById("error-estado").style.display = "none";
  }

  var animeIntroducido = document.getElementById("anime").value;
  var capitulosvistosIntroducido = document.getElementById("capitulosvistos").value;
  var capitulospendientesIntroducido = document.getElementById("capitulospendientes").value;
  var temporadasvistasIntroducido = document.getElementById("temporadasvistas").value;
  var temporadaspendientesIntroducido = document.getElementById("temporadaspendientes").value;
  var generoIntroducido = document.getElementById("genero").value;
  var capitulosportempIntroducido = document.getElementById("capitulosportemp").value;
  var duracioncapsIntroducido = document.getElementById("duracioncaps").value;
  var anyodeestrenoIntroducido = document.getElementById("anyodeestreno").value;
  var estadoIntroducido = document.getElementById("estado").value;

  var agnadir = {
    anime: animeIntroducido, capitulosvistos: capitulosvistosIntroducido,
    capitulospendientes: capitulospendientesIntroducido, temporadasvistas: temporadasvistasIntroducido,
    temporadaspendientes: temporadaspendientesIntroducido, genero: generoIntroducido,
    capitulosportemp: capitulosportempIntroducido, duracioncaps: duracioncapsIntroducido,
    anyodeestreno: anyodeestrenoIntroducido, estado: estadoIntroducido
  };
  if (comp == 10){
  table.push(agnadir);
  showTable();
  document.getElementById("animes").reset();
}
}
