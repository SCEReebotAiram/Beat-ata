const buttonStart = document.getElementById('start-game-btn')
const soundCollision = new Audio('../assets/sounds/slashkut.mp3')
const fruitDissFCanvas = new Audio('../assets/sounds/box-crash.mp3')
const startSound = new Audio('../assets/sounds/happy.mp3')
const gameOverSound = new Audio('../assets/sounds/trombone-gover.wav')
const wellDoneSound = new Audio('../assets/sounds/goodresult.mp3')
const mouseeeConfig = {
    color: "#f542c8",  // cursor border color
    size: 10,  // cursor size
    trailColor: "#f542c8",  // trail color
    trailTime: 100  // trail duration time
  }
let scorePoints = document.getElementById('score')
let clicking = false
let generationSpeed = 1000

const Game = function () { 
    let timeSpan = document.getElementById('timeSpan')
    this.gameTime = 15000
    this.chronoTime = this.gameTime / 1000 //seconds 
    let counter = { value: 0 }
    let self = this
    this.startGame = setInterval(function () {
        startSound.play()
        startSound.volume=0.3
        // testing to change generationSpeed with item sliced counter
        new Fruit(counter)
    }, generationSpeed)
    this.counterChanger = setInterval(function () {
        scorePoints.innerText = `Smashed piñatas: ${counter.value}`
    }, 500)
    this.startTime = setInterval(function () {
        timeSpan.innerText = `${self.chronoTime--}`
    }, 1000)
    this.gameOver = setTimeout(function () {
        clearInterval(this.startGame)
        let highestInterval = 1000
        for (let i = 1; i < highestInterval; i++) {
            clearInterval(i)
        }
        gameOver = true
        if (this.gameOver) {
            let finishScreen = document.getElementById('finishScreen')
            let message = `You smashed ${counter.value} piñatas.`
            let secondMesagge;
            if (counter.value > 10) {
            secondMesagge = 'Well done!'
            startSound.pause()
            wellDoneSound.play()
            wellDoneSound.volume=0.5
            } else {
            secondMesagge = 'Try harder!'
            startSound.pause()
            gameOverSound.play()
            gameOverSound.volume=0.4
            }
            finishScreen.innerHTML = `<div> ${message} ${secondMesagge}!</div>
            <span id='playAgainBtn'>Play again?</span>
            `
            let restartBtn = document.getElementById('playAgainBtn')
            restartBtn.onclick = function() {
                location.reload()
            }
            finishScreen.style.display = 'flex'
            canvas.style.display = 'none'
            
        }
    }, this.gameTime + 1500)
}


const Fruit = function (counter) {
    let self = this
    let fruitNest = [
        {
            name: 'apple',
            width: 160,
            heigth: 120,
            image: "url('./assets/images/pinata1.png')",
        },
        {
            name: 'pear',
            width: 160,
            heigth: 120,
            image: "url('./assets/images/pinata2.png')",

        },
        {
            name: 'peach',
            width: 160,
            heigth: 120,
            image: "url('./assets/images/pinata3.png')",
        }
    ]
    this.element = document.createElement('div')
    this.maxRandomNumber = function (max = 880) {
        return Math.floor(Math.random() * max)
    }
    
    this.selectedFruit = fruitNest[this.maxRandomNumber(fruitNest.length)]
    this.element.setAttribute('class', this.selectedFruit.name)
    this.width = this.element.clientWidth
    this.element.style.backgroundImage = this.selectedFruit.image
    this.element.style.backgroundSize = 'contain'
    this.maxWidth = 900 - this.selectedFruit.width
    this.element.style.left = this.maxRandomNumber(this.maxWidth) + 'px'
    this.positionTop = 0
    this.degrees = 0
    this.addRotation = function () {
        self.degrees ++
        self.element.style.transform = `rotate(${self.degrees}deg)`
    }
    this.addTopId = setInterval(function () {
        // self.degrees ++
        self.positionTop = self.positionTop + 1
        self.element.style.top = self.positionTop + 'px'
        self.addRotation() 
    }, 1)
    this.element.style.top = self.positionTop + 'px'
    this.checkPositionFruit = setInterval(function () {
        if (parseInt(self.element.style.top.slice(0, -2)) > 560 && self.element.parentNode) {
            clearInterval(self.addTopId)
            clearInterval(self.checkPositionFruit)
            self.element.parentNode.removeChild(self.element)
            fruitDissFCanvas.play()
            fruitDissFCanvas.volume=0.4
        }
    }, 10)
    this.dettectCollision = function (e) {
        if (clicking) {
            let canvas = e.target.parentNode
            canvas.removeChild(e.target)
            soundCollision.play()
            soundCollision.volume = 0.4
            counter.value++

        }
    }
   
    this.element.addEventListener('mouseover', this.dettectCollision)
    this.canvas = document.getElementById('canvas')
    this.canvas.appendChild(this.element)
}
Fruit.prototype = Object.create(Game)
Fruit.prototype.constructor = Fruit

canvas.onmousedown = function (e) {
    clicking = !clicking
}
canvas.onmouseup = function () {
    clicking = !clicking
}

buttonStart.addEventListener('click', function () {
    let canvas = document.getElementById('canvas')
    let startScreen = document.getElementById('startScreen')
    startScreen.style.display = 'none'
    canvas.style.display = 'block'
    let partida = new Game()
})
