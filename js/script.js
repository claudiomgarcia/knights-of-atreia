//Función constructor para crear un personaje
function Personaje(vida, ataque_min, ataque_max, defensa_min, defensa_max, especial) {
    this.ataque_min = ataque_min;
    this.vida = vida;
    this.ataque_max = ataque_max;
    this.defensa_min = defensa_min;
    this.defensa_max = defensa_max;
    this.especial = especial;
}

// Creación de los objetos player y enemy 
const player = new Personaje(500, 80, 100, 80, 90, 150);
const enemy = new Personaje(500, 70, 90, 70, 80, 140);

const ATTACK = 0;
const DEFEND = 1
let movimiento_player
let movimiento_pc

const btnJugar = document.getElementById("jugar")

btnJugar.addEventListener('click', iniciarJuego)

//Inicia El Juego
function iniciarJuego() {
    alert('Bienvenidos a Knights of Atreia')

    while (player.vida > 0 && enemy.vida > 0) {
        movimiento_player = parseInt(prompt("Elige tu movimiento: 0 para atacar, 1 para defender"));

        if (movimiento_player !== ATTACK && movimiento_player !== DEFEND) {
            alert("Movimiento no válido, por favor elige de nuevo.");
            continue;
        }

        if (movimiento_player == ATTACK) {
            player.ataque = calcularValor(player.ataque_min, player.ataque_max);
            alert("Elegiste atacar con un ataque de " + player.ataque);
        }
        else if (movimiento_player == DEFEND) {
            player.defensa = calcularValor(player.defensa_min, player.defensa_max);
            alert("Elegiste defender con una defensa de " + player.defensa);
        }

        movimiento_pc = getEnemyMove();
        if (movimiento_pc == ATTACK) {
            enemy.ataque = calcularValor(enemy.ataque_min, enemy.ataque_max);
            alert("El enemigo ataca con un ataque de " + enemy.ataque);
        }
        else if (movimiento_pc == DEFEND) {
            enemy.defensa = calcularValor(enemy.defensa_min, enemy.defensa_max);
            alert("El enemigo defiende con una defensa de " + enemy.defensa);
        }

        //Llama a la funcion para calcular daños    
        calcularResultado(movimiento_player, movimiento_pc);

    }

    //Comprueba que los personajes tengan vida
    if (player.vida <= 0) {
        alert("Perdiste");
    } else if (enemy.vida <= 0) {
        alert("Ganaste!");
    }
}

//Calcula el movimiento del enemigo
function getEnemyMove() {
    return Math.round(Math.random());
}

//Funcion para calcular los daños en los ataques
function calcularResultado(movimiento_player, movimiento_pc) {
    if (movimiento_player == ATTACK && movimiento_pc == ATTACK) {
        player.vida -= enemy.ataque;
        enemy.vida -= player.ataque;
        alert("Los dos atacan\nTu vida restante: " + player.vida + "\nVida restante del enemigo: " + enemy.vida);
    }
    else if (movimiento_player == DEFEND && movimiento_pc == DEFEND) {
        alert("Los dos defienden\nTu vida restante: " + player.vida + "\nVida restante del enemigo: " + enemy.vida);
    }
    else if (movimiento_player == ATTACK && movimiento_pc == DEFEND) {
        if (enemy.defensa > player.ataque) {
            alert("La defensa de tu enemigo fue mayor a tu ataque, no le hiciste daño");
        }
        else {
            enemy.vida -= (player.ataque - enemy.defensa);
            alert("Atacaste, el enemigo defiende\nTu vida restante: " + player.vida + "\nVida restante del enemigo: " + enemy.vida);
        }
    }
    else if (movimiento_player == DEFEND && movimiento_pc == ATTACK) {
        if (player.defensa > enemy.ataque) {
            alert("Tu defensa es mayor al ataque del enemigo, no recibes daño");
        }
        else {
            player.vida -= (enemy.ataque - player.defensa);
            alert('Defendiste, el enemigo atacó\nTu vida restante: ' + player.vida + '\nVida restante del enemigo: ' + enemy.vida)
        }
    }
}

//Calcula el valor del ataque o la defensa tomando los valores minimos y maximos de cada personaje
function calcularValor(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}






