let clicking = false;

const Game = function () {
    let timerId = setInterval(function () {
        new Fruit()
        
    }, 5000)

    this.gameOver = function (){
        clearInterval(timerId)
    }
}
const Fruit = function (width, heigth) {
    let self = this
    let fruitNest = [
        {
            name: 'apple',
            width: 40,
            heigth: 40,
            image: "url('./assets/apple.png')",
        }, {
            name: 'pear',
            width: 40,
            heigth: 40,
            image: "url('./assets/pear.png')",

        }, {
            name: 'peach',
            width: 40,
            heigth: 40,
            image: "url('./assets/peach.png')",
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
    this.element.style.left = this.maxRandomNumber(900-this.selectedFruit.width) + 'px'
    this.positionTop = 50
    this.addTopId = setInterval(function () {
        self.positionTop = self.positionTop + 50
        self.element.style.top = self.positionTop + 'px'
    },500)
    this.element.style.top = self.positionTop + 'px'
    this.checkPositionFruit = setInterval(function (e) {
        if (parseInt(self.element.style.top.slice(0, -2)) > 550 && self.element.parentNode) {
            clearInterval(self.addTopId)
            clearInterval(self.checkPositionFruit)
            self.element.parentNode.removeChild(self.element)
        }
    },500)
    this.dettectCollision = function (e) {
        if (clicking) {
            let canvas = e.target.parentNode
            canvas.removeChild(e.target)
        }
    }
    this.element.addEventListener('mouseover', this.dettectCollision)
    this.canvas = document.getElementById('canvas')
    this.canvas.appendChild(this.element)
}

canvas.onmousedown = function () {
    clicking = !clicking
}
canvas.onmouseup = function () {
    clicking = !clicking
}


let partida = new Game()
setTimeout(function(){
    partida.gameOver()
},30000)







