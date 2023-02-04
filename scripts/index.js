const buttonStart = document.getElementById('start-game-btn')
const soundCollision = new Audio('../assets/sounds/slashkut.mp3')
const gameOverSound = new Audio('../assets/sounds/game-over.mp3')
const fruitDissFCanvas = new Audio('../assets/sounds/box-crash.mp3')

let scorePoints = document.getElementById('score')
let clicking = false
let generationSpeed = 1000

buttonStart.addEventListener('click', function () {
    let canvas = document.getElementById('canvas')
    let startScreen = document.getElementById('startScreen')
    startScreen.style.display = 'none'
    canvas.style.display = 'block'
    let partida = new Game()
})


const Game = function () {
    let timeSpan = document.getElementById('timeSpan')
    this.gameTime = 10000
    this.chronoTime = this.gameTime / 1000 //seconds 
    let counter = { value: 0 }
    let startSound = new Audio('../assets/sounds/happy.mp3');
    let self = this
    this.startGame = setInterval(function () {
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
            finishScreen.style.display = 'block'
            canvas.style.display = 'none'
        }
    }, this.gameTime + 1000)
}


const Fruit = function (counter) {
    let self = this
    let fruitNest = [
        {
            name: 'apple',
            width: 40,
            heigth: 40,
            image: "url('./assets/images/apple.png')",
        },
        {
            name: 'pear',
            width: 40,
            heigth: 40,
            image: "url('./assets/images/pear.png')",

        },
        {
            name: 'peach',
            width: 40,
            heigth: 40,
            image: "url('./assets/images/peach.png')",
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
    this.addTopId = setInterval(function () {
        self.positionTop = self.positionTop + 1
        self.element.style.top = self.positionTop + 'px'
    }, 1)
    this.element.style.top = self.positionTop + 'px'
    this.checkPositionFruit = setInterval(function () {
        if (parseInt(self.element.style.top.slice(0, -2)) > 560 && self.element.parentNode) {
            clearInterval(self.addTopId)
            clearInterval(self.checkPositionFruit)
            self.element.parentNode.removeChild(self.element)
            fruitDissFCanvas.play()
        }
    }, 10)
    this.dettectCollision = function (e) {
        if (clicking) {
            let canvas = e.target.parentNode
            canvas.removeChild(e.target)
            soundCollision.play()
            console.log(parseInt(scorePoints))
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