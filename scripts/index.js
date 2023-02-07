const buttonStart = document.getElementById('start-game-btn')
const soundCollision = new Audio('./assets/sounds/beat-audio-short.mp3')
const pinatatDissFCanvas = new Audio('./assets/sounds/beatata-crash-floor.mp3')
const startSound = new Audio('./assets/sounds/happy.mp3')
const gameOverSound = new Audio('./assets/sounds/trombone-gover.wav')
const wellDoneSound = new Audio('./assets/sounds/goodresult.mp3')
const CANVAS = document.getElementById('canvas')
const STARTSCREEN = document.getElementById('startScreen')
const FINISHSCREEN = document.getElementById('finishScreen')

const scorePoints = document.getElementById('score')
const timer = document.querySelector('#timer')
scorePoints.draggable = 'false'
timer.draggable = 'false'

let clicking = false
let generationSpeed = 1000


CANVAS.onmousedown = function () {
  clicking = !clicking
}
CANVAS.onmouseup = function () {
  clicking = !clicking
}

buttonStart.addEventListener('click', function () {
  STARTSCREEN.style.display = 'none'
  CANVAS.style.display = 'block'
  let partida = new Game()
})

CANVAS.addEventListener('mousemove', function (e) {
  let array = []
  let y = e.clientY; x = e.clientX
  if (clicking) {
    let element = document.createElement('div')
    element.style.position = 'absolute'
    element.style.top = y + 10 + 'px'
    element.style.left = x - ((window.innerWidth - 900) / 2) + 30 + 'px'
    element.style.boxShadow = '5px 5px 15px 5px #FF8080, -9px 5px 15px 5px #FFE488, -7px -5px 15px 5px #8CFF85, 12px -5px 15px 5px #80C7FF, 12px 10px 15px 7px #E488FF, -10px 10px 15px 7px #FF616B, -10px -7px 27px 1px #8E5CFF, 5px 5px 49px 5px rgba(148,255,234,0)'
    element.style.display = 'block'
    element.style.height = '2px'
    element.style.width = '2px'
    element.classList.add('mousetrace')
    CANVAS.appendChild(element)
    setTimeout(function () {
      CANVAS.removeChild(element)
    }, 100)
  }
})