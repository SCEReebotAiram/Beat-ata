const buttonStart = document.getElementById('start-game-btn')
const soundCollision = new Audio('../assets/sounds/slashkut.mp3')
const pinatatDissFCanvas = new Audio('../assets/sounds/box-crash.mp3')
const startSound = new Audio('../assets/sounds/happy.mp3')
const gameOverSound = new Audio('../assets/sounds/trombone-gover.wav')
const wellDoneSound = new Audio('../assets/sounds/goodresult.mp3')
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