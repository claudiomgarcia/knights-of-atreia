//Se definen los objetos de los jugadores y declaran las variables
let player = {
    vida: 50,
    ataque: 10,
    defensa: 5,
}

let enemy = {
    vida: 50,
    ataque: 10,
    defensa: 5,
}
let movimiento_player
let movimiento_pc


//Inicia El Juego
alert('Bienvenidos a Knights of Atreia')

//Inicia un bucle para pedir movimientos
while (true) {
    if (player.vida <= 0) {
        alert("Perdiste")
        break
    }
    else if (enemy.vida <= 0) {
        alert('Ganaste!')
        break
    }
    else {
        //Movimiento Jugador
        movimiento_player = prompt('Elige tu movimiento\nEscribe 0 para atacar, 1 para defender')
        if (movimiento_player == 0) {
            alert('Elegiste atacar')
        }
        else if (movimiento_player == 1) {
            alert('Elegiste defender')
        }


        //Movimiento PC
        movimiento_pc = Math.round(Math.random())
        if (movimiento_pc == 0) {
            alert('El enemigo ataca')
        }
        else if (movimiento_pc == 1) {
            alert('El enemigo defiende')
        }
    }

//Llama a la funcion para calcular daños    
calcularResultado(movimiento_player,movimiento_pc)

}


//Funcion para calcular los daños en los ataques
function calcularResultado(movimiento_player,_movmiento_pc){
    if (movimiento_player == 0 && movimiento_pc == 0) {
        player.vida = player.vida - enemy.ataque
        enemy.vida = enemy.vida - player.ataque
        alert('Los dos atacan\nTu vida restante: ' + player.vida + '\nVida restante del enemigo: ' + enemy.vida)

    }
    else if (movimiento_player == 1 && movimiento_pc == 1) {
        alert('Los dos defienden\nTu vida restante: ' + player.vida + '\nVida restante del enemigo: ' + enemy.vida)
    }
    else if (movimiento_player == 0 && movimiento_pc == 1) {
        enemy.vida = enemy.vida - (player.ataque - enemy.defensa)
        alert('Atacaste, el enemigo defiende\nTu vida restante: ' + player.vida + '\nVida restante del enemigo: ' + enemy.vida)
    }
    else if (movimiento_player == 1 && movimiento_pc == 0) {
        player.vida = player.vida - (enemy.ataque - player.defensa)
        alert('Defendiste, el enemigo atacó\nTu vida restante: ' + player.vida + '\nVida restante del enemigo: ' + enemy.vida)
    }
}




