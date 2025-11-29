//Arri Rosario 121595/8
//com1
// +
let imagenes = [];
let textos = [
  "Martin, enfermo y postrado en cama, recibe a Torry con alegría.",
  "La madre de Martin entra a retar al perro, informada de los huecos en la casa de la vecina Tarkins.",
  "Martin escribe una nota para poner en el collar de Torry.",
  "Llegan visitas a la casa, entre ellas la señorita Haight, alegre y sonriente.",
  "Mamá le dice a Martin que la señorita Haight murió.",
  "Martin se cuestiona la muerte y el silencio lo invade.",
  "Torry se comporta de manera extraña y desaparece, dejando a Martin devastado.",
  "Martin observa el mundo desde su ventana y los libros sobre el clima.",
  "Una noche lo dejan al cuidado de la vecina Tarkins.",
  "Torry aparece de nuevo con olor putrefacto.",
  "Martin sale a buscarlo en el bosque helado.",
  "Muere de frío y sus padres descubren el acontecimiento.",
  "La madre, harta, decide atar a Torry y no dejarlo salir.",
  "Martin la resiente, y su enfermedad empeora.",
  "Finalmente, Martin fallece, dejando a su madre devastada.",
  "Tarkins lo ata afuera, mientras Martin lo espera.",
  "Martin escucha los ladridos, pero el perro entra solo.",
  "Martin y Torry vuelven a estar juntos. Fin.",
  "La madre toma la decisión de atar a Torry.",
  "Martin observa por la ventana recordando al perro."
];

//variables globales
let escena = 0;
let musicaIntro, musicaFondo, sonidoPagina;
let iniciado = false;

//carga de datoss
function preload() {
  for (let i = 0; i <= 19; i++) {
    imagenes[i] = loadImage("data/img" + i + ".jpg");
  }
  musicaIntro = loadSound("data/Intro.mp3");
  musicaFondo = loadSound("data/musica.mp3");
  sonidoPagina = loadSound("data/pagina.mp3");
}

function setup() {
  createCanvas(640, 480);
  textFont("Arial");
  textAlign(LEFT, TOP);
}

function draw() {
  background(0);

  if (!iniciado) {
    image(imagenes[0], 0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Haz clic para comenzar la historia", width / 2, height / 2 + 100);
    return;
  }

  image(imagenes[escena], 0, 0, width, height);
  mostrarTexto(escena - 1);

//botones de decision segun escena
  if (escena === 2) {
    dibujarBoton(100, 380, 180, 50, "La madre lo deja");
    dibujarBoton(360, 380, 180, 50, "La madre ata al perro");
  } else if (escena === 8) {
    dibujarBoton(100, 380, 180, 50, "Martin se queda");
    dibujarBoton(360, 380, 180, 50, "Martin sale a buscarlo");
  } else if (escena === 10) {
    dibujarBoton(100, 380, 180, 50, "Tarkins se queda");
    dibujarBoton(360, 380, 180, 50, "Tarkins se va");
  } else {
    dibujarBoton(width / 2 - 90, 400, 180, 50, "Siguiente");
  }
}

//texto
function mostrarTexto(i) {
  fill(255);
  textSize(18);
  text(textos[i], 50, 60, 540, 200);
}

//clieo
function mousePressed() {
  if (!iniciado) {
    userStartAudio();
    musicaIntro.loop();
    iniciado = true;
    return;
  }

//boton siguiente
  if (mouseEnBoton(width / 2 - 90, 400, 180, 50) && escena !== 2 && escena !== 8 && escena !== 10) {
    sonidoPagina.play();
    if (escena === 0) {
      musicaIntro.stop();
      musicaFondo.loop();
    }
    escena = avanzarHistoria(escena);
  }

  //decisiones
  if (escena === 2) {
    if (mouseEnBoton(100, 380, 180, 50)) {
      escena = 3; // "La madre lo deja"
    } else if (mouseEnBoton(360, 380, 180, 50)) {
      escena = 18; // "La madre ata al perro"
    }
  } else if (escena === 8) {
    if (mouseEnBoton(100, 380, 180, 50)) {
      escena = 9; // "Martin se queda"
    } else if (mouseEnBoton(360, 380, 180, 50)) {
      escena = 16; // "Martin sale a buscarlo"
    }
  } else if (escena === 10) {
    if (mouseEnBoton(100, 380, 180, 50)) {
      escena = 11; // "Tarkins se queda"
    } else if (mouseEnBoton(360, 380, 180, 50)) {
      escena = 14; // "Tarkins se va"
    }
  }
}

//el avance dela historia segun el camino ---
function avanzarHistoria(actual) {
  sonidoPagina.play();

  // CAMINO 1 – La madre ata al perro
  if (actual === 18) return 19;
  if (actual === 19) return 0;

  // CAMINO 2 – La madre lo deja
  if (actual === 3) return 4;
  if (actual === 4) return 5;
  if (actual === 5) return 6;
  if (actual === 6) return 7;
  if (actual === 7) return 8;

  // CAMINO 3 – Martin sale a buscarlo
  if (actual === 16) return 17;
  if (actual === 17) return 0;

  // CAMINO 4 – Martin se queda
  if (actual === 9) return 10;

  // CAMINO 5 – Tarkins se va
  if (actual === 14) return 15;
  if (actual === 15) return 0;

  // CAMINO 6 – Tarkins se queda
  if (actual === 11) return 12;
  if (actual === 12) return 13;
  if (actual === 13) return 0;

  //siguientes
  if (actual < imagenes.length - 1) return actual + 1;
  else {
    musicaFondo.stop();
    musicaIntro.loop();
    return 0;
  }
}

//funciones simpless
function dibujarBoton(x, y, w, h, texto) {
  rectMode(CORNER);
  if (mouseEnBoton(x, y, w, h)) fill(255);
  else fill(220);
  rect(x, y, w, h, 10);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(texto, x + w / 2, y + h / 2);
}

function mouseEnBoton(x, y, w, h) {
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}
