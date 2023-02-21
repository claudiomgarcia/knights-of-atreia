//Clase constructora usuario
class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

//Clase constructora para crear un personaje
class Personaje {
    constructor(vida, ataque_min, ataque_max, defensa_min, defensa_max, especial) {
        this.ataque_min = ataque_min;
        this.vida = vida;
        this.ataque_max = ataque_max;
        this.defensa_min = defensa_min;
        this.defensa_max = defensa_max;
        this.especial = especial;
    }
}

// Creación de los objetos player y enemy 
const player = new Personaje(1000, 80, 100, 80, 90, 150);
const enemy = new Personaje(1000, 70, 90, 75, 85, 150);

//Declaracion de variables
const nuevaSeccion = document.getElementById("seccion-principal")
const nuevaMusica = document.getElementById("musica")
const ATTACK = 0;
const DEFEND = 1
let movimiento_player
let movimiento_pc
let textoBatalla
let playerHealthBar
let enemyHealthBar
let hpTextPlayer
let hpTextEnemy
let usuario

//busco en localStorage el objeto y hago un parse para que JS me devuelva un objeto
let objectoLocalStorage = JSON.parse(localStorage.getItem("usuario"))

if (objectoLocalStorage) { //Si Nombre tiene contenido, entonces lo muestro
    usuario = new Usuario(objectoLocalStorage.nombre, objectoLocalStorage.email)

    asignarValoresAlosInputs(usuario)

} else {
    usuario = new Usuario('', false)
    asignarValoresAlosInputs(usuario)
}

function grabarDatos(e) {
    //Cancelamos el comportamiento del evento
    e.preventDefault();
    let valorInputNombre = document.getElementById("inputNombre").value
    let valorInputEmail = document.getElementById("inputEmail").value

    localStorage.setItem("usuario", JSON.stringify({
        nombre: valorInputNombre,
        email: valorInputEmail
    }))
    location.reload();
}

function asignarValoresAlosInputs(usuario) {
    if (usuario.nombre != '') {
        document.getElementById("comprobar-usuario").innerHTML = `
        <h3 class="text-focus-in" id="bienvenida">Bienvenido ${usuario.nombre}</h3>
                    <button id="jugar" class="myButton">JUGAR</button>`
        //Boton para iniciar el Juego
        const btnJugar = document.getElementById("jugar")
        btnJugar.onclick = () => {
            pantallaCarga();
            setTimeout(iniciarBatalla,2000)
        }

    } else {
        document.getElementById("comprobar-usuario").innerHTML = `
                    <h3 class="text-focus-in" id="bienvenida">Por favor, ingresa tus datos:</h3>
                    <form action="grabarDatos" id="formGuardarUser">
                    <p><input id="inputNombre" type="text" placeholder="Nombre" name="nombre" required></p>
                    <p><input id="inputEmail" type="email" placeholder="Email" name="email" required></p>
                    <button type="submit" class="myButton">Guardar</button>
                    </form>`
                    document.getElementById("formGuardarUser").addEventListener("submit", grabarDatos);
    }
}

//Simula una pantalla de carga 
const pantallaCarga = () => {
    nuevaSeccion.innerHTML = 
    `<div id="carga">
            <p>
            <img src="../img/loading.gif" alt="Cargando">
            </p>
            <h4>Cargando</h4>
    </div>`
}

//Calcula el movimiento del enemigo
function getEnemyMove() {
    return Math.round(Math.random());
}

//Calcula el valor del ataque segun los valores minimos y maximos de cada personaje y calcula la posibilidad de un golpe critico 
function calcDamage(min, max) {
    let damage = Math.floor(Math.random() * (max - min + 1) + min);
    let criticalHitChance = Math.random() * 100;

    if (criticalHitChance <= 10) {
        damage *= Math.floor(1.2);
        Toastify({
            text: "Daño Critico!",
            offset: {
                x: "45vw",
                y: "50vh"
            },
            style: {
                background: "linear-gradient(to right, #d40023, #ffab51)",
            },
            duration: 2000,
        }).showToast();
    }
    return damage
}

//Calcula el valor de la defensa tomando los valores minimos y maximos de cada personaje
function calcDefense(min, max) {
    let valor = Math.floor(Math.random() * (max - min + 1) + min);
    return valor
}

function iniciarBatalla() {
    nuevaMusica.innerHTML = `<audio src="./audio/battle.mp3" autoplay="autoplay" loop="loop"></audio>`
    nuevaSeccion.innerHTML =
        `
        <main class="seccionBatalla">
        <h2><a href="index.html">Knights of Atreia</a> </h2>
        <section class="paralela">
          <span class="nombre-usuario">
            <h3>${usuario.nombre}</h3>
          </span>
          <p><img src="img/gladi.png" alt="Gladiador" class="imagen-batalla"></p>
    
          <div class="health">
            <progress id="player-health-bar" max="" value=""></progress>
            <p id="player-health-text"></p>
          </div>
    
          <div class="habilidades">
            <img src="img/boton-ataque.png" alt="Atacar" id="btnAtacar" class="boton-batalla">
            <img src="img/boton-defensa.png" alt="Defender" id="btnDefender" class="boton-batalla">
          </div>
    
        </section>
    
        <section class="paralela">
          <span class="nombre-enemigo">
            <h3>Calydon Bandit</h3>
          </span>
          <p><img src="img/calydon-bandit.png" alt="Calydon Bandit" class="imagen-batalla"></p>
    
          <div class="health">
            <progress id="enemy-health-bar" max="" value=""></progress>
            <p id="enemy-health-text"></p>
          </div>
    
          </section>
    
          <div class="texto-batalla" id="texto-batalla"></div>
            
           </section>
      </main>
`
    // Obtiene los elementos de la barra de vida desde el DOM
    playerHealthBar = document.getElementById("player-health-bar");
    enemyHealthBar = document.getElementById("enemy-health-bar");

    // Carga los valores maximos y vida actual en la barra de vida
    playerHealthBar.max = player.vida;
    enemyHealthBar.max = enemy.vida;
    playerHealthBar.value = player.vida;
    enemyHealthBar.value = enemy.vida;


    // Obtiene el texto que indicará la vida restante
    hpTextPlayer = document.getElementById("player-health-text");
    hpTextEnemy = document.getElementById("enemy-health-text");

    // Actualiza el texto de la vida restante
    hpTextPlayer.innerHTML = "HP: " + player.vida;
    hpTextEnemy.innerHTML = "HP: " + enemy.vida;

    let pulsadorAtacar = document.getElementById("btnAtacar")
    let PulsadorDefensa = document.getElementById("btnDefender")

    pulsadorAtacar.addEventListener('click', attackFunction)
    PulsadorDefensa.addEventListener('click', defenseFunction)

}

function attackFunction() {
    textoBatalla = document.getElementById("texto-batalla");

    player.ataque = calcDamage(player.ataque_min, player.ataque_max)

    movimiento_pc = getEnemyMove();
    console.log(movimiento_pc);

    if (movimiento_pc == ATTACK) {
        enemy.ataque = calcDamage(enemy.ataque_min, enemy.ataque_max);
        textoBatalla.innerHTML = `
         <p>Atacas con ${player.ataque} puntos</p>
         <p>El enemigo ataca con ${enemy.ataque} puntos</p>`

        player.vida -= enemy.ataque;
        enemy.vida -= player.ataque;

        playerHealthBar.value = player.vida;
        enemyHealthBar.value = enemy.vida;

        hpTextPlayer.innerHTML = "HP: " + player.vida;
        hpTextEnemy.innerHTML = "HP: " + enemy.vida;

        comprobarHp(player.vida, enemy.vida);
    }
    else if (movimiento_pc == DEFEND) {
        enemy.defensa = calcDefense(enemy.defensa_min, enemy.defensa_max);

        //Comprueba si la defensa del enemigo es mayor al ataque
        if (enemy.defensa > player.ataque) {
            textoBatalla.innerHTML = "La defensa de tu enemigo fue mayor a tu ataque, no le hiciste daño"
        }
        else {
            enemy.vida -= (player.ataque - enemy.defensa);
            enemyHealthBar.value = enemy.vida;
            hpTextEnemy.innerHTML = "HP: " + enemy.vida;
            textoBatalla.innerHTML = `
        <p>Atacas con ${player.ataque} puntos</p>
        <p>El enemigo defiende con ${enemy.defensa} puntos</p>`
        }

        comprobarHp(player.vida, enemy.vida);

    }
}

function defenseFunction() {
    textoBatalla = document.getElementById("texto-batalla");

    player.defensa = calcDefense(player.defensa_min, player.defensa_max)

    movimiento_pc = getEnemyMove();

    if (movimiento_pc == ATTACK) {
        enemy.ataque = calcDamage(enemy.ataque_min, enemy.ataque_max);

        //Comprueba si la defensa del enemigo es mayor al ataque
        if (player.defensa > enemy.ataque) {
            textoBatalla.innerHTML = "Tu defensa fue mayor que el ataque enemigo, no recibes daño"
        }
        else {
            textoBatalla.innerHTML = `
         <p>Defiendes con ${player.defensa} puntos</p>
         <p>El enemigo ataca con ${enemy.ataque} puntos</p>`

            player.vida -= enemy.ataque;
            playerHealthBar.value = player.vida;
            hpTextPlayer.innerHTML = "HP: " + player.vida;
            comprobarHp(player.vida, enemy.vida);
        }
    } else if (movimiento_pc == DEFEND) {
        textoBatalla.innerHTML = `
        <p>Los dos defienden</p>`
    }

    comprobarHp(player.vida, enemy.vida);
}


//Comprueba que los personajes tengan vida
function comprobarHp(playerHp, enemyHp) {
    if (playerHp <= 0) {
        pantallaDerrota();
    } else if (enemyHp <= 0) {
        pantallaVictoria();
    }
}


function pantallaVictoria() {
    nuevaMusica.innerHTML = `<audio src="./audio/victory.mp3" autoplay="autoplay" loop="loop"></audio>`
    nuevaSeccion.innerHTML =
        `
        <main class="seccionVictoria" id="seccion-victoria">
        <h1 class="text-focus-in">Victoria</h1>
        <h4 class="text-focus-in"><a href="index.html">Jugar de nuevo</a></h4>
        </main>
`
}

function pantallaDerrota() {
    nuevaMusica.innerHTML = `<audio src="./audio/defeat.mp3" autoplay="autoplay" loop="loop"></audio>`
    nuevaSeccion.innerHTML =
        `
        <main class="seccionDerrota" id="seccion-derrota">
        <h1 class="text-focus-in">Derrota</h1>
        <h4 class="text-focus-in"><a href="index.html">Jugar de nuevo</a></h4>
        </main>
`
}