window.onload = inicializar;

// Array bidimensional en el cual se guardan las preguntas junto a cada respuesta
var preguntas = [																			// Pregunta Respuesta
	['¿Quien fue el primer Mugiwara en unirse a la tripulación?', 'Roronoa Zoro'],         //  [0][0]   [0][1]
	['¿Cuando usó Luffy el Gear Sekando por primera vez?', 'Contra el CP9'],						  //  [1][0]   [1][1]
	['¿En qué momento se transforma Goku en Super Saiyan?', 'Cuando muere Krillin'],  //  [2][0]   [2][1]
	['¿Cuál es la última transformación de Goku?', 'Miggate no gokui'],									// ...
	['¿Es Kurama un Biju en Naruto?', 'Si'],
	['¿Cuando desata Naruto el poder completo de Kyubi?', 'Contra Sasuke en la batalla del fin'],
	['¿Kurosaki Ichigo es un hollow?', 'Si'],
	['¿Cómo se llama la Zanpaku-tō de Ichigo?', 'Zangetsu'],
	['¿Cómo se llama el Planeta de los Saiyan?', 'Planeta Vegeta'],                            // ...
	['¿Cómo consigue Vegeta transformarse en Super Saiyan?', 'Por la frustración']						// [9][0] y [9][1]
],
pregunta, respuesta,
formuladas = 0,
acertadas = 0;
var font = 0;
var p;

function fondo() {
	if (font == 0) {
		document.body.style.backgroundImage = "url('img/bgb.jpg')";
		font = 1;
	} else if (font == 1) {
		document.body.style.backgroundImage = "url('img/bg.jpg')";
		font = 0;
	}
}

// Lista de canciones para el reproductor en Array

var canciones = [
  {
    nombre: "Gradus Vita",
    autor: "Hellsing",
    archivo: "music/hellsing-gradus-vita.mp3"
  },
  {
    nombre: "Luffy vs Cocodrile",
    autor: "One Piece",
    archivo: "music/luffy-vs-cocodrile.mp3"
  },
  {
    nombre: "Terror",
    autor: "Dragon Ball Super",
    archivo: "music/dragon-ball-super-terror.mp3"
  },
  {
    nombre: "Ascended Super Saiyan",
    autor: "Dragon Ball Z",
    archivo: "music/dragon-ball-z-ascended-super-saiyan.mp3"
  },
  {
    nombre: "Cell Battles",
    autor: "Dragon Ball Z",
    archivo: "music/dragon-ball-z-cell-battles.mp3"
  },
  {
    nombre: "The Power Of Goku",
    autor: "Dragon Ball Z",
    archivo: "music/dragon-ball-z-the-power-of-goku.mp3"
  },
  {
    nombre: "The Cyborg Fights",
    autor: "One Punch Man",
    archivo: "music/the-cyborg-fights.mp3"
  },
  {
    nombre: "The Devil Fights",
    autor: "Hataraku-Mao-Sama",
    archivo: "music/hataraku-mao-sama.mp3"
  },
  {
    nombre: "Priest's Pride Before The Fall",
    autor: "Hellsing",
    archivo: "music/priests-pride-before-the-fall.mp3"
  }
]

function inicializar() {
	mostrarcanciones();
  var todasLasCanciones = document.getElementsByClassName("cancion");
  for (var i = 0; i < todasLasCanciones.length; i++) {
    todasLasCanciones[i].addEventListener("click", cambiarCancion);
  }
	p = document.getElementById("preg");
	p.addEventListener("mouseover", reaccionarAnteElRatonPorEncima);
	p.addEventListener("mouseout", reaccionarAlSalir);


	/*
	Se programa que al pulsarse el botón "Siguiente Pregunta" se compruebe si se ha acertado la pregunta, en cuyo caso, se incrementa en una unidad 'acertadas'.
	También se comprueba si ya se han realizado las 5 preguntas, en cuyo caso, se llama a 'muestraResultado()' que mostrará el resultado del juego y terminará el programa, de lo contrario, se formula una nueva pregunta.
	*/
	document.getElementById('boton').addEventListener('click', function(){
		var entrada = document.getElementById("dato").value;
		if(entrada == respuesta){
			acertadas++;
		}
		if(formuladas < 5){			// Si aun no se han hecho 5 preguntas...
			hazPregunta();			// ... seguir preguntando
		}
		else{						// de lo contrario...
			muestraResultado();		// ... finaliza juego mostrando el resultado
		}
	});

	hazPregunta();

}

function reaccionarAnteElRatonPorEncima() {
	p.style.backgroundColor = "red";
}

function reaccionarAlSalir() {
	p.style.backgroundColor = "transparent";
}

/*
Formula una pregunta al usuario...
*/
function hazPregunta(){
	var e;			// simple variable auxiliar
	// se extrae una pregunta/respuesta al azar del array...
	e = preguntas.splice( numAleat(0, preguntas.length-1), 1 );
	pregunta = e[0][0];			// se guardan la pregunta y la respuesta
	respuesta = e[0][1];
	document.getElementById('preg').innerHTML = pregunta;        // se muestra la pregunta
	document.getElementById('dato').value = '';                  // se borra lo escrito anteriormente por el usuario
	formuladas++;
}
// Comprueba el número de preguntas acertadas y muestra mensaje en función de este...
function muestraResultado(){
	var resultado;      // para guardar el mensaje con el resultado
	switch(acertadas){
		case 0:
		resultado = '¿0? ¡Vamos, seguro que puedes hacerlo mejor!';
		break;
		case 1:
		resultado = '¡Ya vas mejorando, has acertado 1!';
		break;
		case 2:
		resultado = '¿2? ¡VAMOS! Aún puedes hacerlo mejor';
		break;
		case 3:
		resultado = '¡Uh, 3/5 ya estás dandole caña!';
		break;
		case 4:
		resultado = 'Así es, ya tienes 4';
		break;
		case 5:
		resultado = '¡INCREÍBLE, has podido con todas! <3';
		break;
	}
	document.getElementById('resolucion').innerHTML = resultado;
}
/*
Devuelve un número aleatorio entero entre 'min' y 'max' (ambos inclusive)
*/
function numAleat(min, max){
	return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function cambiarCancion(event) {
var cancionSeleccionada = event.target;
document.getElementById("cancion").src = canciones[cancionSeleccionada.value].archivo;
document.getElementById("audio").load();
}

function mostrarcanciones() {
  var listaDeCanciones = document.getElementById("lista-de-canciones");
  for(var i = 0; i < canciones.length; i++){
      listaDeCanciones.innerHTML += '<li class="list-group-item cancion" value="'+ i +'">' + canciones[i].nombre + '</li>';
  }
}

function reiniciar() {
	window.location.reload(true);
}
