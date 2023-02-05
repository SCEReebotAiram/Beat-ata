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

const Game = function () {
  let timeSpan = document.getElementById('timeSpan')
  this.goal = 15
  this.gameTime = 20000
  this.chronoTime = this.gameTime / 1000 //seconds 
  let counter = { value: 0 }
  let self = this
  this.startGame = setInterval(function () {
    startSound.play()
    startSound.volume = 0.3
    // testing to change generationSpeed with item sliced counter
    new Item(counter)
  }, generationSpeed)
  this.counterChanger = setInterval(function () {
    scorePoints.innerText = `Smashed piñatas: ${counter.value} / ${self.goal}`
  }, 500)
  this.startTime = setInterval(function () {
    timeSpan.innerText = `${self.chronoTime--}`
  }, 1000)
  this.killAllInterval = function () {
    let highestInterval = 1000
    for (let i = 1; i < highestInterval; i++) {
      clearInterval(i)
    }
  }
  this.removeAllChilds = function (classname) {
    let arr = document.querySelectorAll('[class*='+classname+']')
    arr.forEach(el => el.parentNode.removeChild(el))
  }
  this.gameOver = setTimeout(function () {
    clearInterval(this.startGame)
    self.killAllInterval()

    gameOver = true
    if (this.gameOver) {
      let message = `You smashed ${counter.value} piñatas.`
      let secondMesagge;
      if (counter.value >= self.goal) {
        secondMesagge = 'Well done!'
        startSound.pause()
        wellDoneSound.play()
        wellDoneSound.volume = 0.5
      } else {
        secondMesagge = 'Try harder!'
        startSound.pause()
        gameOverSound.play()
        gameOverSound.volume = 0.4
      }
      FINISHSCREEN.innerHTML = `<div> ${message} ${secondMesagge}!</div>
            <span id='playAgainBtn'>Play again?</span>
            `
      let restartBtn = document.getElementById('playAgainBtn')
      restartBtn.onclick = function () {
        self.removeAllChilds('pinata')
        FINISHSCREEN.style.display = 'none'
        CANVAS.style.display = 'block'
        let partida = new Game()
      }
      finishScreen.style.display = 'flex'
      canvas.style.display = 'none'

    }
  }, this.gameTime + 1500)
}


const Item = function (counter) {

    let self = this
    let pinataBox = [
        {
            name: 'pinata1',
            width: 160,
            heigth: 120,
            image: "url('./assets/images/pinata1.png')",
        },
        {
            name: 'pinata2',
            width: 160,
            heigth: 120,
            image: "url('./assets/images/pinata2.png')",

        },
        {
            name: 'pinata3',
            width: 160,
            heigth: 120,
            image: "url('./assets/images/pinata3.png')",
        }
    ]
  this.element = document.createElement('div')
  this.maxRandomNumber = function (max = 880) {
    return Math.floor(Math.random() * max)
  }
  this.selectedFruit = pinataBox[this.maxRandomNumber(pinataBox.length)]
  this.element.setAttribute('class', self.selectedFruit.name)
  this.width = this.element.clientWidth
  this.element.style.backgroundImage = this.selectedFruit.image
  this.element.style.backgroundSize = 'contain'
  this.maxWidth = 895 - this.selectedFruit.width
  this.element.style.left = this.maxRandomNumber(this.maxWidth)+5 + 'px'
  let initialPosLeft = self.element.style.left.slice(0, -2)
  this.positionLeft = initialPosLeft
  this.positionTop = 0
  this.degrees = 0
  // this.direction = 1
  this.addRotation = function () {
    self.degrees+= 0.5
    self.element.style.transform = `rotate(${self.degrees}deg)`
  }
  this.addFall = function () {
    self.positionTop++
    self.element.style.top = self.positionTop + 'px'
  }
  // this.addLateralMovement = function () {
  //   self.positionLeft++
  //   self.element.style.left = self.positionLeft + 'px'
  // }
  this.startMovement = setInterval(function () {
    self.addFall()
    self.addRotation()
    // self.addLateralMovement()

  }, 1)
  this.checkPositionFruit = setInterval(function (e) {
    if (parseInt(self.element.style.top.slice(0, -2)) > 600-self.selectedFruit.heigth && self.element.parentNode || self.positionLeft > 850) {
      clearInterval(self.startMovement)
      clearInterval(self.checkPositionFruit)
      self.element.parentNode.removeChild(self.element)
      pinatatDissFCanvas.play()
      pinatatDissFCanvas.volume = 0.4
    }
  }, 10)
  this.dettectCollision = function (e) {
    if (clicking) {
      let parent = e.target.parentNode
      parent.removeChild(e.target)
      soundCollision.play()
      soundCollision.volume = 0.4
      counter.value++
    }
  }
  this.element.addEventListener('mouseover', this.dettectCollision)
    CANVAS.appendChild(this.element)
}

Item.prototype = Object.create(Game)
Item.prototype.constructor = Item

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