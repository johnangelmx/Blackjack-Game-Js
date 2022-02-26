const miModulo = (() => {
  'use strict'
  let deck = []
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K']
  // let puntosJugador = 0, puntosComputadora = 0;
  let puntosJugadores = []
  //? Referencias pedir
  const btnPedir = document.querySelector('#btnPedir'),
    btnDetener = document.querySelector('#btnDetener'),
    btnNuevo = document.querySelector('#btnNuevo')

  //? Referencia creacion carta
  const puntosHTML = document.querySelectorAll('small'),
    divCartasJugadores = document.querySelectorAll('.divCartas')

  const inicilizarJuego = (numJugadores = 2) => {
    deck = crearDeck()
    puntosJugadores = []
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0)
    }
    btnPedir.disabled = false
    btnDetener.disabled = false
    puntosHTML.forEach(elem => (elem.innerText = 0))
    divCartasJugadores.forEach(elem => (elem.innerHTML = ''))
  }

  const crearDeck = () => {
    deck = []
    for (let i = 2; i <= 10; i++) {
      for (const tipo of tipos) {
        deck.push(i + tipo)
      }
    }
    for (const tipo of tipos) {
      for (const especial of especiales) {
        deck.push(especial + tipo)
      }
    }
    //? El _.shuffle(), es una libreria que permite revolver un array y devolverlo ya revulto;
    return _.shuffle(deck)
  }

  const pedirCarta = () =>
    deck.length === 0 ? 'No hay cartas en el deck' : deck.pop()

  const valorCarta = carta => {
    const valor = carta.substring(0, carta.length - 1)
    return !isNaN(valor) ? valor * 1 : valor === 'A' ? 11 : 10
    // const valorCarta = carta => !isNaN(carta.slice(0,-1)) ? carta.slice(0,-1) * 1 : carta.slice(0,-1) === 'A' ? 11 : 10
    // const valorCarta = carta => carta.substring(0, carta.length-1) && !isNaN(valor) ? valor * 1 : valor === 'A' ? 11 : 10
  }
  // 0 es el primer jugador y el ultimo es la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta)
    puntosHTML[turno].innerText = puntosJugadores[turno]
    return puntosJugadores[turno]
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasJugadores[turno].append(imgCarta)
  }
  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie Gana')
      } else if (puntosMinimos > 21) {
        alert('Computadora gana')
      } else if (puntosComputadora > 21) {
        alert('jugador gana')
      } else if (puntosComputadora > puntosMinimos && puntosComputadora <= 21) {
        alert('Computadora gana')
      }
    }, 100)
  }
  const turnoComputadora = puntosMinimos => {
    let puntosComputadora = 0
    do {
      const carta = pedirCarta()
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
      crearCarta(carta, puntosJugadores.length - 1)
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21)
    determinarGanador()
  }
  //? Eventos

  //? Evento Pedir Carta
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta()
    const puntosJugador = acumularPuntos(carta, 0)
    crearCarta(carta, 0)
    if (puntosJugador > 21) {
      console.warn('Perdiste, imbecil ')
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21) {
      console.warn('21, Genial!')
      btnPedir.disabled = true
      btnDetener.disabled = true
      turnoComputadora(puntosJugador)
    }
  })

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugadores[0])
  })
  btnNuevo.addEventListener('click', () => {
    inicilizarJuego()
  })

  return {
    nuevoJuego: inicilizarJuego
  }
})()
