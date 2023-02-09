const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')
const sectionReiniciar = document.getElementById('reiniciar')

const botonReiniciar = document.getElementById('boton-reiniciar')



const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const image = new Image(80)

let imageEnemigo = new Image(80)
const spanMascotaEnemigo = document.getElementById('mascota-enemigo').appendChild(imageEnemigo)

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
// const inputHipodoge = document.getElementById('hipodoge')
// const inputCapipepo = document.getElementById('capipepo')
// const inputRatigueya = document.getElementById('ratigueya') lo convertimos en LET

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
let ataqueEnemigo = []
let ataquesMokepon
let ataquesMokeponEnemigo
let botonAgua
let botonTierra
let botonFuego
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let ataqueJugador =[]
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './img/mokemap.png'
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon {
  constructor(nombre, foto, vida, fotomapa, id = null){
    this.id = id
    this.nombre = nombre
    this.foto = foto
    this.vida = vida
    this.ataques = []
    this.ancho = 40
    this.alto = 40
    this.x = aleatorio (0, mapa.width - this.ancho)
    this.y = aleatorio (0, mapa.height - this.alto)
    this.mapaFoto = new Image()
    this.mapaFoto.src = fotomapa
    this.velocidadX = 0
    this.velocidadY = 0
  }
  pintarMokepon() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.ancho,
      this.alto
    )
  }

}

let hipodoge = new Mokepon('Hipodoge', "img/charmander.jpg", 5, './img/ratigueya.png')
let capipepo = new Mokepon('Capipepo', "img/Squirtle.jpg", 5, './img/hipodoge.png')
let ratigueya = new Mokepon('Ratigueya', "img/bulbasaur.jpg", 5, './img/capipepo.png')


const HIPODOGE_ATAQUES = [ 
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🌱', id: 'boton-tierra' },
]


hipodoge.ataques.push(...HIPODOGE_ATAQUES)
//hipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '🌱', id: 'boton-tierra' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🔥', id: 'boton-fuego' },
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)
//capipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)

const RATIGUEYA_ATAQUES = [
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '🔥', id: 'boton-fuego' },
  { nombre: '💧', id: 'boton-agua' },
  { nombre: '🌱', id: 'boton-tierra' },
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)
//ratigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {
    /*1. elements are referenced and saved in var*/
  /*2. the section is hidden to be displayed according to execution.*/
  sectionSeleccionarAtaque.style.display = 'none'
  sectionVerMapa.style.display = 'none'

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre} />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto}  alt=${mokepon.nombre}>
    </label>
    `
  contenedorTarjetas.innerHTML += opcionDeMokepones

    inputCapipepo = document.getElementById('Capipepo')
    inputHipodoge = document.getElementById('Hipodoge')
    inputRatigueya = document.getElementById('Ratigueya')
  })

  /*3. when botonMascotaJugador is selected with a click, the function
    seleccionarMascotaJugador will be triggered*/
  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
  sectionReiniciar.style.display = 'none'
  /*5. botonFuego will save captured element, then func. ataqueFuego will be triggered*/

  botonReiniciar.addEventListener('click', reiniciarJuego)

  unirseAlJuego()

}

function unirseAlJuego() {
  fetch("http://192.168.0.22:8080/unirse")
    .then(function (res){  
      
        if (res.ok) {
          res.text()
            .then(function (respuesta){
              console.log(respuesta)
              jugadorId = respuesta
            } )
        }
    })

}

function seleccionarMascotaJugador() {
  //sectionSeleccionarAtaque.style.display = 'flex'
    // let imagenDeCapipepo = new Image()
  // imagenDeCapipepo.src = capipepo.foto

  //let spanMascotaJugador = document.getElementById('mascota-jugador')  SUSTITUIR EL SPAN POR UNA ETIQUETA IMG
   /*3.1 if inputHipodoge is checked then spanMascotaJugador will display selected character*/
  if (inputHipodoge.checked) {
    image.src = hipodoge.foto
    document.getElementById('mascota-jugador').appendChild(image)
    mascotaJugador = inputHipodoge.id
    //spanMascotaJugador.innerHTML = inputHipodoge.id
  }else if (inputCapipepo.checked) {
    image.src = capipepo.foto
    document.getElementById('mascota-jugador').appendChild(image)
    mascotaJugador = inputCapipepo.id
    //spanMascotaJugador.innerHTML = 'capipepo'
  } else if (inputRatigueya.checked) {
    image.src = ratigueya.foto
    document.getElementById('mascota-jugador').appendChild(image)
    mascotaJugador = inputRatigueya.id
    //spanMascotaJugador.innerHTML = 'Ratigueya'
  } else {
  alert("Manito selecciona una mascota pls")
  return
  // location.reload()    VOLVER A CARGAR LA FUNCIÓN SI NO SELECCIONÓ UNA MASCOTA
  }
  sectionSeleccionarMascota.style.display = 'none'
  /*3.2 After character is selected seleccionarMascotaEnemigo will be triggered */
  seleccionarMokepon(mascotaJugador)
  
  

  extraerAtaques(mascotaJugador)
  sectionVerMapa.style.display = 'flex'
  iniciarMapa()
  
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://192.168.0.22:8080/mokepon/${jugadorId}`, {
      method: "post",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          mokepon: mascotaJugador
      })
  })
}

function extraerAtaques(mascotaJugador) {
  let ataques
  for (let i = 0; i < mokepones.length; i++) {
      if (mascotaJugador === mokepones[i].nombre) {
          ataques = mokepones[i].ataques
      }

  }
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon =`<button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML += ataquesMokepon
  });
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botonFuego = document.getElementById('boton-fuego')
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque() {
  botones.forEach((boton) => {   //por cada boton en el arreglo de botones HAZ ALGO ...
    boton.addEventListener('click', (e) => {
      console.log(e)
       if (e.target.textContent === '🔥') {
          ataqueJugador.push('FUEGO')
          console.log(ataqueJugador)
          boton.style.background = '#112f58'
          boton.disabled = true
        } else if (e.target.textContent === '💧') {
          ataqueJugador.push('AGUA')
          console.log(ataqueJugador)
          boton.style.background = '#112f58'
          boton.disabled = true
        } else {
          ataqueJugador.push('TIERRA')
          console.log(ataqueJugador)
          boton.style.background = '#112f58'
          boton.disabled = true
        }
        /* ataqueAleatorioEnemigo() */
        if (ataqueJugador.length === 5 ) {
          enviarAtaques()
        }
        
    })
  });
}

function enviarAtaques() {
  fetch(`http://192.168.0.22:8080/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ataques: ataqueJugador
    })
      
  })
  intervalo = setInterval(obtenerAtaques, 50)
}


function obtenerAtaques() {
  fetch(`http://192.168.0.22:8080/mokepon/${enemigoId}/ataques`)
      .then(function (res) {
          if (res.ok) {
              res.json()
                  .then(function ({ ataques }) {
                      if (ataques.length === 5) {
                          ataqueEnemigo = ataques
                          combate()
                      }
                  })
          }
      })
}


function seleccionarMascotaEnemigo(enemigo) {
  /*4. mascotaAleatoria will save value generated in function aleatorio*/
  /* let mascotaAleatorio = aleatorio(0, mokepones.length - 1) */
  spanMascotaEnemigo.innerHTML = enemigo.nombre
  ataquesMokeponEnemigo = enemigo.ataques

  //let spanMascotaEnemigo = document.getElementById('mascota-enemigo')
  /*4.1 depending on value spanMascotaEnemigo will display character selected by opponent (machine)*/
  imageEnemigo.src = enemigo.foto
  

  secuenciaAtaque()
  // if (mascotaAleatorio == 1) {
  //   imageEnemigo.src = '/mokepon/img/charmander.jpg'
  //   document.getElementById('mascota-enemigo').appendChild(imageEnemigo)
  //   //spanMascotaEnemigo.innerHTML = 'Hipodoge'
  // } else if (mascotaAleatorio == 2){
  //   imageEnemigo.src = '/mokepon/img/Squirtle.jpg'
  //   document.getElementById('mascota-enemigo').appendChild(imageEnemigo)
  //   //spanMascotaEnemigo.innerHTML = 'Capipepo'
  // } else if (mascotaAleatorio ==3){
  //   imageEnemigo.src = '/mokepon/img/bulbasaur.jpg'
  //   document.getElementById('mascota-enemigo').appendChild(imageEnemigo)
  //   //spanMascotaEnemigo.innerHTML = 'Ratigueya'
  // }
}

// function ataqueFuego (){
//   /*6. after func. gets triggered global var. ataqueJugador will save selected attack
//     then function ataqueAleatorioEnemigo will be triggered*/
//   ataqueJugador = 'FUEGO'
//   ataqueAleatorioEnemigo()
//   alert( 'Elegiste usar el ataque de '+ ataqueJugador)
// }
// function ataqueAgua (){
//   ataqueJugador = 'AGUA'
//   ataqueAleatorioEnemigo()
//   alert( 'Elegiste usar el ataque de '+ ataqueJugador)
// }
// function ataqueTierra (){
//   ataqueJugador = 'TIERRA'
//   ataqueAleatorioEnemigo()
//   alert( 'Elegiste usar el ataque de '+ ataqueJugador)
// }

function ataqueAleatorioEnemigo(){
  console.log('ataques enemigo', ataquesMokeponEnemigo)
  /*7. var. ataqueAleatorioEnemigo will save value generated in function aleatorio*/
  let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

  if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
    ataqueEnemigo.push('FUEGO')
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4 ){
    ataqueEnemigo.push('AGUA')
  } else {
    ataqueEnemigo.push('TIERRA')
  }
  console.log(ataqueEnemigo)
  /*7.2 function will be triggered*/
  //combate() // RECORDAR SIEMPRE INICIAR LA FUNCIÓN TRAS TERMINAR LA ANTERIOR
  iniciarPelea()
}

function iniciarPelea () {
  if (ataqueJugador.length === 5 ) {
    combate ()
  }

}

function indexAmbosOponentes(jugador, enemigo){
  indexAtaqueJugador = ataqueJugador[jugador]
  indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
  clearInterval(intervalo)

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index)
      crearMensaje("EMPATE")
    }else if (ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA' || ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO' || ataqueJugador[index] == 'TIERRA' && ataqueEnemigo[index] == 'AGUA' ){
      indexAmbosOponentes(index, index)
      crearMensaje("GANASTE")
      victoriasJugador++
      // spanVidasEnemigo.innerHTML = vidasEnemigo
      spanVidasJugador.innerHTML = victoriasJugador
    }else {
      indexAmbosOponentes(index, index)
      crearMensaje("PERDISTE")
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }

  }

  /*8. spanVidasJugador will save captured element*/
  /*8.1 depending on values in ataqueEnemigo and ataqueJugador, func. crearMensaje
     will be triggered. global var. vidasEnemigo or vidasJugador will decrease
     depending on result of if. Method spanVidasEnemigo.innerHTML will
     display number of lives remaining*/
  // if(ataqueJugador == ataqueEnemigo){
  //   crearMensaje("EMPATE")
  // }else if(ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO" || ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA"  || ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA"){
  //   crearMensaje("GANASTE")
  //   vidasEnemigo --
  //   spanVidasEnemigo.innerHTML = vidasEnemigo
  // }else{
  //   crearMensaje("PERDISTE")
  //   vidasJugador --
  //   spanVidasJugador.innerHTML = vidasJugador

  /*8.2 function revisarVidas will be trigerred */
  revisarVidas()

}

function revisarVidas(){

  /*9. depending on result from if, func. crearMensajeFinal will
    display if player won or lost game*/
  if (victoriasJugador === victoriasEnemigo){
    crearMensajeFinal('ESTO FUE UN EMPATE !!!')
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal('FELICIDAES , GANASTES !!!! 😊')
  } else {
    crearMensajeFinal('PERDISTE UU  !!!! 🥲')
  }
}
/*Documentation on how crearMensaje(param) works*/
function crearMensaje(resultado) {

   /*1.. Element is captured*/

  /*2.. Element <p> is created*/
  let nuevoAtaqueDelJugador = document.createElement('p')
  let nuevoAtaqueDelEnemigo = document.createElement('p')
  /*3.. innerHTML will replace content on sectionMensajes with value of 'resultado'*/
  sectionMensajes.innerHTML = resultado
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo


  /*4.. appendChild will append value of 'nuevoAtaqueDelJugador' in element
    created in nuevoAtaqueDelJugador*/
  // let parrafo = document.createElement('p')
  // parrafo.innerHTML = 'Tu mascota atacó con '+ ataqueJugador +' y la mascota del enemigo atacó con '+ ataqueEnemigo + ' - ' + resultado
  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal) {

  // let parrafo = document.createElement('p')   DELETE
  sectionMensajes.innerHTML = resultadoFinal
  // sectionMensajes.appendChild(parrafo)    DELETE
  // botonFuego.disabled = true
  // botonAgua.disabled = true
  // botonTierra.disabled = true
  sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
  location.reload()

}

function aleatorio(min, max) {
  return Math.floor(Math.random()*(max - min +1)+ min)

}

function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
//RECORDAR :  Ejecutalar la siguiente función :  para limpiar nuestro CANVAS  y no deje copias de las fotos. 
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  mascotaJugadorObjeto.pintarMokepon()

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon()    
    revisarColision(mokepon)
  })

  /* hipodogeEnemigo.pintarMokepon()
  capipepoEnemigo.pintarMokepon()
  ratigueyaEnemigo.pintarMokepon() */

  /* if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
    revisarColision(hipodogeEnemigo)
    revisarColision(capipepoEnemigo)
    revisarColision(ratigueyaEnemigo)
  } */

  // lienzo.drawImage(
  //   mascotaJugadorObjeto.mapaFoto,
  //   mascotaJugadorObjeto.x,
  //   mascotaJugadorObjeto.y,
  //   mascotaJugadorObjeto.ancho,
  //   mascotaJugadorObjeto.alto
  // )
}

function enviarPosicion(x ,y) {
  fetch(`http://192.168.0.22:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
  .then(function(res){
    if (res.ok) {
      res.json()
      .then(function ({ enemigos }){
        console.log(enemigos) // es la misma variable que enviamos en INDEX.JS res.sed enemigos
        mokeponesEnemigos = enemigos.map(function (enemigo) {
          let mokeponEnemigo = null
          const mokeponNombre = enemigo.mokepon.nombre || ""
          if (mokeponNombre === "Hipodoge") {
            mokeponEnemigo = new Mokepon('Hipodoge', "img/charmander.jpg", 5, './img/ratigueya.png', enemigo.id)  
          }else if (mokeponNombre === "Capipepo") {
            mokeponEnemigo = new Mokepon('Capipepo', "./img/Squirtle.jpg", 5, './img/hipodoge.png', enemigo.id)
          }else if (mokeponNombre === "Ratigueya") {
            mokeponEnemigo = new Mokepon('Ratigueya', "img/bulbasaur.jpg", 5, './img/capipepo.png', enemigo.id)            
          }
          
          mokeponEnemigo.x = enemigo.x
          mokeponEnemigo.y = enemigo.y
          
          return mokeponEnemigo

        })
      })
    }
  })
}



function moverDerecha(){
  mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
  mascotaJugadorObjeto.velocidadX = - 5
}

function moverAbajo(){
  mascotaJugadorObjeto.velocidadY = + 5
}

function moverArriba(){
  mascotaJugadorObjeto.velocidadY = - 5
}

function detenerMovimiento(){
  mascotaJugadorObjeto.velocidadX = 0
  mascotaJugadorObjeto.velocidadY = 0 
}

function sePrecionoUnaTecla(event){
  switch (event.key) {
    case 'ArrowUp':
      moverArriba()
      break
    case 'ArrowDown':
      moverAbajo()
      break
    case 'ArrowLeft':
      moverIzquierda()
      break
    case 'ArrowRight':
      moverDerecha()
      break
    default:
      break
  }
}

function iniciarMapa(){
  /* mapa.width = 320
  mapa.height = 240 */
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
  console.log(mascotaJugadorObjeto, mascotaJugador)
  intervalo = setInterval(pintarCanvas, 50)

  window.addEventListener('keydown', sePrecionoUnaTecla)

  window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
        return mokepones[i]

      }
   }
}

function revisarColision(enemigo){
  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto 
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x 

  const arribaMascota = mascotaJugadorObjeto.y
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto 
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
  const izquierdaMascota = mascotaJugadorObjeto.x 


  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return
  }
  detenerMovimiento()
  clearInterval(intervalo)
  console.log('se detecto una colisión')

  enemigoId = enemigo.id
  sectionSeleccionarAtaque.style.display = 'flex'
  sectionVerMapa.style.display = 'none'
  seleccionarMascotaEnemigo(enemigo)
  
}

window.addEventListener('load',iniciarJuego) // cuando cargue nuestro código, iniciemos la funcion INICIAR JUEGO
//Point of entry

